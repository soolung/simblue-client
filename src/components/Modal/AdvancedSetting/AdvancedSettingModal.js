import "./AdvancedSettingModal.scss";
import Modal from "react-modal";
import Field from "./Field/Field";
import Button from "../../Button/Button";
import { useMutation, useQueryClient } from "react-query";
import { deleteApplicationForm } from "../../../utils/api/application";
import { useNavigate } from "react-router-dom";
import Owner from "./Owner/Owner";
import { useRecoilValue } from "recoil";
import { userState } from "../../../utils/atom/user";
import ResultSearch from "./ResultSearch/ResultSearch";

export default function AdvancedSettingModal({
  isOpen,
  closeModal,
  data,
  id,
  mode,
  ownerList,
  addOwner,
  deleteOwner,
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = useRecoilValue(userState);

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
      <div className="left">
        <p className="title">
          <span className="emoji">⚙️</span> 고급 설정
        </p>
        <div className="setting-content">
          <div>
            {data.map((f, index) => (
              <Field name={f.name} setting={f.setting} key={index} />
            ))}
          </div>
          {mode === "update" && (
            <Button
              text="삭제하기"
              className="application-delete-button"
              onClick={deleteConfirm}
            />
          )}
        </div>
      </div>
      <div className="right">
        <p className="sub-title">담당 선생님 지정</p>
        <ResultSearch className="search-owner" onResultClick={addOwner} />
        <div className="owner-list">
          <Owner
            name={user.name}
            onDelete={() => alert("본인은 지울 수 없습니다.")}
            key={user.roleId}
          />
          {ownerList.map((o) => (
            <Owner
              name={o.name}
              onDelete={() => deleteOwner(o.teacherId)}
              key={o.teacherId}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
}
