import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingBalloons = () => {
  const [balloons, setBalloons] = useState([
    { id: 1, color: '🎈', x: 10, delay: 0 },
    { id: 2, color: '🎈', x: 30, delay: 0.5 },
    { id: 3, color: '🎈', x: 50, delay: 1 },
    { id: 4, color: '🎈', x: 70, delay: 1.5 },
    { id: 5, color: '🎈', x: 90, delay: 2 },
  ]);

  const popBalloon = (id) => {
    setBalloons(prev => prev.filter(b => b.id !== id));
    
    // Respawn después de 3 segundos
    setTimeout(() => {
      const poppedBalloon = balloons.find(b => b.id === id);
      if (poppedBalloon) {
        setBalloons(prev => [...prev, poppedBalloon]);
      }
    }, 3000);
  };

  return (
    <div className="floating-balloons-container">
      <AnimatePresence>
        {balloons.map((balloon) => (
          <motion.div
            key={balloon.id}
            className="balloon"
            initial={{ 
              x: `${balloon.x}%`, 
              y: '100%', 
              rotate: 0 
            }}
            animate={{
              y: ['-10%', '-5%', '-10%'],
              x: [`${balloon.x}%`, `${balloon.x + 5}%`, `${balloon.x}%`],
              rotate: [-5, 5, -5]
            }}
            exit={{
              scale: 0,
              opacity: 0,
              transition: { duration: 0.3 }
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: balloon.delay,
              ease: 'easeInOut'
            }}
            onClick={() => popBalloon(balloon.id)}
            whileHover={{ scale: 1.2 }}
          >
            {balloon.color}
            <motion.div
              className="balloon-string"
              initial={{ height: 0 }}
              animate={{ height: '60px' }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FloatingBalloons;