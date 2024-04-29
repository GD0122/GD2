import React, { useState, useEffect } from 'react';
import './digitalClock.css'; // File CSS untuk styling (dapat disesuaikan)
import moment from 'moment';

function DigitalClock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
      const timerID = setInterval(() => tick(), 1000);
  
      return function cleanup() {
        clearInterval(timerID);
      };
    });
  
    const tick = () => {
      setTime(new Date());
    };
  
    const formatTime = (time) => {
      return time < 10 ? `0${time}` : time;
    };
  
    return (
      <div className="digital-clock">
        <div>
            <h4>Tanggal: {new moment().format('LL')}</h4>
        </div>
        <div className="clock">
          <span className="hour">{formatTime(time.getHours())}</span>: 
          <span className="minute">{formatTime(time.getMinutes())}</span>: 
          <span className="second">{formatTime(time.getSeconds())}</span>
        </div>
      </div>
    );
}

export default DigitalClock