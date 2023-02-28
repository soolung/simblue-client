import "./Date.scss";
import TextBox from "../TextBox/TextBox";
import { useEffect, useState } from "react";

export default function DateBox({
                                  className,
                                  isAlways,
                                  handleDate,
                                  initialDate,
                                }) {
  const [date, setDate] = useState({
    year: null,
    month: null,
    day: null,
  });

  useEffect(() => {
    const splittedDate = initialDate.split("-");
    setDate({
      year: splittedDate[0],
      month: splittedDate[1],
      day: splittedDate[2],
    });
  }, [initialDate]);

  const handleDateInput = (e) => {
    setDate({ ...date, [e.target.name]: e.target.value });
  };

  const handleDateManually = (name, value) => {
    setDate({ ...date, [name]: value });
  };

  const dateKeyEvent = (e, n) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      handleDateManually(
        e.target.name,
        e.target.value > 1 ? +e.target.value - 1 : n
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      handleDateManually(
        e.target.name,
        e.target.value < n ? +e.target.value + 1 : 1
      );
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
        onKeyDown={e => dateKeyEvent(e, 2500)}
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
        onKeyDown={e => dateKeyEvent(e, 12)}
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
        onKeyDown={e => dateKeyEvent(e, 31)}
        onBlur={onBlur}
      />
      일
    </div>
  );
}
