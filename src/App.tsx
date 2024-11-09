import { useState } from 'react';
import './App.css';
import ThemeController from './components/ThemeController';
import { DnsType } from './enums/DnsType.enum';
import { ThemeProvider } from './providers/ThemeProvider';
import { getDnsRecordInfo } from './services/dns.service';

function App() {
  const [dnsRecordType, setDnsRecordType] = useState<DnsType>(DnsType.A);
  const [domain, setDomain] = useState<string>('');

  return (
    <ThemeProvider>
      <div className="flex flex-col gap-4">
        <div>
          <ThemeController />
        </div>
        <h1 className="font-semibold">Domain lookup</h1>
        <div className="flex justify-center gap-4">
          <button className="btn btn-info">info</button>
          <button className="btn btn-primary">primary</button>
          <button className="btn btn-secondary">secondary</button>
        </div>
        <div className="flex gap-4 justify-center">
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
            Search
          </button>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
