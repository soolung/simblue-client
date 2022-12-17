import "./EmojiModal.scss";
import {useQuery} from "react-query";
import {getAllEmoji} from "../../../utils/api/emoji";

export default function EmojiModal({isOpen, close, chooseEmoji}) {
    const {data} = useQuery('getAllEmoji', getAllEmoji, {})

    return (
        <div className={`emoji-modal ${isOpen ? "show" : ""}`}>
            {
                data?.emojiList?.map((e, index) => (
                    <span
                        key={index}
                        onClick={() => {
                            chooseEmoji(e.emoji);
                            close();
                        }}
                    >
                        {e.emoji}
                    </span>
                ))
            }
        </div>
    )
}
