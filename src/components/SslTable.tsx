import React, { useMemo } from 'react';
import { getDays } from '../helpers/date/getDays';
import { SslStatus } from '../enums/SslStatus.enum';
import Loading from './Loading';

const SslTable: React.FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: Record<string, any> | undefined;
  loading: boolean;
}> = ({ content, loading }) => {
  const sslRows = useMemo(() => {
    if (!content) return [];

    const { issuer, dns_names, not_before, not_after } = content;
    const remainingDays = getDays(not_after);

    const transformedSslObj = {
      Status: remainingDays > 0 ? SslStatus.ACTIVE : SslStatus.EXPIRED,
      Issuer: issuer.friendly_name,
      Covers: Array.isArray(dns_names) ? dns_names.join(', ') : dns_names,
      Issued_On: new Date(not_before).toLocaleDateString(),
      Expires_On: `${new Date(
        not_after
      ).toLocaleDateString()} (in ${remainingDays} days)`,
    };

    return Object.entries(transformedSslObj).map(
      ([key, value]: [string, string | string[]]) => ({
        label: key.replace(/_/g, ' '),
        value,
      })
    );
  }, [content]);

  return (
    <div className="flex lg:min-h-80 lg:max-h-96 h-full flex-col break-words shadow-md p-4 rounded-lg cursor-default overflow-y-auto border border-neutral">
      {loading ? (
        <Loading />
      ) : !content ? (
        <div className="flex justify-center items-center h-full">
          <p>No SSL certificate found.</p>
        </div>
      ) : (
        <table className="table table-xs">
          <tbody>
            {sslRows.map(({ label, value }) => (
              <tr className="hover" key={label}>
                <th className="align-top">{label}</th>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SslTable;
