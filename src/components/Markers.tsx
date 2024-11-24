import { FaCheck } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const Markers = () => {
  return (
    <div className="my-20 bg-base-200 py-2 px-4 rounded-lg text-secondary">
      <ul className="flex gap-6 text-xs items-center">
        <li className="flex items-center gap-2">
          <h3 className="font-semibold">AAAA</h3>
          <div className="bg-success text-neutral w-4 h-4 rounded-full font-semibold flex justify-center items-center">
            <IoClose size={12} />
            {/* <FaCheck size={10} /> */}
          </div>
        </li>
        <li className="flex items-center gap-2">
          <h3 className="font-semibold">WWW DNS</h3>
          <div className="bg-success text-neutral w-4 h-4 rounded-full font-semibold flex justify-center items-center">
            {/* <span>3</span> */}
            <FaCheck size={8} />
          </div>
        </li>
        <div className="bg-secondary w-0.5 h-3 rounded-full"></div>
        <li className="flex items-center gap-2">
          <h3 className="font-semibold">DNSSEC</h3>
          <span className="bg-success text-neutral font-semibold text-xs px-1 rounded">
            unsigned
          </span>
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
            {/* <span>3</span> */}
            <FaCheck size={8} />
          </div>
        </li>
        <li className="flex gap-2">
          <h3 className="font-semibold">WWW SSL</h3>
          <div className="bg-success text-neutral w-4 h-4 rounded-full font-semibold flex justify-center items-center">
            {/* <span>3</span> */}
            <FaCheck size={8} />
          </div>
        </li>
        <li className="flex gap-2">
          <h3 className="font-semibold">HAS WP</h3>
          <div className="bg-error text-neutral w-4 h-4 rounded-full font-semibold flex justify-center items-center">
            <IoClose size={12} />
            {/* <FaCheck size={10} /> */}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Markers;
