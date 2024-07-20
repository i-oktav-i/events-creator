import { ReactNode, useState } from 'react';
import { FieldArray, FieldArrayProps, FieldArrayRenderProps } from 'react-final-form-arrays';

import * as s from './FieldWithPagination.css';

export type FieldWithPaginationProps<T> = {
  name: string;
  label: string;
  renderItem: (name: string, index: number, onRemove: () => void) => ReactNode;
  getErrorText?: (meta: FieldArrayRenderProps<T, HTMLElement>['meta']) => ReactNode;
  validate?: FieldArrayProps<T, HTMLElement>['validate'];
};

export const FieldWithPagination = <T,>({
  name,
  label,
  renderItem,
  getErrorText,
  validate,
}: FieldWithPaginationProps<T>) => {
  const [visibleItem, setVisibleItem] = useState(0);

  return (
    <FieldArray<T> name={name} validate={validate}>
      {({ fields, meta }) => (
        <fieldset className={s.fieldWithPagination}>
          <legend>{label}</legend>

          {fields.map((name, index) => (
            <fieldset
              key={name}
              className={s.fieldWithPaginationItem({
                active: index === visibleItem,
              })}
            >
              {renderItem(name, index, () => {
                fields.remove(index);

                if (visibleItem < (fields.length ?? 0) - 1) return;

                setVisibleItem(0);
              })}
            </fieldset>
          ))}

          <div>
            <button
              type="button"
              className={s.fieldWithPaginationItemAddButton}
              onClick={() => {
                fields.push(undefined as T);
                setVisibleItem(fields.length ?? 0);
              }}
            >
              +
            </button>

            {fields.map((name, index) => (
              <button
                type="button"
                key={name}
                onClick={() => setVisibleItem(index)}
                className={s.fieldWithPaginationItemSelectButton({
                  active: index === visibleItem,
                })}
              >
                {index}
              </button>
            ))}
          </div>

          {getErrorText ? (
            <span className={s.FieldWithPaginationError}>{getErrorText(meta)}</span>
          ) : null}
        </fieldset>
      )}
    </FieldArray>
  );
};
