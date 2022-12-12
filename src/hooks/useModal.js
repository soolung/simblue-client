import {useRecoilState} from "recoil";
import {modalState} from "../utils/atom/modal";

const useModal = () => {
    const [modal, setModal] = useRecoilState(modalState);

    const openModal = m => {
        setModal(m);
    };

    const closeModal = () => {
        setModal(null);
    };

    return {
        modal,
        setModal,
        openModal,
        closeModal,
    };
};

export default useModal;
