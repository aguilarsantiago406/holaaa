import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WishesCloud = ({ wishes }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (wishes.length === 0) return;

    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % wishes.length);
        setIsVisible(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, [wishes.length]);

  if (!wishes || wishes.length === 0) return null;

  return (
    <div className="wishes-cloud-container">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            transition={{ duration: 0.6 }}
            className="wish-bubble glass-morphism"
          >
            <div className="wish-icon">{wishes[currentIndex].icon}</div>
            <p className="wish-text-kr">{wishes[currentIndex].textKr}</p>
            <p className="wish-text-es">{wishes[currentIndex].text}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="wish-dots">
        {wishes.map((_, index) => (
          <motion.div
            key={index}
            className={`wish-dot ${index === currentIndex ? 'active' : ''}`}
            animate={{
              scale: index === currentIndex ? 1.3 : 1,
              opacity: index === currentIndex ? 1 : 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default WishesCloud;