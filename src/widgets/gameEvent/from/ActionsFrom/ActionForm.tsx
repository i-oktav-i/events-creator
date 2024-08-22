import _get from 'lodash/get';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { GameEvent } from '@entities/gameEvent';
import { locale as fullLocale } from '@shared/locale';
import { TextField } from '@shared/ui';

import { Dependencies } from '../dependencies';
import { ActionChanges } from './ActionChanges';
import { actionContainer } from './ActionsFrom.css';

const locale = fullLocale.gameEvents.actions;

export type ActionFormProps = {
  name: `actions.${number}`;
  hidden?: boolean;
};

export const ActionForm: FC<ActionFormProps> = ({ name, hidden }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<GameEvent>();

  const actionErrors = _get(errors, name);

  return (
    <div className={actionContainer[hidden ? 'hidden' : 'visible']}>
      <TextField
        {...register(`${name}.title`, { required: 'Required' })}
        label={locale.form.title}
        error={actionErrors?.title}
      />

      <TextField
        {...register(`${name}.description`, { required: 'Required' })}
        label={locale.form.description}
        asTextArea
        error={actionErrors?.description}
      />

      <Dependencies name={`${name}.dependencies`} />

      <ActionChanges name={`${name}.changes`} />
    </div>
  );
};
