import { FC } from "react";

import { FormApi } from "final-form";

import { atLeastOne } from "../../utils/form";
import {
  FieldWithPagination,
  FieldWithPaginationProps,
} from "../FieldWithPagination";
import { InputField } from "../InputField";

import { bevis } from "../../utils/bevis";

import { GameEvent, GameEventAction } from "../../typings/event";

import { DependenciesFormFields } from "../DependenciesFormFields";

import { NumberInput } from "../NumberInput";

import s from "./ActionForm.module.css";

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
      renderItem={(field, _index, onRemove) => (
        <div className={b()}>
          <InputField name={`${field}.title`} label="Название действия" />

          <InputField
            name={`${field}.description`}
            label="Описание действия"
            asTextArea
          />

          <fieldset className={b("ActionsChange")}>
            <legend>Изменения</legend>

            <NumberInput label="Группа 1" name={`${field}.changes.group1`} />

            <NumberInput label="Группа 2" name={`${field}.changes.group2`} />
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
