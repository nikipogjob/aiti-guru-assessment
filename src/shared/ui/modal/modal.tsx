import { useEffect, useRef } from 'react';
import type { ModalProps } from '../../types/modal';
import { createPortal } from 'react-dom';
import styles from './modal.module.scss';

export default function Modal({ children, isOpen, onClose, title }: ModalProps) {
    const dialogRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!isOpen) { return; }
        const onEscKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', onEscKeyDown);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        setTimeout(() => dialogRef.current?.focus(), 0);

        return () => {
            document.removeEventListener('keydown', onEscKeyDown);
            document.body.style.overflow = prevOverflow;
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    return createPortal(
        <div
            className={styles.modal}
            role="presentation"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            <div
                className={styles.modal__dialog}
                role="dialog"
                aria-modal="true"
                aria-label={title ?? 'Диалог'}
                tabIndex={-1}
                ref={dialogRef}
            >
                <button
                    className={styles.modal__close}
                    type={'button'}
                    aria-label="Закрыть"
                    onClick={onClose}
                >
                    x
                </button>

                {title &&
                    <h2 className={styles.modal__title}>
                        {title}
                    </h2>}
                <div className={styles.modal__content}>
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
}