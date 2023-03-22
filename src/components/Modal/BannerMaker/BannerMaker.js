import Modal from "react-modal";
import useModal from "../../../hooks/useModal";
import "./BannerMaker.scss";
import { TbUpload } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import { useRef, useState } from "react";
import { useMutation } from "react-query";
import { createBanner } from "../../../utils/api/banner";

const BannerMaker = ({ title }) => {
  const { closeModal } = useModal();

  const create = useMutation(createBanner, {
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
  

  const submit = () => {
    create.mutate({
      request: {
        ...request,
      },
    });
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      className="modal bmaker-modal"
      overlayClassName="modal-overlay"
    >
      <div className="bmaker-modal-wrap">
        <div className="bmaker-modal-wrap-textbox">
          <div className="bmaker-modal-header">
            <p className="bmaker-text-title">{title}</p>
            <p onClick={closeModal} className="maker-modal-close">
              <IoMdClose />
            </p>
          </div>
          <div className="bmaker-text-image">
            <div className="bamker-text-image-annae">
              <p>
                <a>배너 이미지</a>
                <a className="bannker-maker-star">*</a>
              </p>
              <p className="banner-maker-explan">
                *배너 사이즈는 (1400 x 450)px
              </p>
            </div>
            <div className="bmaker-image-space">
              <img src={imgFile ? imgFile : `/images/icon/user.png`} />
              <form
                className="form-banner"
                name="photo"
                encType="multipart/form-data"
                // onSubmit={handleSubmit}
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
                  // onChange={handleUpload}
                  ref={imgRef}
                />
              </form>
            </div>
          </div>
          <div className="banner-maker-endday">
            <div className="banner-maker-endday-text">
              <p>
                <a>마감일</a>
                <a className="bannker-maker-star">*</a>
              </p>
              <p className="banner-maker-explan">
                해당 날짜가 지나면 자동으로 내려갑니다.
              </p>
            </div>
            <div className="banner-maker-endday-input">
              <input
                type="text"
                className="banner-maker-input"
                placeholder="yyyy-mm-dd"
                onChange={handleChange}
                name="endDate"
                value={request?.endDate}
              />
            </div>
          </div>
          <div className="banner-maker-link">
            <div className="banner-maker-link-text">
              <p>링크</p>
              <p className="banner-maker-explan">
                배너 클릭시 입력한 링크로 이동됩니다.
              </p>
            </div>
            <div className="banner-maker-link-input">
              <input
                type="text"
                className="banner-maker-input"
                placeholder="https://example.com"
                onChange={handleChange}
                name="linkTo"
                value={request?.linkTo}
              />
            </div>
          </div>
        </div>
        <div className="bmaker-modal-wrap-buttonbox">
          <button className="bmaker-modal-wrap-change" onClick={submit}>
            등록하기
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default BannerMaker;
