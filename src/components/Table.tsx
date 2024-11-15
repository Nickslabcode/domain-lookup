import React from 'react';
import { DnsRecordAnswer } from '../types/DnsRecordAnswer';
import { DnsRecordResponse } from '../types/DnsRecordResponse';

const Table: React.FC<{ content: DnsRecordResponse }> = ({ content }) => {
  return (
    <div className="flex flex-col max-w-lg break-words shadow-md p-4 rounded-lg cursor-default">
      <h1 className="font-semibold">{content.type.toUpperCase()}</h1>
      {typeof content.data === 'string' ? (
        <h1>{content.data}</h1>
      ) : (
        <table className="table cursor-default">
          {/* head */}
          <thead>
            <tr>
              <th>Answer</th>
              <th>TTL</th>
            </tr>
          </thead>
          <tbody>
            {content.data.map((answer: DnsRecordAnswer, idx: number) => (
              <tr key={idx} className="hover">
                <td>{answer.data}</td>
                <td>{answer.TTL}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
