import cn from 'classnames';

import { capitalize } from './capitalize';

type State = Record<string, string | boolean | number | void | undefined>;

export const bevis = (styles: Record<string, string>, blockName: string) => {
  function classGenerator(elementName: string, state?: State): string;
  function classGenerator(state?: State): string;
  function classGenerator(elementOrState?: string | State, state?: State): string {
    let className = capitalize(blockName);
    const modifications: string[] = [];

    if (elementOrState) {
      if (typeof elementOrState === 'string') {
        className += `__${capitalize(elementOrState)}`;
      } else {
        state = elementOrState;
      }
    }

    if (state) {
      Object.keys(state).forEach((key) => {
        const value = state?.[key];

        if (!value) return;

        const modificationClass = `${className}_${key}`;

        modifications.push(
          styles[
            value === true ? modificationClass : `${modificationClass}${capitalize(`${value}`)}`
          ],
        );
      });
    }

    return cn(styles[className], modifications);
  }

  return classGenerator;
};
