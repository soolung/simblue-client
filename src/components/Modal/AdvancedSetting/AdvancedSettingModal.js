import "./AdvancedSettingModal.scss";
import Modal from "react-modal";
import Field from './Field/Field';


export default function AdvancedSettingModal({ isOpen, closeModal, data, request }) {

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}
           className="modal advanced-setting-modal"
           overlayClassName="modal-overlay"
    >
      <p className="title">
        <span className="emoji">⚙️</span> 고급 설정
      </p>

      <div className="setting-content">
        {
          data.map((f, index) => (
            <Field
              name={f.name}
              setting={f.setting}
              key={index}
            />
          ))
        }
      </div>
    </Modal>
  )
}
