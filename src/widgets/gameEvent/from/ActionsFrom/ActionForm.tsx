import _get from 'lodash/get';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { UnknownGameEvent } from '@entities/gameEvent';
import { TextField } from '@shared/ui';

import { Dependencies } from '../dependencies/Dependencies';
import { ActionChanges } from './ActionChanges';
import { actionContainer } from './ActionsFrom.css';

type ActionFormProps = {
  name: `actions.${number}`;
  hidden?: boolean;
};
export const ActionForm: FC<ActionFormProps> = ({ name, hidden }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<UnknownGameEvent>();

  const actionErrors = _get(errors, name);

  return (
    <fieldset className={actionContainer[hidden ? 'hidden' : 'visible']}>
      <legend>Action</legend>

      <TextField
        {...register(`${name}.title`, { required: 'Required' })}
        label={'title'}
        error={actionErrors?.title}
      />

      <TextField
        {...register(`${name}.description`, { required: 'Required' })}
        label={'description'}
        asTextArea
        error={actionErrors?.description}
      />

      <Dependencies name={`${name}.dependencies`} type="actions" />

      <ActionChanges name={`${name}.changes`} />
    </fieldset>
  );
};
