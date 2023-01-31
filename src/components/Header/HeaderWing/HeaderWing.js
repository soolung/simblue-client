import "./HeaderWing.scss";
import Modal from "react-modal";

export default function HeaderWing({isOpen, closeModal}) {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}
           className="modal header-wing"
           overlayClassName="modal-overlay"
    >
    </Modal>
  )
}
