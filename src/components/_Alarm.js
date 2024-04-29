import moment from 'moment'
import React, { useState,useEffect } from 'react'

function _Alarm(props) {


  const waktu = new moment(props.waktu || '00:00','HH:mm').format('HH:mm')
  const [time, setTime] = useState(moment());
  const [notificationShown, setNotificationShown] = useState(false);
  const [alrm,setAlarm] = useState(5)
    useEffect(() => {
      const timerID = setInterval(() => tick(), 1000);
      
      return () => {
        clearInterval(timerID);
      };
    }, []);
  
    function tick() {
      setTime(new moment());
    }
  
    function formatTime(date) {
      return date.format('HH:mm:ss');
    }

    useEffect(() => {
        const targetTime = moment(props.waktu, 'HH:mm');
        const currentTime = moment();
    
        const differenceMinutes = targetTime.diff(currentTime, 'minutes');
      
        if (differenceMinutes === alrm && !notificationShown) {
          
            setNotificationShown(true);
            showNotification()
          }
        }, [time]);
     

        function showNotification() {
            if (Notification.permission === "granted") {
              const notification = new Notification("Waktu sudah hampir habis!");
              notification.onclick = () => {
                showNotification(false)
                notification.close();
              };
            } else if (Notification.permission !== "denied") {
              Notification.requestPermission().then(function (permission) {
                if (permission === "granted") {
                  const notification = new Notification("Waktu sudah hampir habis!");
                  notification.onclick = () => {
                    showNotification(false)
                    notification.close();
                  };
                }
              });
            }
          }
  return (
    <div>
       <div>
        <h3>{new moment().format('LL')}</h3>
        <h5>Jam: {formatTime(time)}</h5>
        <p>{waktu}</p>
        <input type='number' defaultValue={alrm} min={5} max={60} onChange={(e)=>{setAlarm(e.target.value)}}></input>
       </div>
    </div>
  
  )
}

export default _Alarm