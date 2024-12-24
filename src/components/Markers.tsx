import { FaCheck } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { DnsRecordAnswer } from '../types/DnsRecordAnswer';
import { useMemo } from 'react';
import NotAvailableMarker from './NotAvailableMarker';
import VerticalSeparator from './VerticalSeparator';

interface MarkersPropsType {
  AAAA: DnsRecordAnswer[] | string | undefined;
  hasWp: boolean;
  hasWwwRecord: boolean;
  dnssec: string | undefined;
  wwwSsl: boolean;
  domainStatusCodes: string[] | string;
}

const Markers: React.FC<MarkersPropsType> = ({
  AAAA,
  hasWp,
  hasWwwRecord,
  dnssec,
  wwwSsl,
  domainStatusCodes,
}) => {
  const transferCheck = useMemo(() => {
    if (!domainStatusCodes) return;

    if (domainStatusCodes.includes('ok')) return 'active';
    else if (domainStatusCodes.includes('pendingTransfer'))
      return 'pending transfer';
    else return 'locked';
  }, [domainStatusCodes]);

  const domainStatus = useMemo(() => {
    if (!domainStatusCodes) return;

    const statuses: string[] | string = Array.isArray(domainStatusCodes)
      ? domainStatusCodes.map((status: string) =>
          status.substring(0, status.indexOf(' '))
        )
      : domainStatusCodes.substring(0, domainStatusCodes.indexOf(' '));

    if (statuses.includes('clientHold')) return 'hold';
    else if (statuses.includes('pendingDelete')) return 'pending delete';
    else if (statuses.includes('redemptionPeriod')) return 'redemption';
    else if (statuses.includes('inactive')) return 'inactive';
    else if (statuses.includes('pendingUpdate')) return 'pending update';
    else return 'active';
  }, [domainStatusCodes]);

  return (
    <div className="mb-5 bg-base-200 py-2 px-4 rounded-lg text-neutral-content cursor-default">
      <ul className="flex gap-6 text-xs items-center">
        <li className="flex items-center gap-2">
          <h3 className="font-semibold">NO AAAA</h3>
          {!domainStatus ? (
            <NotAvailableMarker />
          ) : (
            <span
              className={`${
                Array.isArray(AAAA) ? 'bg-error' : 'bg-success'
              } text-neutral w-4 h-4 rounded-full font-semibold flex justify-center items-center`}
            >
              {Array.isArray(AAAA) ? (
                <IoClose size={12} />
              ) : (
                <FaCheck size={8} />
              )}
            </span>
          )}
        </li>
        <li className="flex items-center gap-2">
          <h3 className="font-semibold">WWW DNS</h3>
          {!domainStatus ? (
            <NotAvailableMarker />
          ) : (
            <span
              className={`${
                hasWwwRecord ? 'bg-success' : 'bg-error'
              } text-neutral w-4 h-4 rounded-full font-semibold flex justify-center items-center`}
            >
              {hasWwwRecord ? <FaCheck size={8} /> : <IoClose size={12} />}
            </span>
          )}
        </li>
        <VerticalSeparator />
        <li className="flex items-center gap-2">
          <h3 className="font-semibold">DNSSEC</h3>
          {!dnssec ? (
            <NotAvailableMarker />
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
          <div className="dropdown dropdown-hover">
            {!domainStatus ? (
              <span className="bg-secondary text-neutral font-semibold text-xs px-1 rounded">
                N/A
              </span>
            ) : (
              <span
                tabIndex={0}
                role="button"
                className={`${
                  domainStatus === 'active' ? 'bg-success' : 'bg-error'
                } text-neutral font-semibold text-xs px-1 rounded`}
              >
                {domainStatus}
              </span>
            )}
            <a
              tabIndex={0}
              className="dropdown-content menu bg-base-100 link font-semibold link-primary rounded-box z-[1] w-44 p-2 shadow"
              href="https://www.icann.org/resources/pages/epp-status-codes-2014-06-16-en"
              target="_blank"
            >
              EPP Status Codes
            </a>
          </div>
        </li>
        <li className="flex gap-2">
          <h3 className="font-semibold">TRANSFER</h3>
          {!domainStatus ? (
            <NotAvailableMarker />
          ) : (
            <span
              className={`${
                transferCheck === 'active'
                  ? 'bg-success'
                  : transferCheck === 'pending transfer'
                  ? 'bg-warning'
                  : 'bg-error'
              } text-neutral font-semibold text-xs px-1 rounded`}
            >
              {transferCheck}
            </span>
          )}
        </li>
        <VerticalSeparator />
        <li className="flex gap-2">
          <h3 className="font-semibold">HAS CDN</h3>
          {!domainStatus ? (
            <NotAvailableMarker />
          ) : (
            <span className="bg-success text-neutral w-4 h-4 rounded-full font-semibold flex justify-center items-center">
              <FaCheck size={8} />
            </span>
          )}
        </li>
        <li className="flex gap-2">
          <h3 className="font-semibold">WWW SSL</h3>
          {!domainStatus ? (
            <NotAvailableMarker />
          ) : (
            <span
              className={`${
                wwwSsl ? 'bg-success' : 'bg-error'
              } text-neutral w-4 h-4 rounded-full font-semibold flex justify-center items-center`}
            >
              {wwwSsl ? <FaCheck size={8} /> : <IoClose size={12} />}
            </span>
          )}
        </li>
        <li className="flex gap-2">
          <h3 className="font-semibold">HAS WP</h3>
          {!domainStatus ? (
            <NotAvailableMarker />
          ) : (
            <span
              className={`${
                hasWp ? 'bg-success' : 'bg-error'
              } text-neutral w-4 h-4 rounded-full font-semibold flex justify-center items-center`}
            >
              {hasWp ? <FaCheck size={8} /> : <IoClose size={12} />}
            </span>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Markers;
