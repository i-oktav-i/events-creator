import { FC } from 'react';

import { FormApi } from 'final-form';

import { GameEvent, GameEventAction } from '@entities/gameEvent';
import { validators } from '@shared/formUtils';
import { InputField, NumberInput } from '@shared/ui';

import { FieldWithPagination, FieldWithPaginationProps } from '../FieldWithPagination';

import { DependenciesFormFields } from '../DependenciesFormFields';

import * as s from './ActionForm.css';

export type ActionFormFieldsProps = {
  name: string;
  events: GameEvent[];
  form: FormApi;
};

const getErrorText: FieldWithPaginationProps<GameEventAction>['getErrorText'] = (meta) => {
  if (!meta.error || !meta.touched) return null;

  if (Array.isArray(meta.error)) {
    const errorIndexes = meta.error
      .map((error, index) => [index, error])
      .filter(([, error]) => error)
      .map(([index]) => index)
      .join(', ');

    return `Ошибка в действиях № ${errorIndexes}`;
  }

  return meta.error;
};

export const ActionFormFields: FC<ActionFormFieldsProps> = ({ name, events, form }) => {
  return (
    <FieldWithPagination<GameEventAction>
      name={name}
      label="Действия"
      validate={validators.atLeastOne}
      getErrorText={getErrorText}
      renderItem={(field, _index, onRemove) => (
        <div className={s.actionForm}>
          <InputField name={`${field}.title`} label="Название действия" />

          <InputField name={`${field}.description`} label="Описание действия" asTextArea />

          <fieldset className={s.actionFormActionsChange}>
            <legend>Изменения</legend>

            <NumberInput label="Группа 1" name={`${field}.changes.group1`} />

            <NumberInput label="Группа 2" name={`${field}.changes.group2`} />
          </fieldset>

          <DependenciesFormFields events={events} form={form} name={`${field}.dependencies`} />

          <button type="button" onClick={onRemove}>
            Удалить действие
          </button>
        </div>
      )}
    />
  );
};
