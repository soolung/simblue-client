import Modal from "react-modal";
import useModal from "../../../hooks/useModal";
import "./ManageBannerModal.scss";
import { TbUpload } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteBanner, registerBanner, updateBanner, uploadBannerImage } from "../../../utils/api/banner";
import Button from '../../Button/Button';

const ManageBannerModal = ({ mode, data }) => {
  const queryClient = useQueryClient();

  const screen = {
    update: {
      title: "수정",
      onSubmit: () => {
        update.mutate({
          id: data.id,
          request: request
        })
      }
    },
    register: {
      title: "등록",
      onSubmit: () => {
        register.mutate({
          request: request
        });
      },
    }
  }
  const { closeModal } = useModal();
  const register = useMutation(registerBanner, {
    onSuccess: () => {
      alert("성공");
      closeModal();
      queryClient.invalidateQueries("getMyBanner");
    },
  });

  const update = useMutation(updateBanner, {
    onSuccess: () => {
      alert("성공");
      closeModal();
      queryClient.invalidateQueries("getMyBanner");
    }
  })

  const uploadImage = useMutation(uploadBannerImage, {
    onSuccess: (data) => {
      setRequest({
        ...request,
        imageUri: data.imageUri
      })
    },
  });

  const _deleteBanner = useMutation(deleteBanner, {
    onSuccess: () => {
      alert("성공");
      closeModal();
      queryClient.invalidateQueries("getMyBanner");
    }
  })

  const [request, setRequest] = useState({
    imageUri: "",
    endDate: "",
    linkTo: "",
  });

  const handleChange = (e) => {
    setRequest({
      ...request,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpload = (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    uploadImage.mutate(formData);
  };

  useEffect(() => {
    if (mode === "update") {
      setRequest({ ...data });
    }
  }, [])

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      className="modal manage-banner-modal"
      overlayClassName="modal-overlay"
    >
      <div className="manage-banner-modal-wrap">
        <div className="manage-banner-modal-wrap-textbox">
          <div className="manage-banner-modal-header">
            <p className="manage-banner-text-title">배너 {screen[mode].title}</p>
            <button onClick={closeModal} className="register-modal-close">
              <IoMdClose />
            </button>
          </div>
          <div className="manage-banner-text-image">
            <div className="manage-banner-text-image-annae">
              <div className="manage-banner-text-image-left">
                <p>배너 이미지</p>
                <p className="red">*</p>
              </div>
              <p className="banner-register-explain">
                *배너 사이즈는 (1400 x 450)px
              </p>
            </div>
            <div className="manage-banner-image-space">
              <label className="banner-profileImg-label" htmlFor="profileImg">
                <div className={`form-banner ${request.imageUri ? '' : 'border'}`}>
                  {request.imageUri ?
                    <img src={request.imageUri} alt={"banner"} />
                    :
                    <TbUpload className="banner-upload-icon" size={50} />
                  }
                </div>
                <input
                  className="banner-profileImg-input"
                  type="file"
                  id="profileImg"
                  name="imageUri"
                  accept="image/*"
                  onChange={handleUpload}
                />
              </label>
            </div>
          </div>
          <div className="banner-register-end-date">
            <div className="banner-register-end-date-text">
              <div className="banner-register-end-date-left">
                <p>마감일</p>
                <p className="red">*</p>
              </div>
              <p className="banner-register-explain">
                해당 날짜가 지나면 자동으로 내려갑니다.
              </p>
            </div>
            <div className="banner-register-end-date-input">
              <input
                type="text"
                className="banner-register-input"
                placeholder="yyyy-mm-dd"
                onChange={handleChange}
                name="endDate"
                value={request?.endDate}
              />
            </div>
          </div>
          <div className="banner-register-link">
            <div className="banner-register-link-text">
              <p>링크</p>
              <p className="banner-register-explain">
                배너 클릭시 입력한 링크로 이동됩니다.
              </p>
            </div>
            <div className="banner-register-link-input">
              <input
                type="text"
                className="banner-register-input"
                placeholder="https://example.com"
                onChange={handleChange}
                name="linkTo"
                value={request?.linkTo}
              />
            </div>
          </div>
        </div>
        <div className={`manage-banner-modal-wrap-buttonbox ${mode}`}>
          {mode === "update" &&
            <Button className="delete-button" text="삭제하기" onClick={() => _deleteBanner.mutate(data.id)} />
          }
          <Button text={`${screen[mode].title}하기`}
                  onClick={screen[mode].onSubmit} />
        </div>
      </div>
    </Modal>
  );
};

export default ManageBannerModal;
