import React from 'react';
import { DnsRecordAnswer } from '../types/DnsRecordAnswer';
import { DnsType } from '../enums/DnsType.enum';

const Table: React.FC<{
  content: DnsRecordAnswer[] | string;
  type: DnsType;
}> = ({ content, type }) => {
  return (
    typeof content !== 'string' && (
      <div className="flex max-w-xl lg:max-w-full flex-col break-words cursor-default border border-base-200 shadow-md p-4 rounded-lg">
        <h2 className="font-semibold">{type.toUpperCase()}</h2>
        <table className="table table-xs cursor-default">
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
