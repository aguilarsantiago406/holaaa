import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="scroll-progress-container">
      <motion.div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1 }}
      />
      <motion.div
        className="scroll-flower"
        style={{ left: `${scrollProgress}%` }}
        animate={{
          rotate: scrollProgress * 3.6,
        }}
        transition={{ duration: 0.1 }}
      >
        🌸
      </motion.div>
    </div>
  );
};

export default ScrollProgress;