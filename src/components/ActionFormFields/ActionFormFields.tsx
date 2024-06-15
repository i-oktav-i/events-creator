import { FC } from "react";
import {
  FieldWithPagination,
  FieldWithPaginationProps,
} from "../FieldWithPagination";
import { atLeastOne } from "../../utils/form";
import { Field } from "react-final-form";
import { InputField } from "../InputField";

import s from "./ActionForm.module.css";
import { bevis } from "../../utils/bevis";
import { GameEvent, GameEventAction } from "../../typings/event";
import { FormApi } from "final-form";
import { DependenciesFormFields } from "../DependenciesFormFields";

const b = bevis(s, "ActionForm");

export type ActionFormFieldsProps = {
  name: string;
  events: GameEvent[];
  form: FormApi;
};

const getErrorText: FieldWithPaginationProps<GameEventAction>["getErrorText"] =
  (meta) => {
    if (!meta.error || !meta.touched) return null;

    if (Array.isArray(meta.error)) {
      const errorIndexes = meta.error
        .map((error, index) => [index, error])
        .filter(([, error]) => error)
        .map(([index]) => index)
        .join(", ");

      return `Ошибка в действиях № ${errorIndexes}`;
    }

    return meta.error;
  };

export const ActionFormFields: FC<ActionFormFieldsProps> = ({
  name,
  events,
  form,
}) => {
  return (
    <FieldWithPagination<GameEventAction>
      name={name}
      label="Действия"
      validate={atLeastOne}
      getErrorText={getErrorText}
      renderItem={(field, index, onRemove) => (
        <div className={b()}>
          <InputField name={`${field}.title`} label="Название действия" />

          <InputField
            name={`${field}.description`}
            label="Описание действия"
            asTextArea
          />

          <fieldset className={b("ActionsChange")}>
            <legend>Изменения</legend>

            <label>
              Группа 1
              <Field
                key={field}
                name={`${field}.changes.group1`}
                component="input"
                type="number"
                defaultValue={0}
              />
            </label>

            <label>
              Группа 2
              <Field
                key={field}
                name={`${field}.changes.group2`}
                component="input"
                type="number"
                defaultValue={0}
              />
            </label>
          </fieldset>

          <DependenciesFormFields
            events={events}
            form={form}
            name={`${field}.dependencies`}
          />

          <button type="button" onClick={onRemove}>
            Удалить действие
          </button>
        </div>
      )}
    />
  );
};
