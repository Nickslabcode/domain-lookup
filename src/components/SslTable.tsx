import React from 'react';
import { H1 } from '../hoc/H1';

const SslTable: React.FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: Record<string, any> | undefined;
  loading: boolean;
}> = ({ content, loading }) => {
  return (
    <div className="flex lg:min-h-80 lg:max-h-96 h-full flex-col break-words shadow-md p-4 rounded-lg cursor-default overflow-y-auto border border-neutral">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <span className="loading loading-spinner text-primary"></span>
        </div>
      ) : !content ? (
        <H1>No SSL certificate found.</H1>
      ) : (
        <table className="table table-xs">
          <tbody>
            <tr className="hover">
              <th className="align-top">Issuer</th>
              <td>{content.issuer?.friendly_name}</td>
            </tr>
            <tr className="hover">
              <th className="align-top">Covers</th>
              <td>{content.dns_names?.join(', ')}</td>
            </tr>
            <tr className="hover">
              <th className="align-top">Issued On</th>
              <td>{new Date(content.not_before).toLocaleDateString()}</td>
            </tr>
            <tr className="hover">
              <th className="align-top">Expires On</th>
              <td>{new Date(content.not_after).toLocaleDateString()}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SslTable;
