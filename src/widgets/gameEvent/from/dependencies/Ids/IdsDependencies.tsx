import _get from 'lodash/get';
import { FC, useState } from 'react';
import { FieldError, useFieldArray, useFormContext } from 'react-hook-form';

import { EventSelectModal } from '@components/EventSelect';
import { EventsActionsSelectModal } from '@components/EventsActionsSelect';
import {
  GameEventActionId,
  GameEventId,
  IdsDependenciesInfo,
  UnknownGameEvent,
  gameEventsClient,
} from '@entities/gameEvent';
import { SelectField, TextField } from '@shared/ui';

import * as s from './IdsDependencies.css';

const dependencyTypeOptions: {
  value: IdsDependenciesInfo<string | number>['type'];
  label: string;
}[] = [
  { value: 'all', label: 'All' },
  { value: 'any', label: 'Any' },
];

export type IdsDependenciesErrors = {
  type?: FieldError;
  ids?: (FieldError | IdsDependenciesErrors)[];
};

type IdsPath = `${'events' | 'actions'}.${'required' | 'blocking'}`;

export type IdsDependenciesProps = {
  idsType: 'events' | 'actions';
  name: `dependencies.${IdsPath}` | `actions.${number}.dependencies.${IdsPath}`;
};

const IdsDependenciesFields: FC<IdsDependenciesProps> = ({ name, idsType }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useFormContext<UnknownGameEvent>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `${name}.ids` as const,
  });

  const idsErrors = _get(errors, name) as IdsDependenciesErrors;

  const dependencyType = watch(`${name}.type`);

  const IdsSelectorComponent = idsType === 'actions' ? EventsActionsSelectModal : EventSelectModal;

  const onModalClose = () => setIsModalOpen(false);

  const onIdsSelect = (ids: (GameEventActionId | GameEventId)[]) => {
    append(ids);
    onModalClose();
  };

  return (
    <>
      <fieldset>
        <SelectField
          {...register(`${name}.type`)}
          label="Dependency type"
          options={dependencyTypeOptions}
          error={idsErrors?.type}
        />

        <fieldset className={s.idsContainer[dependencyType]}>
          <legend>IDs</legend>

          {fields.map((field, index) => (
            <div key={field.id}>
              {!('type' in field) ? (
                <TextField
                  {...register(`${name}.ids.${index}`, { required: 'Required' })}
                  placeholder="Enter ID"
                  error={idsErrors?.ids?.[index] as FieldError}
                />
              ) : (
                <IdsDependenciesFields
                  name={`${name}.ids.${index}` as IdsDependenciesProps['name']}
                  idsType={idsType}
                />
              )}

              <button type="button" onClick={() => remove(index)}>
                Remove
              </button>
            </div>
          ))}
        </fieldset>

        <button type="button" onClick={() => setIsModalOpen(true)}>
          Add ID
        </button>

        <button
          type="button"
          onClick={() => append({ type: dependencyType === 'all' ? 'any' : 'all', ids: [] })}
        >
          Add Nested Dependency
        </button>
      </fieldset>

      {isModalOpen ? (
        <IdsSelectorComponent
          events={gameEventsClient.events}
          onSelect={onIdsSelect}
          onClose={onModalClose}
        />
      ) : null}
    </>
  );
};

export const IdsDependencies: FC<IdsDependenciesProps> = ({ name, idsType }) => {
  return (
    <fieldset className={s.fieldsContainer}>
      <legend>Ids Dependencies</legend>

      <IdsDependenciesFields name={name} idsType={idsType} />
    </fieldset>
  );
};
