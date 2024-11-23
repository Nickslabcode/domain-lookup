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
import { H1 } from '../hoc/H1';

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
            <div className="w-full grid lg:grid-cols-3 gap-4 justify-center">
              <div className="max-w-xl lg:max-w-full lg:col-span-2">
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
