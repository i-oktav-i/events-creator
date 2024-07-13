import { ChangeEventHandler, FC } from "react";

import { AppThemeMode, useAppTheme } from "@shared/AppTheme";

const options: Record<AppThemeMode, string> = {
  [AppThemeMode.AUTO]: "Автоматическая",
  [AppThemeMode.DARK]: "Темная",
  [AppThemeMode.LIGHT]: "Светлая",
};

export const ThemeModeSelector: FC = () => {
  const { setThemeMode, themeMode: currentThemeMode } = useAppTheme();

  const onChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setThemeMode(event.target.value as AppThemeMode);
  };

  return (
    <select defaultValue={currentThemeMode} onChange={onChange}>
      {Object.entries(options).map(([themeMode, label]) => (
        <option key={themeMode} value={themeMode}>
          {label}
        </option>
      ))}
    </select>
  );
};
