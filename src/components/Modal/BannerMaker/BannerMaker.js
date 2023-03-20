import Modal from "react-modal";
import useModal from "../../../hooks/useModal";
import "./BannerMaker.scss";
import { TbUpload } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import { useRef, useState } from "react";

const BannerMaker = ({ title }) => {
  const { closeModal } = useModal();

  const onClick = () => {
    closeModal();
  };

  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();

  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
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
              <form className="form-signup">
                <label className="signup-profileImg-label" htmlFor="profileImg">
                  <TbUpload />
                </label>
                <input
                  className="signup-profileImg-input"
                  type="file"
                  accept="image/*"
                  id="profileImg"
                  onChange={saveImgFile}
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
              />
            </div>
          </div>
        </div>
        <div className="bmaker-modal-wrap-buttonbox">
          <button className="bmaker-modal-wrap-change" onClick={onClick}>
            등록하기
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default BannerMaker;
