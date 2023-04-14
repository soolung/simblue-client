import Modal from "react-modal";
import useModal from "../../../hooks/useModal";
import { IoMdClose } from "react-icons/io";
import "./GroupModal.scss";

const GroupModal = ({ title }) => {
  const { closeModal } = useModal();
  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      className="modal group-modal"
      overlayClassName="modal-overlay"
    >
      <div className="group-modal-wrap">
        <div className="group-modal-wrap-textbox">
          <div className="group-modal-header">
            <p className="group-text-title">{title}</p>
            <p onClick={closeModal} className="register-modal-close">
              <IoMdClose />
            </p>
          </div>
          <div className="group-text-name">
            <p>이름</p>
            <div className="group-text-name-input">
              <input
                type="text"
                className="group-name-input"
                placeholder="20글자 이내"
              />
            </div>
          </div>
          <div className="group-text-type">
            <p>유형</p>
            <div className="group-text-type-select">
              <select>
                <option>학년</option>
                <option>학반</option>
                <option>학과</option>
                <option>기타</option>
              </select>
            </div>
          </div>
          <div className="group-modal-wrap-buttonbox">
            <button className="group-modal-wrap-change">추가하기</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default GroupModal;
