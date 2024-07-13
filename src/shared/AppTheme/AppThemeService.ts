import { AppTheme, AppThemeMode } from "./types";

type ThemeModeCallbacks = (themeMode: AppThemeMode) => void;
type ThemeCallbacks = (theme: AppTheme) => void;

const lightThemeMedia = matchMedia("(prefers-color-scheme: light)");

class AppThemeService {
  #currentThemeMode!: AppThemeMode;
  #currentTheme!: AppTheme;
  #themeModeCallbacks: ThemeModeCallbacks[] = [];
  #themeCallbacks: ThemeCallbacks[] = [];

  get currentThemeMode() {
    return this.#currentThemeMode;
  }

  private set currentThemeMode(value) {
    this.#currentThemeMode = value;

    this.#themeModeCallbacks.forEach((callback) => callback(value));
  }

  get currentTheme() {
    return this.#currentTheme;
  }

  private set currentTheme(value) {
    this.#currentTheme = value;

    this.#themeCallbacks.forEach((callback) => callback(value));
  }

  get prefersColorScheme() {
    return lightThemeMedia.matches ? AppTheme.LIGHT : AppTheme.DARK;
  }

  constructor(private readonly storageKey: string) {
    this.subscribeThemeMode(this.wrightThemeModeToStorage);

    this.currentThemeMode = this.readThemeModeFromStorage();

    this.updateCurrentTheme();

    lightThemeMedia.addEventListener("change", this.updateCurrentTheme);
  }

  updateCurrentTheme = () => {
    this.currentTheme =
      this.#currentThemeMode === AppThemeMode.AUTO
        ? this.prefersColorScheme
        : AppTheme[this.#currentThemeMode];
  };

  setThemeMode = (value: AppThemeMode) => {
    this.currentThemeMode = value;

    this.updateCurrentTheme();
  };

  readThemeModeFromStorage = () => {
    return (
      (localStorage.getItem(this.storageKey) as AppThemeMode) ??
      AppThemeMode.AUTO
    );
  };

  wrightThemeModeToStorage = (value: AppThemeMode) => {
    localStorage.setItem(this.storageKey, value);
  };

  subscribeThemeMode = (callback: ThemeModeCallbacks) => {
    this.#themeModeCallbacks.push(callback);

    return () => this.unsubscribeThemeMode(callback);
  };

  unsubscribeThemeMode = (callback: ThemeModeCallbacks) => {
    this.#themeModeCallbacks.filter((item) => item !== callback);
  };

  subscribeTheme = (callback: ThemeCallbacks) => {
    this.#themeCallbacks.push(callback);

    return () => this.unsubscribeTheme(callback);
  };

  unsubscribeTheme = (callback: ThemeCallbacks) => {
    this.#themeCallbacks.filter((item) => item !== callback);
  };
}

export const appThemeService = new AppThemeService("theme_mode");

console.log("appThemeService", appThemeService);
