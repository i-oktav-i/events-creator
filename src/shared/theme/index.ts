import { themeDependentTokensConfig, tokensConfig } from './base.css';
import { colorsContract } from './colorsContract.css';

export { themeDependentTokensClassName as baseClassName } from './base.css';
export { container, type ContainerProps } from './container.css';
export { darkThemeClassName } from './dark.css';
export { indent, type IndentProps } from './indents.css';
export { lightThemeClassName } from './light.css';
export { typography } from './typography.css';
export { inset, type InsetProps } from './inset.css';

export const config = {
  ...tokensConfig,
  ...themeDependentTokensConfig,
  ...colorsContract,
};
