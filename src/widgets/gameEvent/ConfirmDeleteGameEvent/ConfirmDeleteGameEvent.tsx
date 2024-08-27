import { locale } from '@shared/locale';
import { Modal } from '@shared/ui';
import { FC } from 'react';

export type ConfirmDeleteGameEventProps = {
  isOpen: boolean;
  onSubmit: () => void;
  onAbort: () => void;
};

export const ConfirmDeleteGameEvent: FC<ConfirmDeleteGameEventProps> = ({
  isOpen,
  onAbort,
  onSubmit,
}) => {
  return (
    <Modal title={locale.gameEvents.deleteModal.title} isOpen={isOpen} onClose={onAbort}>
      <button type="button" onClick={onSubmit}>
        {locale.gameEvents.deleteModal.submit}
      </button>

      <button type="button" onClick={onAbort}>
        {locale.gameEvents.deleteModal.abort}
      </button>
    </Modal>
  );
};
