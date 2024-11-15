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
import { DnsRecordResponse } from '../types/DnsRecordResponse';
import React from 'react';

const Results = () => {
  const [searchParams] = useSearchParams();
  const [sslData, setSslData] = useState<string>('');
  const [whoIsData, setWhoIsData] = useState<string>('');
  const [dnsData, setDnsData] = useState<DnsRecordResponse[]>([]);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    setProgress(0);

    const domain = searchParams.get('domain')!;

    const fetchSslData = async () => {
      try {
        const data = await getDomainSslInfo(domain);
        console.log(data);
        setSslData(JSON.stringify(data[1]));
      } catch (error) {
        console.error(error);
      } finally {
        setProgress(prevValue => prevValue + 1);
      }
    };

    const fetchWhoIsData = async () => {
      try {
        const data = await getDomainInfo(domain);
        setWhoIsData(JSON.stringify(data));
      } catch (error) {
        console.error(error);
      } finally {
        setProgress(prevValue => prevValue + 1);
      }
    };

    const fetchDnsData = async () => {
      try {
        const data = await getDnsRecordInfo(domain);
        setDnsData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setProgress(prevValue => prevValue + 3);
      }
    };

    fetchSslData();
    // fetchWhoIsData();
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
              <div className="flex flex-wrap justify-center gap-4">
                {dnsData.map((record: DnsRecordResponse, idx: number) => {
                  return (
                    <React.Fragment key={idx}>
                      <Table content={record} />
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
            <div>
              <h1 className="font-semibold text-center xl:text-start mb-4">
                SSL Info
              </h1>
              <div className="flex flex-wrap justify-center gap-4">
                {sslData}
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
