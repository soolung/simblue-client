import "./ConfirmModal.scss";

const Modal = ({ title, description }) => {
  return (
    <div className="confirm-modal">
      <div className="confirm-modal-confirm">
        <div className="confirm-modal-wrap">
          <div className="confirm-modal-wrap-textbox">
            <p className="confirm-text-title">{title}</p>
            <p className="confirm-text-content">{description}</p>
          </div>
          <div className="confirm-modal-wrap-buttonbox">
            <div className="confirm-modal-wrap-box">
              <div className="confirm-modal-wrap-cancel">취소</div>
              <div className="confirm-modal-wrap-change">확인</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
