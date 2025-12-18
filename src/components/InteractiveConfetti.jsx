import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InteractiveConfetti = () => {
  const [explosions, setExplosions] = useState([]);

  const createExplosion = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const id = Date.now();

    setExplosions(prev => [...prev, { id, x, y }]);

    setTimeout(() => {
      setExplosions(prev => prev.filter(exp => exp.id !== id));
    }, 2000);
  };

  const colors = ['#FFB7B2', '#B5EAD7', '#FFFFD8', '#E2F0CB', '#ff6b9d', '#c56cf0', '#48dbfb'];

  return (
    <div
      className="interactive-confetti-zone"
      onClick={createExplosion}
    >
      <AnimatePresence>
        {explosions.map(explosion => (
          <div key={explosion.id} className="confetti-explosion">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="confetti-particle"
                initial={{
                  x: explosion.x,
                  y: explosion.y,
                  scale: 1,
                  opacity: 1,
                }}
                animate={{
                  x: explosion.x + (Math.random() - 0.5) * 300,
                  y: explosion.y + (Math.random() - 0.5) * 300,
                  scale: 0,
                  opacity: 0,
                  rotate: Math.random() * 720,
                }}
                transition={{
                  duration: 1.5,
                  ease: 'easeOut',
                }}
                style={{
                  background: colors[Math.floor(Math.random() * colors.length)],
                }}
              />
            ))}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveConfetti;