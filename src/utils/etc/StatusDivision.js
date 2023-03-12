import { dDay } from "./DateTimeFormatter"
export const statusCheck = (status,endDate) => {

    return(status === "ALWAYS" ? (
        <span>상시</span>
      ) : status === "NOT_STARTED" ? (
        <span>시작 전</span>
      ) : status === "IN_PROGRESS" ? (
        <span>{dDay(endDate)}일 남음</span>
      ) : (
        <span>완료됨</span>
      ))
}