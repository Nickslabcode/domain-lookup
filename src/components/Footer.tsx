import { Shortcut } from '../enums/shortcut.enum';
import AppVersion from './AppVersion';
import ShortKeys from './ShortKeys';
import ThemeController from './ThemeController';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="mt-10">
      <ShortKeys keys={Object.values(Shortcut)} />
      <div className="flex items-center text-sm justify-around text-base-content">
        <p>© 2024 Nikola Nenovski. All right reserved.</p>
        <div className="flex items-center gap-2 cursor-default">
          <AppVersion />
          <a
            href="https://github.com/Nickslabcode/domain-info-lookup"
            className="flex items-center gap-2 font-semibold hover:text-neutral-content"
            target="_blank"
          >
            <FaGithub size={18} />
            Source
          </a>
          <ThemeController />
        </div>
      </div>
    </div>
  );
};

export default Footer;
