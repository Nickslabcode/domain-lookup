import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WhoisTable: React.FC<{ content: Record<string, any> | string }> = ({
  content,
}) => {
  return (
    <div className="flex h-full flex-col break-words shadow-md p-4 rounded-lg cursor-default">
      {typeof content === 'string' ? (
        <h1>
          Domain name is not registered or there was a problem fetching the
          data.
        </h1>
      ) : (
        <table className="table">
          <tbody>
            <tr className="hover">
              <th>Registrar</th>
              <td>{content.result!.registrar}</td>
            </tr>
            <tr className="hover h-auto">
              <th>Name Servers</th>
              <td>
                <ul>
                  {content.result!.name_servers.map(
                    (ns: string, idx: number) => (
                      <li key={idx}>{ns}</li>
                    )
                  )}
                </ul>
              </td>
            </tr>
            <tr className="hover">
              <th>Registered On</th>
              <td>
                {new Date(content.result!.creation_date).toLocaleDateString()}
              </td>
            </tr>
            <tr className="hover">
              <th>Expires On</th>
              <td>
                {new Date(content.result!.expiration_date).toLocaleDateString()}
              </td>
            </tr>
            <tr className="hover">
              <th>Last updated On</th>
              <td>
                {new Date(content.result!.updated_date).toLocaleDateString()}
              </td>
            </tr>
            <tr className="hover">
              <th>Status</th>
              <td>
                {typeof content.result!.status === 'string' ? (
                  content.result!.status
                ) : (
                  <ul>
                    {content.result!.status.map((row: string, idx: number) => (
                      <li key={idx}>{row}</li>
                    ))}
                  </ul>
                )}
              </td>
            </tr>
            <tr className="hover">
              <th>DNSSEC</th>
              <td>{content.result!.dnssec}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WhoisTable;
