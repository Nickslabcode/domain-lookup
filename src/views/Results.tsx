/* eslint-disable @typescript-eslint/no-explicit-any */
import Navbar from '../components/Navbar';
import ViewContainer from '../hoc/ViewContainer';
import Footer from '../components/Footer';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getDomainSslInfo } from '../services/ssl.service';
import { getDomainInfo } from '../services/whois.service';
import { getDnsRecordInfo } from '../services/dns.service';
import Table from '../components/Table';
import React from 'react';
import { DnsRecordAnswer } from '../types/DnsRecordAnswer';
import { DnsType } from '../enums/DnsType.enum';
import SslTable from '../components/SslTable';
import WhoisTable from '../components/WhoisTable';
import { H1 } from '../hoc/H1';
import Markers from '../components/Markers';
import { isWordpressInstalled } from '../services/wpCheck.service';
import { isCdnActive } from '../services/cdnCheck.service';
import Meta from '../components/Meta';

interface WhoIsData {
  result?: Record<string, any>;
  [key: string]: any;
}

const Results = () => {
  const [searchParams] = useSearchParams();
  const [sslData, setSslData] = useState<Record<string, any>>();
  const [whoIsData, setWhoIsData] = useState<WhoIsData>();
  const [dnsData, setDnsData] =
    useState<Record<DnsType, string | DnsRecordAnswer[]>>();
  const [hasWp, setHasWp] = useState<boolean>(false);
  const [cdnInfo, setCdnInfo] = useState<string[]>([]);
  const [hasWwwRecord, setHasWwwRecord] = useState<boolean>(false);
  const wwwSsl = useMemo(() => {
    const domain = searchParams.get('domain');

    return (
      sslData?.dns_names?.filter(
        (dns_name: string) => dns_name === `www.${domain}` || `*.${domain}`
      ).length > 0
    );
  }, [sslData, searchParams]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isWhoIsLoading, setIsWhoisLoading] = useState<boolean>(false);
  const [isDnsLoading, setIsDnsLoading] = useState<boolean>(false);
  const [isSslLoading, setIsSslLoading] = useState<boolean>(false);
  const [isWpCheckLoading, setIsWpCheckLoading] = useState<boolean>(false);
  const [isCdnCheckLoading, setIsCdnCheckLoading] = useState<boolean>(false);

  useEffect(() => {
    const domain = searchParams.get('domain');
    if (!domain) return;
    setIsLoading(true);
    setIsWhoisLoading(true);
    setIsSslLoading(true);
    setIsDnsLoading(true);
    setIsWpCheckLoading(true);
    setIsCdnCheckLoading(true);

    try {
      const fetchData = async () => {
        const tasks = [
          getDomainSslInfo(domain).then(data => {
            setSslData(data[data.length - 1]);
            setIsSslLoading(false);
          }),
          getDomainInfo(domain).then(data => {
            console.log(data);
            setWhoIsData(data);
            setIsWhoisLoading(false);
          }),
          getDnsRecordInfo(domain).then(data => {
            setDnsData(data);
            setIsDnsLoading(false);
          }),
          getDnsRecordInfo(`www.${domain}`).then(data => {
            const answer = Array.isArray(data.A) || Array.isArray(data.CNAME);
            setHasWwwRecord(answer);
          }),
          isWordpressInstalled(domain).then(data => {
            setHasWp(data.wordpressInstalled);
            setIsWpCheckLoading(false);
          }),
          isCdnActive(domain).then(data => {
            setCdnInfo(Object.keys(data));
            setIsCdnCheckLoading(false);
          }),
        ];

        await Promise.all(tasks);
        setIsLoading(false);
      };

      fetchData();
    } catch (error) {
      console.error(error);
    }
  }, [searchParams]);

  return (
    <>
      <Meta loading={isLoading} />
      <Navbar />
      <ViewContainer className="p-5 mt-16">
        <Markers
          isWhoisLoading={isWhoIsLoading}
          isDnsLoading={isDnsLoading}
          isSslLoading={isSslLoading}
          isCdnCheckLoading={isCdnCheckLoading}
          isWpCheckLoading={isWpCheckLoading}
          AAAA={dnsData?.AAAA}
          cdnInfo={cdnInfo}
          hasWp={hasWp}
          hasWwwRecord={hasWwwRecord}
          dnssec={whoIsData?.result?.dnssec}
          wwwSsl={wwwSsl}
          domainStatusCodes={whoIsData?.result?.status}
        />
        <div className="w-full">
          <H1 className="xl:text-start mb-4">DNS Info</H1>
          <div className="grid justify-center lg:justify-normal xl:grid-flow-col lg:auto-cols-auto break-words gap-4">
            {isDnsLoading ? (
              <div className="flex justify-center items-center h-full">
                <span className="loading loading-spinner text-primary"></span>
              </div>
            ) : (
              dnsData &&
              Object.entries(dnsData).map(([type, answer]) => {
                return (
                  <React.Fragment key={type}>
                    <Table content={answer} type={type as DnsType} />
                  </React.Fragment>
                );
              })
            )}
          </div>
        </div>
        <div className="w-full grid lg:grid-cols-2 gap-4 justify-center">
          <div className="max-w-xl lg:max-w-full lg:col-span-1">
            <H1 className="xl:text-start mb-4">WHOIS Info</H1>
            <WhoisTable content={whoIsData} loading={isWhoIsLoading} />
          </div>
          <div className="max-w-xl lg:max-w-full lg:col-span-1">
            <H1 className="xl:text-start mb-4">SSL Info</H1>
            <SslTable content={sslData} loading={isSslLoading} />
          </div>
        </div>
      </ViewContainer>
      <Footer />
    </>
  );
};

export default Results;
