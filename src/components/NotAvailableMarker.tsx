import { cn } from '../helpers/cn.helper';

const NotAvailableMarker: React.FC<{
  className?: string;
  loading?: boolean;
}> = ({ className, loading }) => {
  return (
    <div
      className={cn(
        'bg-secondary text-neutral font-semibold text-xs px-1 rounded flex items-center',
        className
      )}
    >
      {loading ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        <span>N/A</span>
      )}
    </div>
  );
};

export default NotAvailableMarker;
