import { useState } from 'react';
import { DnsType } from './enums/DnsType.enum';
import { ThemeProvider } from './providers/ThemeProvider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [dnsRecordType, setDnsRecordType] = useState<DnsType>(DnsType.A);
  const [domain, setDomain] = useState<string>('');

  return (
    <ThemeProvider>
      <div className="flex flex-col gap-4 h-screen">
        <Navbar />
        <div className="flex flex-1 justify-center gap-4">hi</div>
        {/* <div className="flex gap-4 justify-center">
          <label className="input input-sm input-bordered">
            <input
              type="text"
              className="grow"
              placeholder="Domain"
              onChange={event => setDomain(event.target.value)}
            />
          </label>
          <select
            className="select select-bordered w-full select-sm max-w-xs"
            onChange={event => setDnsRecordType(event.target.value as DnsType)}
            defaultValue={DnsType.A}
          >
            <option disabled>DNS Type</option>
            {Object.values(DnsType).map((type: string, idx: number) => (
              <option value={type} key={idx}>
                {type}
              </option>
            ))}
          </select>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => getDnsRecordInfo(domain, dnsRecordType)}
            disabled={domain ? false : true}
          >
            Accio!
          </button>
          </div> */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
