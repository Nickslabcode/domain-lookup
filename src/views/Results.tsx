import Navbar from '../components/Navbar';
import ViewContainer from '../hoc/ViewContainer';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
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
import ShortKeys from '../components/ShortKeys';

const Results = () => {
  const [searchParams] = useSearchParams();
  const [sslData, setSslData] = useState<Record<string, string>>({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [whoIsData, setWhoIsData] = useState<Record<string, any> | string>();
  const [dnsData, setDnsData] =
    useState<Record<DnsType, string | DnsRecordAnswer[]>>();
  const [progress, setProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setProgress(0);
    setIsLoading(true);

    const domain = searchParams.get('domain');
    if (!domain) return;

    const fetchData = async () => {
      try {
        const tasks = [
          getDomainSslInfo(domain).then(data => {
            setSslData(data);
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
        ];

        await Promise.allSettled(tasks);
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
            <div className="w-full">
              <h1 className="font-semibold text-center xl:text-start mb-4">
                DNS Info
              </h1>
              <div className="flex break-words gap-4">
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
            <div className="w-full h-2/5 flex gap-4">
              <div className="w-1/3">
                <h1 className="font-semibold text-center xl:text-start mb-4">
                  SSL Info
                </h1>
                {sslData ? (
                  <SslTable content={sslData} />
                ) : (
                  <div className="skeleton h-full rounded-lg"></div>
                )}
              </div>
              <div className="w-2/3">
                <h1 className="font-semibold text-center xl:text-start mb-4">
                  WHOIS Info
                </h1>
                {whoIsData ? (
                  <WhoisTable content={whoIsData} />
                ) : (
                  <div className="skeleton h-full shadow-md rounded-lg flex items-center justify-center">
                    <span className="loading loading-spinner loading-md text-primary"></span>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </ViewContainer>
      <ShortKeys />
      <Footer />
    </>
  );
};

export default Results;
