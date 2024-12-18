import { FaCheck } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { DnsRecordAnswer } from '../types/DnsRecordAnswer';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

interface MarkersPropsType {
  AAAA: DnsRecordAnswer[] | string | undefined;
  hasWp: boolean;
  hasWwwRecord: boolean;
  dnssec: string | undefined;
  wwwSsl: boolean;
}

const Markers: React.FC<MarkersPropsType> = ({
  AAAA,
  hasWp,
  hasWwwRecord,
  dnssec,
  wwwSsl,
}) => {
  return (
    <div className="mb-5 bg-base-200 py-2 px-4 rounded-lg text-secondary cursor-default">
      <ul className="flex gap-6 text-xs items-center">
        <li className="flex items-center gap-2">
          <h3 className="font-semibold">NO AAAA</h3>
          {Array.isArray(AAAA) ? (
            <div className="bg-error text-neutral w-4 h-4 rounded-full font-semibold flex justify-center items-center">
              <IoClose size={12} />
            </div>
          ) : typeof AAAA === 'string' ? (
            <div className="bg-success text-neutral w-4 h-4 rounded-full font-semibold flex justify-center items-center">
              <FaCheck size={8} />
            </div>
          ) : (
            <span className="bg-secondary text-neutral font-semibold text-xs px-1 rounded">
              N/A
            </span>
          )}
        </li>
        <li className="flex items-center gap-2">
          <h3 className="font-semibold">WWW DNS</h3>
          {hasWwwRecord ? (
            <div className="bg-success text-neutral w-4 h-4 rounded-full font-semibold flex justify-center items-center">
              <FaCheck size={8} />
            </div>
          ) : (
            <div className="bg-error text-neutral w-4 h-4 rounded-full font-semibold flex justify-center items-center">
              <IoClose size={12} />
            </div>
          )}
        </li>
        <div className="bg-secondary w-0.5 h-3 rounded-full"></div>
        <li className="flex items-center gap-2">
          <h3 className="font-semibold">DNSSEC</h3>
          {!dnssec ? (
            <span className="bg-secondary text-neutral font-semibold text-xs px-1 rounded">
              N/A
            </span>
          ) : dnssec === 'unsigned' ? (
            <span className="bg-success text-neutral font-semibold text-xs px-1 rounded">
              unsigned
            </span>
          ) : (
            <span className="bg-error text-neutral font-semibold text-xs px-1 rounded">
              active
            </span>
          )}
        </li>
        <li className="flex gap-2">
          <h3 className="font-semibold">STATUS</h3>
          <span className="bg-success text-neutral font-semibold text-xs px-1 rounded">
            active
          </span>
        </li>
        <li className="flex gap-2">
          <h3 className="font-semibold">TRANSFER</h3>
          <span className="bg-error text-neutral font-semibold text-xs px-1 rounded">
            locked
          </span>
        </li>
        <div className="bg-secondary w-0.5 h-3 rounded-full"></div>
        <li className="flex gap-2">
          <h3 className="font-semibold">HAS CDN</h3>
          <div className="bg-success text-neutral w-4 h-4 rounded-full font-semibold flex justify-center items-center">
            <FaCheck size={8} />
          </div>
        </li>
        <li className="flex gap-2">
          <h3 className="font-semibold">WWW SSL</h3>
          {wwwSsl ? (
            <div className="bg-success text-neutral w-4 h-4 rounded-full font-semibold flex justify-center items-center">
              <FaCheck size={8} />
            </div>
          ) : (
            <div className="bg-error text-neutral w-4 h-4 rounded-full font-semibold flex justify-center items-center">
              <IoClose size={12} />
            </div>
          )}
        </li>
        <li className="flex gap-2">
          <h3 className="font-semibold">HAS WP</h3>
          {hasWp ? (
            <div className="bg-success text-neutral w-4 h-4 rounded-full font-semibold flex justify-center items-center">
              <FaCheck size={8} />
            </div>
          ) : (
            <div className="bg-error text-neutral w-4 h-4 rounded-full font-semibold flex justify-center items-center">
              <IoClose size={12} />
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Markers;
