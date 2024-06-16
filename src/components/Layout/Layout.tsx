import { FC } from "react";

import { Link, Outlet } from "react-router-dom";

import { bevis } from "../../utils/bevis";

import s from "./Layout.module.css";

const b = bevis(s, "Layout");

export const Layout: FC = () => {
  return (
    <div className={b()}>
      <header className={b("header")}>
        <nav className={b("navigation")}>
          <Link to="/">Создание событий</Link>
          <Link to="/game/">Игра</Link>
        </nav>
      </header>

      <main className={b("main")}>
        <Outlet />
      </main>
    </div>
  );
};
