import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { GameEvent, GameEventType } from '@entities/gameEvent';
import { Checkbox, NumberInput, SelectField, TextField } from '@shared/ui';

import { ActionsFrom } from './ActionsFrom';
import * as s from './GameEventForm.css';
import { Dependencies } from './dependencies';

const typeOptions: { [Type in GameEventType]: { value: Type; label: string } }[GameEventType][] = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'weekend', label: 'Weekend' },
];

export type GameEventFormProps = {
  onSubmit: (gameEvent: GameEvent) => void;
  onAbort: () => void;
  defaultValues: GameEvent | Pick<GameEvent, 'id'>;
};

export const GameEventForm: FC<GameEventFormProps> = ({ defaultValues, onSubmit, onAbort }) => {
  const methods = useForm<GameEvent>({ defaultValues });

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.from}>
        <SelectField
          {...register('type', { required: 'Required' })}
          label={'Type'}
          options={typeOptions}
        />

        <TextField
          {...register('title', { required: 'Required' })}
          label="Title"
          error={errors.title}
        />

        <TextField
          {...register('description', { required: 'Required' })}
          label="Description"
          error={errors.description}
          asTextArea
        />

        <TextField
          {...register('triggerProbability', {
            required: 'Required',
            min: { message: 'Minimum 0', value: 0 },
            max: { message: 'Maximum 1', value: 1 },
          })}
          label="Trigger Probability"
          error={errors.triggerProbability}
        />

        <NumberInput
          {...register('checksAttempts', {
            required: 'Required',
            min: { message: 'Minimum 1', value: 1 },
          })}
          label="Checks Attempts"
          error={errors.checksAttempts}
        />

        <Checkbox
          label="Allow Over Stack"
          error={errors.allowOverStack}
          {...register('allowOverStack')}
        />

        <Dependencies name="dependencies" />

        <ActionsFrom name="actions" />

        <button type="submit">Submit</button>
        <button type="button" onClick={() => reset()}>
          Reset
        </button>
        <button type="button" onClick={onAbort}>
          Abort
        </button>
      </form>
    </FormProvider>
  );
};
