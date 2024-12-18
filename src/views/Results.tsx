/* eslint-disable @typescript-eslint/no-explicit-any */
import Navbar from '../components/Navbar';
import ViewContainer from '../hoc/ViewContainer';
import Footer from '../components/Footer';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getDomainSslInfo } from '../services/ssl.service';
import { getDomainInfo } from '../services/whois.service';
import { getDnsRecordInfo } from '../services/dns.service';
import ProgressBar from '../components/ProgressBar';
import Table from '../components/Table';
import React from 'react';
import { DnsRecordAnswer } from '../types/DnsRecordAnswer';
import { DnsType } from '../enums/DnsType.enum';
import SslTable from '../components/SslTable';
import WhoisTable from '../components/WhoisTable';
import { H1 } from '../hoc/H1';
import Markers from '../components/Markers';
import { isWordpressInstalled } from '../services/wpCheck.service';

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
  const [hasWwwRecord, setHasWwwRecord] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const wwwSsl = useMemo(() => {
    const domain = searchParams.get('domain');

    return (
      sslData?.dns_names?.filter(
        (dns_name: string) => dns_name === `www.${domain}` || `*.${domain}`
      ).length > 0
    );
  }, [sslData, searchParams]);

  useEffect(() => {
    setProgress(0);
    setIsLoading(true);

    const domain = searchParams.get('domain');
    if (!domain) return;

    const fetchData = async () => {
      try {
        const tasks = [
          getDomainSslInfo(domain).then(data => {
            setSslData(data[data.length - 1]);
            setProgress(prevValue => prevValue + 1);
          }),
          getDomainInfo(domain).then(data => {
            setWhoIsData(data);
            setProgress(prevValue => prevValue + 1);
          }),
          getDnsRecordInfo(domain).then(data => {
            setDnsData(data);
            setProgress(prevValue => prevValue + 1);
          }),
          getDnsRecordInfo(`www.${domain}`).then(data => {
            const answer = Array.isArray(data.A) || Array.isArray(data.CNAME);
            setHasWwwRecord(answer);
            setProgress(prevValue => prevValue + 1);
          }),
          isWordpressInstalled(domain).then(data => {
            setHasWp(data.isInstalled);
            setProgress(prevValue => prevValue + 1);
          }),
        ];

        await Promise.all(tasks);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  return (
    <>
      <Navbar />
      <ViewContainer>
        {isLoading ? (
          <ProgressBar progress={progress} />
        ) : (
          <>
            <H1 className="mb-5 text-2xl">
              Looking up {searchParams.get('domain')}
            </H1>
            <Markers
              AAAA={dnsData?.AAAA}
              hasWp={hasWp}
              hasWwwRecord={hasWwwRecord}
              dnssec={whoIsData?.result?.dnssec}
              wwwSsl={wwwSsl}
            />
            <div className="w-full">
              <H1 className="xl:text-start mb-4">DNS Info</H1>
              <div className="grid justify-center lg:justify-normal lg:grid-flow-col lg:auto-cols-auto break-words gap-4">
                {dnsData &&
                  Object.entries(dnsData).map(([type, answer]) => {
                    return (
                      <React.Fragment key={type}>
                        <Table content={answer} type={type as DnsType} />
                      </React.Fragment>
                    );
                  })}
              </div>
            </div>
            <div className="w-full grid lg:grid-cols-2 gap-4 justify-center">
              <div className="max-w-xl lg:max-w-full lg:col-span-1">
                <H1 className="xl:text-start mb-4">WHOIS Info</H1>
                {whoIsData && <WhoisTable content={whoIsData} />}
              </div>
              <div className="max-w-xl lg:max-w-full lg:col-span-1">
                <H1 className="xl:text-start mb-4">SSL Info</H1>
                {sslData && <SslTable content={sslData} />}
              </div>
            </div>
          </>
        )}
      </ViewContainer>
      <Footer />
    </>
  );
};

export default Results;
