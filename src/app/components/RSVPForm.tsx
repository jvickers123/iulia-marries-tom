import Modal from './modal';

const RSVPForm = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <Modal closeModal={closeModal}>
      <form>
        <input type="email" name="email" placeholder="Email" />
        <input type="text-area" name="notes" placeholder="Notes" />
        <input type="submit" value="RSVP" />
      </form>
    </Modal>
  );
};

export default RSVPForm;
