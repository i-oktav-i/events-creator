import { ChangeEventHandler, FC } from 'react';

import { AppThemeMode, useAppTheme } from '@shared/AppTheme';
import { locale } from '@shared/locale';

const options: Record<AppThemeMode, string> = {
  [AppThemeMode.AUTO]: locale.appTheme.mode.auto,
  [AppThemeMode.DARK]: locale.appTheme.mode.dark,
  [AppThemeMode.LIGHT]: locale.appTheme.mode.light,
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
