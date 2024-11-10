import React, { useState } from 'react';
import { Theme } from '../enums/Theme.enum';
import { useTheme } from '../providers/ThemeProvider';
import { FaPaintRoller } from 'react-icons/fa';

const ThemeController: React.FC = () => {
  const { theme, changeTheme } = useTheme();
  const [themes, _] = useState<Theme[]>(() => Object.values(Theme));

  return (
    <div className="dropdown dropdown-top">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-sm m-1">
        <FaPaintRoller />
        {theme}
        <svg
          width="12px"
          height="12px"
          className="inline-block h-2 w-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl"
      >
        {themes.map((theme: Theme, idx: number) => (
          <li key={idx}>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
              aria-label={theme}
              value={theme}
              onChange={() => changeTheme(theme)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeController;
