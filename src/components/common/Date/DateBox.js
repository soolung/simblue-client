import "./Date.scss";
import TextBox from "../TextBox/TextBox";
import { useEffect, useState } from "react";

export default function DateBox({
  className,
  isAlways,
  handleDate,
  stateInitialize,
}) {
  const [date, setDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  });

  useEffect(() => {
    if (stateInitialize != undefined) {
      const SaveDate = (stateInitialize || "").split("-");
      setDate({
        year: SaveDate[0],
        month: SaveDate[1],
        day: SaveDate[2],
      });
    }
  }, [stateInitialize]);
  const handleDateInput = (e) => {
    setDate({ ...date, [e.target.name]: e.target.value });
  };

  const handleDateManually = (name, value) => {
    setDate({ ...date, [name]: value });
  };

  useEffect(() => {
    if (
      date.day != undefined &&
      date.month != undefined &&
      date.year != undefined
    ) {
      handleDate(
        date.year +
          "-" +
          date.month.toString().padStart(2, "0") +
          "-" +
          date.day.toString().padStart(2, "0")
      );
    }
  }, [date]);

  const yearKeyEvent = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      handleDateManually(e.target.name, +e.target.value - 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      handleDateManually(e.target.name, +e.target.value + 1);
    }
  };

  const monthKeyEvent = (e) => {
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
  };

  const dayKeyEvent = (e) => {
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
        onKeyDown={yearKeyEvent}
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
        onKeyDown={monthKeyEvent}
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
        onKeyDown={dayKeyEvent}
      />
      일
    </div>
  );
}
