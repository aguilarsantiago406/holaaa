import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const target = new Date(targetDate);
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isPast: false
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeUnit = ({ value, labelKr, labelEs }) => (
    <motion.div
      className="countdown-unit glass-morphism"
      whileHover={{ scale: 1.05 }}
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 2, repeat: Infinity, delay: Math.random() }}
    >
      <motion.div
        className="countdown-value"
        key={value}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {String(value).padStart(2, '0')}
      </motion.div>
      <div className="countdown-label">{labelKr}</div>
      <div className="countdown-label-es">{labelEs}</div>
    </motion.div>
  );

  if (timeLeft.isPast) {
    return (
      <motion.div
        className="countdown-message"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <span className="text-4xl">🎉</span>
        <p className="countdown-past-kr">오늘은 네 특별한 날이야!</p>
        <p className="countdown-past-es">¡Es tu día especial!</p>
      </motion.div>
    );
  }

  return (
    <div className="countdown-container">
      <h3 className="countdown-title">마법의 카운트다운 ✨</h3>
      <p className="countdown-subtitle-es">Cuenta Regresiva Mágica</p>
      <div className="countdown-grid">
        <TimeUnit value={timeLeft.days} labelKr="일" labelEs="Días" />
        <TimeUnit value={timeLeft.hours} labelKr="시간" labelEs="Horas" />
        <TimeUnit value={timeLeft.minutes} labelKr="분" labelEs="Minutos" />
        <TimeUnit value={timeLeft.seconds} labelKr="초" labelEs="Segundos" />
      </div>
    </div>
  );
};

export default CountdownTimer;