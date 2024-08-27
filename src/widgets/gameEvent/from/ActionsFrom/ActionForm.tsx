import _get from 'lodash/get';
import { FC, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { GameEvent, gameEventsClient } from '@entities/gameEvent';
import { locale as fullLocale } from '@shared/locale';
import { TextField } from '@shared/ui';

import { GameEventSelectModal } from '@widgets/gameEvent/GameEventSelectModal';
import { Dependencies } from '../dependencies';
import { ActionChanges } from './ActionChanges';
import { actionContainer } from './ActionsFrom.css';

const locale = fullLocale.gameEvents.actions;

export type ActionFormProps = {
  name: `actions.${number}`;
  hidden?: boolean;
};

export const ActionForm: FC<ActionFormProps> = ({ name, hidden }) => {
  const [isChainedEventModalOpen, setIsChainedEventModalOpen] = useState(false);

  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<GameEvent>();

  const chainedEventFieldName = `${name}.chainedEvent` as const;

  const actionChainedEventId = useWatch({ control, name: chainedEventFieldName });

  const actionChainedEvent =
    actionChainedEventId && gameEventsClient.findGameEvent(actionChainedEventId);

  const onChainedEventModalOpen = () => setIsChainedEventModalOpen(true);
  const onChainedEventModalClose = () => setIsChainedEventModalOpen(false);

  const onChainedEventSelect = (gameEvent: GameEvent) => {
    setValue(chainedEventFieldName, gameEvent.id);
    onChainedEventModalClose();
  };

  const onChainedEventClear = () => setValue(chainedEventFieldName, undefined);

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

      <fieldset>
        <legend>{locale.form.chainedEvent.title}</legend>

        {actionChainedEvent?.title}

        {!actionChainedEventId ? (
          <button type="button" onClick={onChainedEventModalOpen}>
            {locale.form.chainedEvent.select}
          </button>
        ) : (
          <button type="button" onClick={onChainedEventClear}>
            {locale.form.chainedEvent.remove}
          </button>
        )}

        <GameEventSelectModal
          type="single"
          isOpen={isChainedEventModalOpen}
          onSelect={onChainedEventSelect}
          onClose={onChainedEventModalClose}
        />
      </fieldset>

      <Dependencies name={`${name}.dependencies`} />

      <ActionChanges name={`${name}.changes`} />
    </div>
  );
};
