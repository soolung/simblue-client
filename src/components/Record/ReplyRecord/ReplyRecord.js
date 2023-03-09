import "./ReplyRecord.scss";
import { FaTrash } from "react-icons/fa";
import { cancelReply } from "../../../utils/api/reply";
import { useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import ConfirmModal from "../../Modal/ConfirmModal/ConfirmModal";
import useModal from "../../../hooks/useModal";
export default function ReplyRecord({
  emoji,
  title,
  repliedAt,
  status,
  replyId,
}) {
  const queryClient = useQueryClient();
  const { openModal } = useModal();
  const { mutate } = useMutation(cancelReply, {
    onSuccess: () => {
      queryClient.invalidateQueries("getMyApplications");
    },
  });

  return (
    <>
      <div className="reply-record">
        <Link className="reply-record-reply" to={`/reply/${replyId}/update`}>
          <div className="reply-record-a">
            <div className="reply-record-left">
              <div className="reply-record-application">
                <span className="reply-record-emoji emoji">{emoji}</span>
                <span className="reply-record-title">{title}</span>
              </div>
              <p className="reply-record-left-replied-at">
                {repliedAt} 에 신청함
              </p>
            </div>
            <div className="reply-record-a-right">
              {status === "IN_PROGRESS" || status === "ALWAYS" ? (
                <p className="reply-record-ing">진행중</p>
              ) : (
                <p className="reply-record-done">마감</p>
              )}
              <div className="reply-record-right-delete">
                <FaTrash
                  onClick={(e) => {
                    e.preventDefault();
                    openModal(
                      <ConfirmModal
                        title="신청 취소"
                        description="정말로 신청을 취소하시겠습니까?"
                        onConfirm={() => mutate(replyId)}
                      />
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
