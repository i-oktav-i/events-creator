import { useEffect, useState } from "react";

import { appThemeService } from "./AppThemeService";

export const useAppTheme = () => {
  const [themeMode, setThemeMode] = useState(appThemeService.currentThemeMode);
  const [theme, setTheme] = useState(appThemeService.currentTheme);

  useEffect(() => appThemeService.subscribeThemeMode(setThemeMode), []);
  useEffect(() => appThemeService.subscribeTheme(setTheme), []);

  return {
    theme,
    themeMode,
    setThemeMode: appThemeService.setThemeMode,
  };
};
