import cn from 'classnames';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { useAppThemeClassName } from '@features/appTheme';
import { Header } from '@widgets/Header';

import * as s from './Layout.css';

export const Layout: FC = () => {
  const themeClassName = useAppThemeClassName();

  return (
    <div className={cn(s.layout, themeClassName)}>
      <Header />

      <main className={s.main}>
        <Outlet />
      </main>

      <div id="portal"></div>
    </div>
  );
};
