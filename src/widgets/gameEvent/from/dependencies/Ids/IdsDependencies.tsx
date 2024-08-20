import _get from 'lodash/get';
import { FC, useState } from 'react';
import { FieldError, useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import {
  GameEvent,
  GameEventAction,
  IdsDependenciesInfo,
  gameEventsClient,
} from '@entities/gameEvent';
import { SelectField } from '@shared/ui';

import { GameEventActionSelectModal } from '../../../GameEventActionSelectModal';
import { GameEventSelectModal } from '../../../GameEventSelectModal';

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
    formState: { errors },
    getValues,
  } = useFormContext<GameEvent>();

  const idsFieldsName = `${name}.ids` as const;
  const dependencyTypeFieldName = `${name}.type` as const;

  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: idsFieldsName,
  });

  const idsErrors = _get(errors, name) as IdsDependenciesErrors;

  const dependencyType = useWatch({ control, name: dependencyTypeFieldName });

  const IdsSelectorComponent =
    idsType === 'actions' ? GameEventActionSelectModal : GameEventSelectModal;

  const getTitle = (id: string) => {
    const method = idsType === 'events' ? 'findGameEvent' : 'findGameEventAction';

    return gameEventsClient[method](id as never)?.title;
  };

  const onModalClose = () => setIsModalOpen(false);

  const onIdsSelect = (items: (GameEventAction | GameEvent)[]) => {
    // biome-ignore lint/suspicious/noExplicitAny: TODO: Подумать
    const filtered = items.filter((item) => !getValues(idsFieldsName).includes(item.id as any));

    prepend(filtered.map((item) => item.id));

    onModalClose();
  };

  return (
    <>
      <fieldset>
        <SelectField
          {...register(dependencyTypeFieldName)}
          label="Dependency type"
          options={dependencyTypeOptions}
          error={idsErrors?.type}
        />

        <fieldset className={s.idsContainer[dependencyType]}>
          <legend>IDs</legend>

          {fields.map((field, index) => (
            <div key={field.id}>
              {!('type' in field) ? (
                <span>{getTitle(getValues(`${idsFieldsName}.${index}`).toString())}</span>
              ) : (
                <IdsDependenciesFields
                  name={`${idsFieldsName}.${index}` as IdsDependenciesProps['name']}
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

      <IdsSelectorComponent
        type="multi"
        isOpen={isModalOpen}
        onSelect={onIdsSelect}
        onClose={onModalClose}
      />
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
