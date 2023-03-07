import "./ReplyRecord.scss";
import { FaTrash } from "react-icons/fa";
import { cancelReply } from "../../../utils/api/reply";
import { useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function ReplyRecord({
  emoji,
  title,
  repliedAt,
  status,
  replyId,
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(cancelReply, {
    onSuccess: () => {
      queryClient.invalidateQueries("getMyApplications");
    },
  });

  const onClick = () => {
    mutate(replyId);
  };

  return (
    <>
      <div className="reply-record">
          <div className="reply-record-a"
          onClick={()=> navigate(`/reply/${replyId}/update`)}>
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
              <div className="reply-record-right-delete" onClick={onClick}>
                <FaTrash />
              </div>
            </div>
          </div>
      </div>
    </>
  );
}
