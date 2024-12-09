import React from 'react';
import { H1 } from '../hoc/H1';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SslTable: React.FC<{ content: Record<string, any> }> = ({ content }) => {
  return (
    <div className="flex h-full max-h-screen flex-col break-words border border-base-200 shadow-md p-4 rounded-lg cursor-default overflow-y-auto">
      {!content ? (
        <H1>No SSL certificate found.</H1>
      ) : (
        <table className="table table-xs">
          <tbody>
            <tr className="hover">
              <th>Issuer</th>
              <td>{content.issuer?.friendly_name}</td>
            </tr>
            <tr className="hover">
              <th>Covers</th>
              <td>{content.dns_names?.join(', ')}</td>
            </tr>
            <tr className="hover">
              <th>Issued On</th>
              <td>{new Date(content.not_before).toLocaleDateString()}</td>
            </tr>
            <tr className="hover">
              <th>Expires On</th>
              <td>{new Date(content.not_after).toLocaleDateString()}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SslTable;
