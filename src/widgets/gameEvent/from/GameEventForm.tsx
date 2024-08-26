import cn from 'classnames';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { GameEvent, GameEventType } from '@entities/gameEvent';
import { locale as fullLocale } from '@shared/locale';
import { Checkbox, NumberInput, SelectField, TextField } from '@shared/ui';

import { ActionsFrom } from './ActionsFrom';
import { Dependencies } from './dependencies';

import * as s from './GameEventForm.css';

const locale = fullLocale.gameEvents.from;
const formsLocale = fullLocale.forms;

const typeOptions: { [Type in GameEventType]: { value: Type; label: string } }[GameEventType][] = [
  { value: 'weekly', label: locale.eventType.weekly },
  { value: 'weekend', label: locale.eventType.weekend },
];

export type GameEventFormProps = {
  onSubmit: (gameEvent: GameEvent) => void;
  onAbort: () => void;
  defaultValues: GameEvent;
  className?: string;
};

export const GameEventForm: FC<GameEventFormProps> = ({
  defaultValues,
  onSubmit,
  onAbort,
  className,
}) => {
  const methods = useForm<GameEvent>({ defaultValues });

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={cn(s.from, className)}>
        <SelectField
          {...register('type', { required: 'Required' })}
          label={locale.eventType.title}
          options={typeOptions}
        />

        <TextField
          {...register('title', { required: 'Required' })}
          label={locale.title}
          error={errors.title}
        />

        <TextField
          {...register('description', { required: 'Required' })}
          label={locale.description}
          error={errors.description}
          asTextArea
        />

        <TextField
          {...register('triggerProbability', {
            required: 'Required',
            min: { message: `${formsLocale.min} 0`, value: 0 },
            max: { message: `${formsLocale.max} 1`, value: 1 },
          })}
          label={locale.triggerProbability}
          error={errors.triggerProbability}
        />

        <NumberInput
          {...register('checksAttempts', {
            min: { message: `${formsLocale.min} 1`, value: 1 },
          })}
          label={locale.checksAttempts}
          error={errors.checksAttempts}
        />

        <Checkbox
          {...register('allowOverStack')}
          label={locale.allowOverStack}
          error={errors.allowOverStack}
        />

        <Dependencies name="dependencies" />

        <ActionsFrom name="actions" />

        <button type="submit">{formsLocale.actions.submit}</button>
        <button type="button" onClick={() => reset()}>
          {formsLocale.actions.reset}
        </button>
        <button type="button" onClick={onAbort}>
          {formsLocale.actions.abort}
        </button>
      </form>
    </FormProvider>
  );
};
