import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const TwentyOneThings = ({ things }) => {
  const [expandedItems, setExpandedItems] = useState({});
  const [revealedCount, setRevealedCount] = useState(3);

  const toggleItem = (index) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const revealMore = () => {
    setRevealedCount(prev => Math.min(prev + 3, things.length));
  };

  return (
    <div className="twenty-one-container">
      <h2 className="twenty-one-title">네가 나에게 특별한 21가지 이유 💝</h2>
      <p className="twenty-one-subtitle-korean">21 Motivos Por Lo Cual Eres Especial Para Mí</p>
      <p className="twenty-one-subtitle">Haz click para descubrir cada uno</p>

      <div className="twenty-one-grid">
        {things.slice(0, revealedCount).map((thing, index) => (
          <motion.div
            key={index}
            className="twenty-one-item glass-morphism"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => toggleItem(index)}
          >
            <div className="item-header">
              <span className="item-number">{index + 1}</span>
              <div className="item-titles">
                <h3 className="item-title-kr">{thing.titleKr}</h3>
                <span className="item-title-es">{thing.title}</span>
              </div>
              <motion.div
                animate={{ rotate: expandedItems[index] ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </div>

            <AnimatePresence>
              {expandedItems[index] && (
                <motion.div
                  className="item-content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="description-kr">{thing.descriptionKr}</p>
                  <p className="description-es">{thing.description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {revealedCount < things.length && (
        <motion.button
          className="reveal-more-button glass-morphism"
          onClick={revealMore}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="reveal-btn-kr">더 보기 ✨ ({things.length - revealedCount}개 남음)</span>
          <span className="reveal-btn-es">Revelar más ({things.length - revealedCount} restantes)</span>
        </motion.button>
      )}
    </div>
  );
};

export default TwentyOneThings;