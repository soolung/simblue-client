import Modal from "react-modal";
import useModal from "../../../hooks/useModal";
import "./ManageBannerModal.scss";
import { TbUpload } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { useMutation } from "react-query";
import { registerBanner, uploadBannerImage } from "../../../utils/api/banner";

const ManageBannerModal = ({ title }) => {
  const { closeModal } = useModal();
  const [image, setImage] = useState(null);
  const register = useMutation(registerBanner, {
    onSuccess: () => {
      alert("성공");
      closeModal();
    },
    onError: (err) => {
      console.log(request);
      // alert("error");
    },
  });

  const uploadImage = useMutation(uploadBannerImage, {
    onSuccess: (data) => {
      setImage(data.imageUri);
    },
  });

  const [request, setRequest] = useState({
    endDate: "",
    linkTo: "",
  });

  const handleChange = (e) => {
    setRequest({
      ...request,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleUpload = (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    uploadImage.mutate(formData);
  };

  const submit = () => {
    register.mutate({
      request: {
        imageUri: image,
        ...request,
      },
    });
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      className="modal bregister-modal"
      overlayClassName="modal-overlay"
    >
      <div className="bregister-modal-wrap">
        <div className="bregister-modal-wrap-textbox">
          <div className="bregister-modal-header">
            <p className="bregister-text-title">{title}</p>
            <p onClick={closeModal} className="register-modal-close">
              <IoMdClose />
            </p>
          </div>
          <div className="bregister-text-image">
            <div className="bregister-text-image-annae">
              <div className="bregister-text-image-left">
                <p>배너 이미지</p>
                <p className="banner-register-star">*</p>
              </div>
              <p className="banner-register-explan">
                *배너 사이즈는 (1400 x 450)px
              </p>
            </div>
            <div className="bregister-image-space">
              {image && <img src={image} />}
              <form
                className="form-banner"
                name="photo"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
              >
                <label className="banner-profileImg-label" htmlFor="profileImg">
                  <TbUpload />
                </label>
                <input
                  className="banner-profileImg-input"
                  type="file"
                  id="profileImg"
                  name="imageUri"
                  accept="image/*"
                  onChange={handleUpload}
                />
              </form>
            </div>
          </div>
          <div className="banner-register-endday">
            <div className="banner-register-endday-text">
              <div className="banner-register-endday-left">
                <p>마감일</p>
                <p className="banner-register-star">*</p>
              </div>
              <p className="banner-register-explan">
                해당 날짜가 지나면 자동으로 내려갑니다.
              </p>
            </div>
            <div className="banner-register-endday-input">
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
              <p className="banner-register-explan">
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
        <div className="bregister-modal-wrap-buttonbox">
          <button className="bregister-modal-wrap-change" onClick={submit}>
            등록하기
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ManageBannerModal;
