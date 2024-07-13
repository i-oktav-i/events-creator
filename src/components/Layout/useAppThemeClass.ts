import { useEffect, useState } from "react";

import { AppTheme, appThemeService } from "@shared/AppTheme";

import { darkThemeClassName, lightThemeClassName } from "@theme";

const getClassName = (theme: AppTheme) =>
  theme === AppTheme.DARK ? darkThemeClassName : lightThemeClassName;

export const useAppThemeClass = () => {
  const [themeClassName, setThemeClassName] = useState(
    getClassName(appThemeService.currentTheme)
  );

  useEffect(
    () =>
      appThemeService.subscribeTheme((newTheme) =>
        setThemeClassName(getClassName(newTheme))
      ),
    []
  );

  return themeClassName;
};
