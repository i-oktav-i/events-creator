import {
  FieldArray,
  FieldArrayProps,
  FieldArrayRenderProps,
} from "react-final-form-arrays";

import { useState } from "react";

import { bevis } from "../../utils/bevis";

import s from "./FieldWithPagination.module.css";

const b = bevis(s, "FieldWithPagination");

export type FieldWithPaginationProps<T> = {
  name: string;
  label: string;
  renderItem: (
    name: string,
    index: number,
    onRemove: () => void
  ) => React.ReactNode;
  getErrorText?: (
    meta: FieldArrayRenderProps<T, HTMLElement>["meta"]
  ) => React.ReactNode;
  validate?: FieldArrayProps<T, HTMLElement>["validate"];
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
        <fieldset className={b()}>
          <legend>{label}</legend>

          {fields.map((name, index) => (
            <fieldset
              key={name}
              className={b("Item", { active: index === visibleItem })}
            >
              {renderItem(name, index, () => {
                fields.remove(index);

                if (visibleItem < (fields.length ?? 0) - 1) return;

                setVisibleItem(0);
              })}
            </fieldset>
          ))}

          <div className={b("Pagination")}>
            <button
              type="button"
              className={b("ItemAddButton")}
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
                className={b("ItemSelectButton", {
                  active: index === visibleItem,
                })}
              >
                {index}
              </button>
            ))}
          </div>

          {getErrorText ? (
            <span className={b("Error")}>{getErrorText(meta)}</span>
          ) : null}
        </fieldset>
      )}
    </FieldArray>
  );
};
