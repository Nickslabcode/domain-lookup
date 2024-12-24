import React from 'react';
import { getDays } from '../helpers/getDays';
const WhoisTable: React.FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: Record<string, any> | undefined;
  loading: boolean;
}> = ({ content, loading }) => {
  return (
    <div className="flex h-full lg:min-h-80 lg:max-h-96 flex-col break-words shadow-md p-4 rounded-lg cursor-default overflow-y-auto border border-neutral">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <span className="loading loading-spinner text-primary"></span>
        </div>
      ) : !content ? (
        <div className="flex justify-center items-center h-full">
          <p>Data could not be fetched.</p>
        </div>
      ) : (
        <table className="table table-xs">
          <tbody>
            <tr className="hover">
              <th className="align-top">Registrar</th>
              <td>{content?.result!.registrar}</td>
            </tr>
            <tr className="hover">
              <th className="align-top">Name Servers</th>
              <td>
                <ul>
                  {content?.result!.name_servers.map(
                    (ns: string, idx: number) => (
                      <li key={idx}>{ns}</li>
                    )
                  )}
                </ul>
              </td>
            </tr>
            <tr className="hover">
              <th className="align-top">Registered On</th>
              <td>
                {new Date(content?.result!.creation_date).toLocaleDateString()}
              </td>
            </tr>
            <tr className="hover">
              <th className="align-top">Expires On</th>
              <td>
                {new Date(
                  content?.result!.expiration_date
                ).toLocaleDateString()}{' '}
                ({getDays(content?.result!.expiration_date)} days)
              </td>
            </tr>
            <tr className="hover">
              <th className="align-top">Last updated On</th>
              <td>
                {new Date(content?.result!.updated_date).toLocaleDateString()}
              </td>
            </tr>
            <tr className="hover">
              <th className="align-top">Status</th>
              <td>
                {typeof content?.result!.status === 'string' ? (
                  <p>
                    {content?.result!.status.substring(
                      0,
                      content?.result!.status.indexOf(' ')
                    )}
                  </p>
                ) : (
                  <ul>
                    {content?.result!.status.map((row: string, idx: number) => (
                      <li key={idx}>{row.substring(0, row.indexOf(' '))}</li>
                    ))}
                  </ul>
                )}
              </td>
            </tr>
            <tr className="hover">
              <th className="align-top">DNSSEC</th>
              <td>{content?.result!.dnssec}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WhoisTable;
