import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CursorEffect = () => {
  const [trails, setTrails] = useState([]);
  const [isEnabled, setIsEnabled] = useState(true);
  const lastTime = useRef(0);

  useEffect(() => {
    if (!isEnabled) return;

    const handleMouseMove = (e) => {
      // Throttle: solo crear partícula cada 150ms
      const now = Date.now();
      if (now - lastTime.current < 150) return;
      lastTime.current = now;

      // Limitar a máximo 5 partículas activas
      if (trails.length >= 5) return;

      const newTrail = {
        id: now,
        x: e.clientX,
        y: e.clientY,
        emoji: ['✨', '💖', '🌸'][Math.floor(Math.random() * 3)]
      };

      setTrails(prev => [...prev.slice(-4), newTrail]);

      setTimeout(() => {
        setTrails(prev => prev.filter(t => t.id !== newTrail.id));
      }, 800);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isEnabled, trails.length]);

  return (
    <>
      <AnimatePresence>
        {trails.map(trail => (
          <motion.div
            key={trail.id}
            className="cursor-trail"
            initial={{
              x: trail.x - 10,
              y: trail.y - 10,
              scale: 1,
              opacity: 0.8
            }}
            animate={{
              y: trail.y - 30,
              scale: 0,
              opacity: 0
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {trail.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      <button
        className="cursor-toggle glass-morphism"
        onClick={() => setIsEnabled(!isEnabled)}
        title={isEnabled ? 'Desactivar efectos de cursor' : 'Activar efectos de cursor'}
      >
        {isEnabled ? '✨' : '🚫'}
      </button>
    </>
  );
};

export default CursorEffect;