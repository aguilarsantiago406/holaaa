import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Facebook, Twitter, Copy, Check } from 'lucide-react';

const ShareButtons = () => {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const shareUrl = window.location.href;
  const shareText = '¡Mira esta increíble página de cumpleaños! 🎂✨';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Cumpleaños de Liz Leydi',
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    }
  };

  return (
    <div className="share-buttons-container">
      <motion.button
        className="share-main-button glass-morphism"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Share2 className="w-5 h-5" />
        <span>Compartir</span>
      </motion.button>

      {isOpen && (
        <motion.div
          className="share-options glass-morphism"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          <button onClick={shareOnFacebook} className="share-option">
            <Facebook className="w-4 h-4" />
            <span>Facebook</span>
          </button>
          
          <button onClick={shareOnTwitter} className="share-option">
            <Twitter className="w-4 h-4" />
            <span>Twitter</span>
          </button>
          
          <button onClick={copyToClipboard} className="share-option">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? '¡Copiado!' : 'Copiar link'}</span>
          </button>

          {navigator.share && (
            <button onClick={shareNative} className="share-option">
              <Share2 className="w-4 h-4" />
              <span>Compartir...</span>
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default ShareButtons;