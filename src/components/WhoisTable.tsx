import React, { useMemo } from 'react';
import { getDays } from '../helpers/getDays';
const WhoisTable: React.FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: Record<string, any> | undefined;
  loading: boolean;
}> = ({ content, loading }) => {
  const whoisRows = useMemo(() => {
    if (!content?.result) return [];

    const {
      registrar,
      name_servers,
      creation_date,
      expiration_date,
      updated_date,
      status,
      dnssec,
    } = content.result;

    const transformedWhoisObj = {
      Registrar: registrar,
      Name_Servers: Array.isArray(name_servers)
        ? name_servers
        : name_servers.substring(0, name_servers.indexOf(' ')),
      Registered_On: new Date(creation_date).toLocaleDateString(),
      Expires_On: `${new Date(expiration_date).toLocaleDateString()} (${getDays(
        expiration_date
      )} days)`,
      Last_updated_On: new Date(updated_date).toLocaleDateString(),
      Status: Array.isArray(status)
        ? status.map((s: string) => s.substring(0, s.indexOf(' ')))
        : status.substring(0, status.indexOf(' ')),
      DNSSEC: dnssec,
    };

    return Object.entries(transformedWhoisObj).map(
      ([key, value]: [string, string | string[]]) => ({
        label: key.replace(/_/g, ' '),
        value,
      })
    );
  }, [content]);

  return (
    <div className="flex h-full lg:min-h-80 lg:max-h-96 flex-col break-words shadow-md p-4 rounded-lg cursor-default overflow-y-auto border border-neutral">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <span className="loading loading-spinner text-primary"></span>
        </div>
      ) : !content ? (
        <div className="flex justify-center items-center h-full">
          <p>Whois data could not be fetched.</p>
        </div>
      ) : (
        <table className="table table-xs">
          <tbody>
            {whoisRows.map(row => (
              <tr className="hover">
                <th className="align-top">{row.label}</th>
                <td>
                  {Array.isArray(row.value) ? (
                    <ul>
                      {row.value.map((r: string, idx: number) => (
                        <li key={`${idx}-${r}`}>{r}</li>
                      ))}
                    </ul>
                  ) : (
                    row.value
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WhoisTable;
