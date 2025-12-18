import React from 'react';
import { motion } from 'framer-motion';

const FloatingPetals = () => {
  const petals = ['🌸', '🌺', '🌼', '🏵️', '💮'];

  return (
    <div className="floating-petals-container">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="floating-petal"
          initial={{
            x: Math.random() * window.innerWidth,
            y: -50,
            rotate: 0,
            opacity: 0.7,
          }}
          animate={{
            y: window.innerHeight + 50,
            x: Math.random() * window.innerWidth,
            rotate: 360,
            opacity: [0.7, 1, 0.7, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'linear',
          }}
        >
          {petals[Math.floor(Math.random() * petals.length)]}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingPetals;