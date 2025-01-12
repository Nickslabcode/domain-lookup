import { cn } from '../helpers/className/cn.helper';

const NotAvailableMarker: React.FC<{
  className?: string;
  loading?: boolean;
}> = ({ className, loading }) => {
  return (
    <div
      className={cn(
        `${
          loading ? 'bg-none' : 'bg-secondary'
        } text-neutral font-semibold text-xs px-1 rounded flex items-center`,
        className
      )}
    >
      {loading ? (
        <span className="loading loading-spinner loading-xs text-primary"></span>
      ) : (
        <span>N/A</span>
      )}
    </div>
  );
};

export default NotAvailableMarker;
