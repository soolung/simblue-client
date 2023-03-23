import Modal from "react-modal";
import useModal from "../../../hooks/useModal";
import "./ManageBannerModal.scss";
import { TbUpload } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import { useRef, useState } from "react";
import { useMutation } from "react-query";
import { registerBanner } from "../../../utils/api/banner";
import { createBannerImage } from "../../../utils/api/banner";
const Bannerregister = ({ title }) => {
  const { closeModal } = useModal();
  const register = useMutation(registerBanner, {
    onSuccess: () => {
      alert("성공");
      closeModal();
    },
    onError: (err) => {
      console.log(request);
      alert("error");
    },
  });

  const [request, setRequest] = useState({
    endDate: "",
    imageUri: "",
    linkTo: "",
  });

  const handleChange = (e) => {
    setRequest({
      ...request,
      [e.target.name]: e.target.value,
    });
  };

  //이미지 미리보기
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();

  const saveImgFile = (e) => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
    setRequest({
      ...request,
      [e.target.name]: e.target.value,
    });
  };

  //이미지 넘기기

  const [files, setFiles] = useState({
    imageUri: "",
  });

  const postimage = useMutation(createBannerImage, {
    onSuccess: () => {
      alert("이미지 전달");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", files.length && files[0].uploadedFile);
    // formData.append("comment", commentValue);
    // formData.append("content_id", classData.content_id);

    setFiles([]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFiles([...files, { uploadedFile: file }]);
  };

  const submit = () => {
    register.mutate({
      request: {
        ...request,
      },
    });
    postimage.mutate({
      files: {
        ...files,
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
              <img src={imgFile ? imgFile : `/images/icon/user.png`} />
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
                  name="photo"
                  accept="image/*,audio/*,video/mp4,video/x-m4v,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,.csv"
                  onChange={handleUpload}
                  ref={imgRef}
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

export default Bannerregister;
