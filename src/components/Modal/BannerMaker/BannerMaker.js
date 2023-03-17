import Modal from "react-modal";
import useModal from "../../../hooks/useModal";
import "./BannerMaker.scss";

const BannerMaker = ({ title }) => {
  const { closeModal } = useModal();

  const onClick = () => {
    closeModal();
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      className="modal confirm-modal"
      overlayClassName="modal-overlay"
    >
      <div className="confirm-modal-wrap">
        <div className="confirm-modal-wrap-textbox">
          <p className="confirm-text-title">{title}</p>
          <div className="confirm-text-image">
          
          </div>
        </div>
        <div className="confirm-modal-wrap-buttonbox">
          <div className="confirm-modal-wrap-box">
            <button className="confirm-modal-wrap-cancel" onClick={closeModal}>
              취소
            </button>
            <button className="confirm-modal-wrap-change" onClick={onClick}>
              확인
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BannerMaker;
