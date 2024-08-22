import _get from 'lodash/get';
import { FC, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { GameEvent, GameEventActionId } from '@entities/gameEvent';
import { locale as fullLocale } from '@shared/locale';

import { ActionForm } from './ActionForm';
import {
  actionsContainer,
  actionsError,
  paginationButton,
  paginationContainer,
} from './ActionsFrom.css';

const locale = fullLocale.gameEvents.actions;

export type ActionsFormProps = {
  name: 'actions';
};

export const ActionsFrom: FC<ActionsFormProps> = ({ name }) => {
  const [currentActionIndex, setCurrentActionIndex] = useState(0);

  const {
    control,
    formState: { errors },
    getValues,
  } = useFormContext<GameEvent>();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
    rules: { required: 'Required' },
  });

  const actionsErrors = _get(errors, name);

  const addItem = () => {
    const gameEventId = getValues('id');
    const actions = getValues(name);
    const maxActionId = actions.length
      ? Math.max(...actions.map((action) => +(action.id.split('-').at(-1) ?? 0)))
      : 0;
    const newActionId = maxActionId + 1;

    append({
      id: `${gameEventId}-${newActionId}` as GameEventActionId,
      description: '',
      title: '',
    });

    setCurrentActionIndex(fields.length);
  };

  const removeItem = () => {
    remove(currentActionIndex);

    setCurrentActionIndex(0);
  };

  return (
    <fieldset className={actionsContainer}>
      <legend>
        {locale.title}

        {actionsErrors?.root?.message ? (
          <span className={actionsError}>{actionsErrors.root.message}</span>
        ) : null}
      </legend>

      {fields.map((field, index) => (
        <ActionForm
          key={field.id}
          name={`${name}.${index}`}
          hidden={index !== currentActionIndex}
        />
      ))}

      <button type="button" onClick={removeItem} className={paginationButton()}>
        {locale.form.actions.remove}
      </button>

      <div className={paginationContainer}>
        {fields.map((_, index) => (
          <button
            key={index}
            type="button"
            className={paginationButton({
              active: index === currentActionIndex,
              error: !!actionsErrors?.[index],
            })}
            onClick={() => setCurrentActionIndex(index)}
          >
            {index}
          </button>
        ))}

        <button type="button" onClick={addItem} className={paginationButton()}>
          {locale.form.actions.add}
        </button>
      </div>
    </fieldset>
  );
};
