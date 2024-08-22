import _get from 'lodash/get';
import { FC, useState } from 'react';
import { FieldError, useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import {
  GameEvent,
  GameEventAction,
  GameEventActionId,
  GameEventId,
  IdsDependenciesInfo,
  gameEventsClient,
} from '@entities/gameEvent';
import { locale as fullLocale } from '@shared/locale';
import { SelectField } from '@shared/ui';

import { GameEventActionSelectModal } from '../../../GameEventActionSelectModal';
import { GameEventSelectModal } from '../../../GameEventSelectModal';

import * as s from './IdsDependencies.css';

const locale = fullLocale.gameEvents.dependencies.ids;

const dependencyTypeOptions: {
  value: IdsDependenciesInfo<string | number>['type'];
  label: string;
}[] = [
  { value: 'all', label: locale.dependencyType.all },
  { value: 'any', label: locale.dependencyType.any },
];

type IdsDependenciesErrors = {
  type?: FieldError;
  ids?: (FieldError | IdsDependenciesErrors)[];
};

type IdsPath = `${'events' | 'actions'}.${'required' | 'blocking'}`;

type IdsDependenciesFieldsProps = {
  idsType: 'events' | 'actions';
  name: `dependencies.${IdsPath}` | `actions.${number}.dependencies.${IdsPath}`;
};

const IdsDependenciesFields: FC<IdsDependenciesFieldsProps> = ({ name, idsType }) => {
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

  const getTitle = (id: GameEventActionId | GameEventId) => {
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
          label={locale.dependencyType.title}
          options={dependencyTypeOptions}
          error={idsErrors?.type}
        />

        <fieldset className={s.idsContainer[dependencyType]}>
          <legend>{locale.title[idsType]}</legend>

          {fields.map((field, index) => (
            <div key={field.id}>
              {!('type' in field) ? (
                <span>
                  {getTitle(
                    getValues(`${idsFieldsName}.${index}`) as GameEventActionId | GameEventId,
                  )}
                </span>
              ) : (
                <IdsDependenciesFields
                  name={`${idsFieldsName}.${index}` as IdsDependenciesFieldsProps['name']}
                  idsType={idsType}
                />
              )}

              <button type="button" onClick={() => remove(index)}>
                {locale.actions.remove}
              </button>
            </div>
          ))}
        </fieldset>

        <button type="button" onClick={() => setIsModalOpen(true)}>
          {locale.actions.addId}
        </button>

        <button
          type="button"
          onClick={() => append({ type: dependencyType === 'all' ? 'any' : 'all', ids: [] })}
        >
          {locale.actions.addNested}
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

export type IdsDependenciesProps = IdsDependenciesFieldsProps & {
  label: string;
};

export const IdsDependencies: FC<IdsDependenciesProps> = ({ name, label, idsType }) => {
  return (
    <fieldset className={s.fieldsContainer}>
      <legend>{label}</legend>

      <IdsDependenciesFields name={name} idsType={idsType} />
    </fieldset>
  );
};
