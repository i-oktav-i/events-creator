import cn from 'classnames';
import { FC } from 'react';

import { Link, Outlet } from 'react-router-dom';

import { ThemeModeSelector } from '../ThemeModeSelector';

import * as s from './Layout.css';
import { useAppThemeClass } from './useAppThemeClass';

export const Layout: FC = () => {
  const themeClassName = useAppThemeClass();

  return (
    <div className={cn(s.layout, themeClassName)}>
      <header className={s.header}>
        <nav className={s.navigation}>
          <Link to="/">Создание событий</Link>
          <Link to="/game/">Игра</Link>
        </nav>

        <ThemeModeSelector />
      </header>

      <main className={s.main}>
        <Outlet />
      </main>

      <div id="portal"></div>
    </div>
  );
};
