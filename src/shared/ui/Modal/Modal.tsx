import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { PORTAL_ID } from '@shared/config';

import { header, modalContainer, modalContent } from './Modal.css';

export type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

export const Modal: FC<ModalProps> = ({ children, isOpen, onClose, title }) => {
  const modalNode = (
    <dialog open={isOpen} aria-modal="true" className={modalContainer}>
      <div className={modalContent}>
        <div className={header}>
          <h2>{title}</h2>

          <button type="button" onClick={onClose}>
            X
          </button>
        </div>

        <div>{children}</div>
      </div>
    </dialog>
  );

  if (!isOpen) return null;

  return createPortal(modalNode, document.getElementById(PORTAL_ID)!);
};
