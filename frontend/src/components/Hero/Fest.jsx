import React, { useState, useEffect } from 'react';
import './Fest.css';

// Rolling sale: each cycle lasts a random 2-10 days, then automatically restarts.
const SALE_KEY = 'ds_sale_end_v2';
const DAY_MS = 24 * 60 * 60 * 1000;
const MIN_DAYS = 2;
const MAX_DAYS = 10;

const randomDuration = () =>
  (MIN_DAYS + Math.floor(Math.random() * (MAX_DAYS - MIN_DAYS + 1))) * DAY_MS;

const getEndDate = () => {
  const now = Date.now();
  let end = parseInt(localStorage.getItem(SALE_KEY), 10);
  if (!end || Number.isNaN(end) || end <= now) {
    end = now + randomDuration();
    localStorage.setItem(SALE_KEY, String(end));
  }
  return end;
};

const pad = (n) => String(n).padStart(2, '0');

const calculateTimeLeft = () => {
  const distance = getEndDate() - Date.now();
  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  };
};

const Fest = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fest">
      <div className="fest-banner">
        <div className="fest-content">
          <p>Exclusive Offers, Limited Time Only!</p>
          <div className="countdown-timer">
            <span>{timeLeft.days} Days</span> :
            <span>{pad(timeLeft.hours)} Hrs</span> :
            <span>{pad(timeLeft.minutes)} Mins</span> :
            <span>{pad(timeLeft.seconds)} Secs</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fest;
