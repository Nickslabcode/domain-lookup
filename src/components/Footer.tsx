import { useCallback } from 'react';
import { Shortcut } from '../enums/Shortcut.enum';
import AppVersion from './AppVersion';
import ShortKeys from './ShortKeys';
import ThemeController from './ThemeController';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  const getCurrentYear = useCallback((): string => {
    const date = new Date();
    return date.getFullYear().toString();
  }, []);

  return (
    <div className="mt-10">
      <ShortKeys keys={Object.values(Shortcut)} />
      <div className="flex items-center text-sm justify-around text-base-content">
        <p>© {getCurrentYear()} Nikola Nenovski. All rights reserved.</p>
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
