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

  useEffect(() => {
    setProgress(0);

    const domain = searchParams.get('domain')!;

    const fetchSslData = async () => {
      try {
        const data = await getDomainSslInfo(domain);
        console.log('SSL info fetched!');
        setSslData(data[data.length - 1]);
      } catch (error) {
        console.error(error);
      } finally {
        setProgress(prevValue => prevValue + 1);
      }
    };

    const fetchWhoIsData = async () => {
      try {
        const data = await getDomainInfo(domain);
        setWhoIsData(data);
        console.log('WHOIS info fetched!');
      } catch (error) {
        console.error(error);
      } finally {
        setProgress(prevValue => prevValue + 1);
      }
    };

    const fetchDnsData = async () => {
      try {
        const data = await getDnsRecordInfo(domain);
        console.log('DNS info fetched!');
        setDnsData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setProgress(prevValue => prevValue + 1);
      }
    };

    fetchSslData();
    fetchWhoIsData();
    fetchDnsData();
  }, [searchParams]);

  return (
    <>
      <Navbar />
      <ViewContainer>
        {progress < 3 ? (
          <ProgressBar progress={progress} />
        ) : (
          <>
            <div>
              <h1 className="font-semibold text-center xl:text-start mb-4">
                DNS Info
              </h1>
              <div className="flex break-words gap-4 w-full">
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
            <div className="w-full flex gap-4">
              <div className="w-1/3">
                <h1 className="font-semibold text-center xl:text-start mb-4">
                  SSL Info
                </h1>
                {sslData && <SslTable content={sslData} />}
              </div>
              <div className="w-2/3">
                <h1 className="font-semibold text-center xl:text-start mb-4">
                  WHOIS Info
                </h1>
                {whoIsData && <WhoisTable content={whoIsData} />}
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
