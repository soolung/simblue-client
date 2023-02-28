import "./Date.scss";
import TextBox from "../TextBox/TextBox";
import { useEffect, useState } from "react";

export default function DateBox({
  className,
  isAlways,
  handleDate,
  savedDate,
}) {
  const [date, setDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  });

  useEffect(() => {
    const splittedDate = (savedDate || "").split("-");
    setDate({
      year: splittedDate[0],
      month: splittedDate[1],
      day: splittedDate[2],
    });
  }, [savedDate]);

  const handleDateInput = (e) => {
    setDate({ ...date, [e.target.name]: e.target.value });
  };

  const handleDateManually = (name, value) => {
    setDate({ ...date, [name]: value });
  };

  const keyEvent = (e) => {
    switch (e.target.name) {
      case "year":
        if (e.key === "ArrowDown") {
          e.preventDefault();
          handleDateManually(e.target.name, +e.target.value - 1);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          handleDateManually(e.target.name, +e.target.value + 1);
        }
        break;
      case "month":
        if (e.key === "ArrowDown") {
          e.preventDefault();
          handleDateManually(
            e.target.name,
            e.target.value > 1 ? +e.target.value - 1 : 12
          );
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          handleDateManually(
            e.target.name,
            e.target.value < 12 ? +e.target.value + 1 : 1
          );
        }
        break;
      case "day":
        if (e.key === "ArrowDown") {
          e.preventDefault();
          handleDateManually(
            e.target.name,
            e.target.value > 1 ? +e.target.value - 1 : 31
          );
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          handleDateManually(
            e.target.name,
            e.target.value < 31 ? +e.target.value + 1 : 1
          );
        }
        break;
      default:
        break;
    }
  };

  const onBlur = () => {
    handleDate(
      date.year +
        "-" +
        date.month.toString().padStart(2, "0") +
        "-" +
        date.day.toString().padStart(2, "0")
    );
  };

  return (
    <div className={`date ${isAlways && "disabled"} ${className}`}>
      <TextBox
        type="text"
        className="year"
        name="year"
        placeholder={2022}
        readOnly={isAlways}
        value={date?.year}
        onChange={handleDateInput}
        onKeyDown={keyEvent}
      />
      년
      <TextBox
        type="text"
        className="month"
        name="month"
        placeholder={2}
        readOnly={isAlways}
        value={date?.month}
        onChange={handleDateInput}
        onKeyDown={keyEvent}
        onBlur={onBlur}
      />
      월
      <TextBox
        type="text"
        className="day"
        name="day"
        placeholder={22}
        readOnly={isAlways}
        value={date?.day}
        onChange={handleDateInput}
        onKeyDown={keyEvent}
        onBlur={onBlur}
      />
      일
    </div>
  );
}
