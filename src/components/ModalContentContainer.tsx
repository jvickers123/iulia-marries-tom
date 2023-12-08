import { ModalVariant } from '@/types/rsvp-types';

const ModalContentContainer = ({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant?: ModalVariant;
}) => (
  <div
    className={`modal-content-container${
      variant === ModalVariant.INFO ? ' modal-content-container--info' : ''
    }`}>
    {children}
  </div>
);

export default ModalContentContainer;
