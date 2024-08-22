import { Link } from 'react-router-dom';

import { ThemeModeSelector } from '@features/appTheme';
import { locale as fullLocale } from '@shared/locale';

import * as s from './Header.css';

const locale = fullLocale.header;

export const Header = () => {
  return (
    <header className={s.header}>
      <nav className={s.navigation}>
        <Link to="/">{locale.gameEvents}</Link>
        <Link to="/graph/">{locale.graph}</Link>
      </nav>

      <ThemeModeSelector />
    </header>
  );
};
