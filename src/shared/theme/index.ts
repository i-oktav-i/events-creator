import { tokensConfig } from './base.css';
import { colorsConfig } from './light.css';

export { container, type ContainerProps } from './container.css';
export { darkThemeClassName } from './dark.css';
export { indent, type IndentProps } from './indents.css';
export { lightThemeClassName } from './light.css';
export { typography } from './typography.css';
export { inset, type InsetProps } from './inset.css';

export const config = {
  ...tokensConfig,
  ...colorsConfig,
};
