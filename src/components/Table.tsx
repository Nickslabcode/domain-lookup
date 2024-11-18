import React from 'react';
import { DnsRecordAnswer } from '../types/DnsRecordAnswer';
import { DnsType } from '../enums/DnsType.enum';

const Table: React.FC<{
  content: DnsRecordAnswer[] | string;
  type: DnsType;
}> = ({ content, type }) => {
  return (
    typeof content !== 'string' && (
      <div className="flex flex-col break-words shadow-md p-4 rounded-lg cursor-default">
        <h1 className="font-semibold">{type.toUpperCase()}</h1>
        <table className="table cursor-default">
          <thead>
            <tr>
              <th>Answer</th>
              <th>TTL</th>
            </tr>
          </thead>
          <tbody>
            {content.map((answer: DnsRecordAnswer, idx: number) => (
              <tr key={idx} className="hover">
                <td>{answer.data}</td>
                <td>{answer.TTL}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
};

export default Table;
