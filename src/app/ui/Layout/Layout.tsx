import cn from 'classnames';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { useAppThemeClassName } from '@features/appTheme';
import { baseClassName } from '@shared/theme';
import { Header } from '@widgets/Header';

import { layout, main, portal } from './Layout.css';

export const Layout: FC = () => {
  const themeClassName = useAppThemeClassName();

  return (
    <div className={cn(layout, baseClassName, themeClassName)}>
      <Header />

      <main className={main}>
        <Outlet />
      </main>

      <div id="portal" className={portal}></div>
    </div>
  );
};
