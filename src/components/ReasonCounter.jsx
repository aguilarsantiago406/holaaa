import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ReasonCounter = ({ targetNumber, label }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 2000;
    const increment = targetNumber / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetNumber) {
        setCount(targetNumber);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, targetNumber]);

  return (
    <motion.div
      className="reason-counter glass-morphism"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      onViewportEnter={() => setIsVisible(true)}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className="counter-number"
        key={count}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.3 }}
      >
        {count}+
      </motion.div>
      <div className="counter-label">{label}</div>
    </motion.div>
  );
};

export default ReasonCounter;