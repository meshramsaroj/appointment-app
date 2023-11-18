import { useState } from "react";
import { ViewLess, ViewMore } from "./Button";

const TimeSlotes = ({ data, setBookOppointment }) => {
  const total = Object.keys(data).length;
  const [offset, setOffset] = useState(12);
  const [start, setStart] = useState(0);

  function handleMoreData() {
    setStart(0);
    setOffset(Object.keys(data).length);
  }

  const renderTime = (time) => {
    let mode = time.split(":")[0] > 12 ? "PM" : "AM";
    let arr = time.split(":");
    let hour = arr[0] > 12 ? arr[0] % 12 : arr[0];
    let formatted = `${hour}:${arr[1]} ${mode}`;
    return formatted;
  };

  function handleLess() {
    setStart(0);
    setOffset(10);
  }
  return (
    <div className="container">
      <h2>
        <span>Select Time Slote</span>
        <span className="availabilityStyle">
          {data.length} Slotes available
        </span>
      </h2>
      <div className="timeBox">
        {data.slice(start, offset).map((item, index) =>
          offset > 12 && index === 11 ? (
            <ViewMore key={item.id} handleMoreData={handleMoreData} />
          ) : (
              <button
                className={`btn`}
                key={item.id}
                onClick={() => setBookOppointment(item)}
              >
                {renderTime(item.time)}
              </button>
          )
        )}
        {total === offset && offset > 10 && (
          <ViewLess handleLess={handleLess} />
        )}
      </div>
    </div>
  );
};

export default TimeSlotes;
