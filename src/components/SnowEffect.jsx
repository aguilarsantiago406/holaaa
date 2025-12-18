import React from 'react';
import { motion } from 'framer-motion';

const SnowEffect = () => {
  return (
    <div className="snow-container">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="snowflake"
          initial={{
            x: Math.random() * window.innerWidth,
            y: -20,
            opacity: Math.random() * 0.7 + 0.3,
          }}
          animate={{
            y: window.innerHeight + 20,
            x: Math.random() * window.innerWidth,
            rotate: 360,
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'linear',
          }}
        >
          ❄️
        </motion.div>
      ))}
    </div>
  );
};

export default SnowEffect;