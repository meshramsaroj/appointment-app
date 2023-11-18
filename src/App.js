import axios from "axios";
import { useEffect, useState } from "react";
import DateSlotes from "./Component/DateSlote";
import TimeSlotes from "./Component/TimeSlote";
import "./App.css";


const App = () => {
  const [data, setData] = useState([]);
  const [timeSlots, setTimeSlotes] = useState([]);
  const [bookOppointment, setBookOppointment] = useState(null);

  function fetchData() {
    axios
      .post(
        "https://aartas-qaapp-as.azurewebsites.net/aartas_uat/public/api/doctor",
        {
          doctor_id: 2
        }
      )
      .then((res) => {
        if (res?.data?.data[0]) {
          let obj = {};
          res?.data?.data[0]?.timeslots.forEach((item) => {
            if (obj.hasOwnProperty(item.date)) {
              obj[item.date].push({
                id: item.id,
                time: item.time_from
              });
            } else {
              obj[item.date] = [
                {
                  id: item.id,
                  time: item.time_from,
                  data: item.date
                }
              ];
            }
          });
          setData(obj);
          let time = Object.keys(obj)[0];
          setTimeSlotes(obj[time]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <DateSlotes data={data} setTimeSlotes={setTimeSlotes} />
      {timeSlots.length > 0 && (
        <TimeSlotes data={timeSlots} setBookOppointment={setBookOppointment} />
      )}
    </div>
  );
};

export default App;
