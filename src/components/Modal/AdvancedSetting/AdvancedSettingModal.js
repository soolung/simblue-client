import "./AdvancedSettingModal.scss";
import Modal from "react-modal";
import Field from "./Field/Field";
import Button from "../../Button/Button";
import { useMutation, useQueryClient } from "react-query";
import { deleteApplicationForm } from "../../../utils/api/application";
import { useNavigate } from "react-router-dom";

export default function AdvancedSettingModal({
  isOpen,
  closeModal,
  data,
  request,
  id,
  mode,
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteConfirm = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteApplication.mutate(id);
    }
  };

  const deleteApplication = useMutation(deleteApplicationForm, {
    onSuccess: () => {
      alert("삭제 성공!");
      queryClient.invalidateQueries(["getFourLatestApplication"]);
      navigate("/");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="modal advanced-setting-modal"
      overlayClassName="modal-overlay"
    >
      <p className="title">
        <span className="emoji">⚙️</span> 고급 설정
      </p>

      <div className="setting-content">
        {data.map((f, index) => (
          <Field name={f.name} setting={f.setting} key={index} />
        ))}
        {mode === "update" && (
          <Button
            text="삭제하기"
            className="application-delete-button"
            action={deleteConfirm}
          />
        )}
      </div>
    </Modal>
  );
}
