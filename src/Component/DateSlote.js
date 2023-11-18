import { useState } from "react";
import { ViewLess, ViewMore } from "./Button";

const DateSlotes = ({ data, setTimeSlotes }) => {
  const [active, setActive] = useState(0);
  const total = Object.keys(data).length;

  const [offset, setOffset] = useState(10);
  const [start, setStart] = useState(0);

  function handleMoreData() {
    setStart(0);
    setOffset(Object.keys(data).length);
  }

  function handleLess() {
    setStart(0);
    setOffset(10);
  }

  function formatDate(date) {
    let formattedDate = date
      .toUTCString()
      .split(" ")
      .filter((i) => i !== "")
      .slice(0, 3);

    return `${formattedDate[0]} ${formattedDate[2]} ${formattedDate[1]}`;
  }

  const renderDate = (date) => {
    let d = new Date();
    let today = formatDate(d);
    let tomorrow = formatDate(new Date(d.setDate(d.getDate() + 1)));
    let formattedDate = formatDate(new Date(date));

    return today === formattedDate
      ? "Today"
      : tomorrow === formattedDate
      ? "Tomorrow"
      : formattedDate;
  };

  const getTimeSlotes = (date, index) => {
    setTimeSlotes(data[date]);
    setActive(index);
  };

  return (
    <div className="container">
      <h2>Select Dates </h2>
      <div className="dateBox">
        {Object.keys(data)
          .slice(start, offset)
          .map((date, index) =>
            offset === 10 && index === 9 ? (
              <ViewMore key={index} handleMoreData={handleMoreData} />
            ) : (
                <button
                  className={`btn ${index === active && "active"}`}
                  key={index}
                  onClick={() => getTimeSlotes(date, index)}
                >
                  {renderDate(date)}
                </button> 
            )
          )}
        {total === offset && <ViewLess  handleLess={handleLess} />}
      </div>
    </div>
  );
};

export default DateSlotes;
