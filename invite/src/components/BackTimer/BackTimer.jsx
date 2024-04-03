import { useState, useEffect } from "react";

export const BackTimer = ({ date }) => {

  const [finishTime] = useState(date.getTime());
  const [[diffDays, diffH, diffM, diffS], setDiff] = useState([0, 0, 0, 0]);
  const [tick, setTick] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);
  const [timerId, setTimerID] = useState(0);

  useEffect(() => {
    const diff = (finishTime - new Date()) / 1000;
    if (diff < 0) {
      setIsTimeout(true);
      return;
    }
    setDiff([
      Math.floor(diff / 86400),
      Math.floor((diff / 3600) % 24),
      Math.floor((diff / 60) % 60),
      Math.floor(diff % 60)
    ]);
  }, [tick, finishTime]);

  useEffect(() => {
    if (isTimeout) clearInterval(timerId);
  }, [isTimeout, timerId]);

  useEffect(() => {
    const timerID = setInterval(() => {
      setTick(!tick);
    }, 1000);
    setTimerID(timerID);
    return () => clearInterval(timerID);
  }, [tick]);

  return (
    <div className="in_back_timer">
      {<>
      <div className="in_bt_item"><span className="in_bt_val">{diffDays}</span><span className="in_bt_sign">днів</span></div>
      <div className="in_bt_item"><span className="in_bt_val">{diffH.toString().padStart(2, "0")}</span><span className="in_bt_sign">годин</span></div>
      <div className="in_bt_item"><span className="in_bt_val">{diffM.toString().padStart(2, "0")}</span><span className="in_bt_sign">хвилин</span></div>
      <div className="in_bt_item"><span className="in_bt_val">{diffS.toString().padStart(2, "0")}</span><span className="in_bt_sign">секунд</span></div>
      </>
      }
    </div>
  );
};