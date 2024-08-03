import { Link } from 'react-router-dom';

import { ThemeModeSelector } from '@features/appTheme';
import * as s from './Header.css';

export const Header = () => {
  return (
    <header className={s.header}>
      <nav className={s.navigation}>
        <Link to="/">Создание событий</Link>
        <Link to="/game/">Игра</Link>
      </nav>

      <ThemeModeSelector />
    </header>
  );
};
