import { useRecoilValue } from "recoil";
import {modalState} from "../../../utils/atom/modal";

const ModalProvider = () => {
    const modal = useRecoilValue(modalState);

    const provide = () => {
        if (!modal) return;

        return modal;
    };

    return <>{provide()}</>;
};

export default ModalProvider;
