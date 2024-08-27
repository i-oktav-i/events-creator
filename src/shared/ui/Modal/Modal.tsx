import { FC, JSX, ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { PORTAL_ID } from '@shared/config';

import {
  contentContainer,
  footerContainer,
  headerContainer,
  modalContainer,
  modalContent,
} from './Modal.css';

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  adaptive?: boolean;
  title: string;
  footer?: JSX.Element;
  children: ReactNode;
};

export const Modal: FC<ModalProps> = ({ children, isOpen, onClose, title, footer, adaptive }) => {
  const modalNode = (
    <dialog open={isOpen} aria-modal="true" className={modalContainer({ adaptive })}>
      <div className={modalContent({ adaptive })}>
        <div className={headerContainer}>
          <h2>{title}</h2>

          <button type="button" onClick={onClose}>
            X
          </button>
        </div>

        <div className={contentContainer}>{children}</div>

        <div className={footerContainer}>{footer}</div>
      </div>
    </dialog>
  );

  if (!isOpen) return null;

  return createPortal(modalNode, document.getElementById(PORTAL_ID)!);
};
