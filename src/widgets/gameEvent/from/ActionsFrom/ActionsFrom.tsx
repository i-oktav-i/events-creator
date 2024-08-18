import _get from 'lodash/get';
import { FC, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { UnknownGameEvent, unknownGameEventAction } from '@entities/gameEvent';

import { ActionForm } from './ActionForm';
import { actionsContainer, paginationButton, paginationContainer } from './ActionsFrom.css';

export type ActionsFormProps = {
  name: 'actions';
};

export const ActionsFrom: FC<ActionsFormProps> = ({ name }) => {
  const [currentActionIndex, setCurrentActionIndex] = useState(0);

  const {
    control,
    formState: { errors },
  } = useFormContext<UnknownGameEvent>();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
    rules: { required: 'Required' },
  });

  const actionsErrors = _get(errors, name);

  const addItem = () => {
    append(unknownGameEventAction);

    setCurrentActionIndex(fields.length);
  };

  const removeItem = () => {
    remove(currentActionIndex);

    setCurrentActionIndex(0);
  };

  return (
    <fieldset className={actionsContainer}>
      <legend>Actions</legend>

      {fields.map((field, index) => (
        <ActionForm
          key={field.id}
          name={`${name}.${index}`}
          hidden={index !== currentActionIndex}
        />
      ))}

      <button type="button" onClick={removeItem} className={paginationButton()}>
        Remove current action
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
          Add Action
        </button>
      </div>
    </fieldset>
  );
};
