import { ModalVariant } from '@/types/guest-page-types';
import { forwardRef } from 'react';

interface ModalContentContainerProps {
  children: React.ReactNode;
  variant?: ModalVariant;
}

const ModalContentContainer = forwardRef<
  HTMLDivElement,
  ModalContentContainerProps
>(({ children, variant }, ref) => (
  <div
    ref={ref}
    className={`modal-content-container${
      variant === ModalVariant.INFO ? ' modal-content-container--info' : ''
    }`}
    tabIndex={-1}>
    {children}
  </div>
));

ModalContentContainer.displayName = 'ModalContentContainer';

export default ModalContentContainer;
