import React from 'react';
import { DnsRecordAnswer } from '../types/DnsRecordAnswer';
import { DnsType } from '../enums/DnsType.enum';

const Table: React.FC<{
  content: DnsRecordAnswer[] | string;
  type: DnsType;
}> = ({ content, type }) => {
  return (
    typeof content !== 'string' && (
      <div className="flex max-w-xl lg:max-w-full lg:min-w-96 lg:max-h-56 flex-col break-words cursor-default shadow-md p-4 rounded-lg border border-neutral overflow-y-auto">
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
