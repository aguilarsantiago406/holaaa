import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';

const LightboxGallery = ({ photos }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setSelectedImage(photos[index]);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % photos.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(photos[nextIndex]);
  };

  const goToPrevious = () => {
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(photos[prevIndex]);
  };

  return (
    <>
      <div className="lightbox-grid">
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="lightbox-thumb"
            onClick={() => openLightbox(index)}
          >
            <div className="lightbox-thumb-wrapper glass-morphism">
              <img
                src={photo.url}
                alt={photo.caption}
                className="lightbox-thumb-img"
              />
              <div className="lightbox-overlay">
                <p className="lightbox-caption">{photo.caption}</p>
                <div className="lightbox-zoom-hint">🔍 Click para ampliar</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="lightbox-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="lightbox-close" onClick={closeLightbox}>
                <X className="w-6 h-6" />
              </button>
              
              <button className="lightbox-nav lightbox-prev" onClick={goToPrevious}>
                <ChevronLeft className="w-8 h-8" />
              </button>
              
              <div className="lightbox-image-container">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.caption}
                  className="lightbox-image"
                />
                <div className="lightbox-info">
                  <p className="lightbox-caption-large">{selectedImage.caption}</p>
                  <span className="lightbox-counter">
                    {currentIndex + 1} / {photos.length}
                  </span>
                </div>
              </div>
              
              <button className="lightbox-nav lightbox-next" onClick={goToNext}>
                <ChevronRight className="w-8 h-8" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LightboxGallery;