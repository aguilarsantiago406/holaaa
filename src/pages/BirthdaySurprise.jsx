import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Cat, Sparkles, Music, VolumeX, Volume2, Play, Pause } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import mock from '../mock';
import CountdownTimer from '../components/CountdownTimer';
import InteractiveConfetti from '../components/InteractiveConfetti';
import WishesCloud from '../components/WishesCloud';
import ScrollProgress from '../components/ScrollProgress';
import LightboxGallery from '../components/LightboxGallery';
import FloatingPetals from '../components/FloatingPetals';
import ReasonCounter from '../components/ReasonCounter';
import CursorEffect from '../components/CursorEffect';
import BlowCandles from '../components/BlowCandles';
import FloatingBalloons from '../components/FloatingBalloons';
import SnowEffect from '../components/SnowEffect';
import ShareButtons from '../components/ShareButtons';
import TwentyOneThings from '../components/TwentyOneThings';
import EasterEggs from '../components/EasterEggs';

const BirthdaySurprise = () => {
  const [revealed, setRevealed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [flippedCards, setFlippedCards] = useState({});
  const [scrollY, setScrollY] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReveal = () => {
    setRevealed(true);
    setShowConfetti(true);

    if (audioRef.current) {
      audioRef.current.play().catch(err => {
        console.log('Audio playback failed:', err);
      });
    }

    setTimeout(() => setShowConfetti(false), 6000);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleCardFlip = (index) => {
    setFlippedCards(prev => ({ ...prev, [index]: !prev[index] }));
  };

  // Pausar música cuando un video empieza a reproducirse
  const handleVideoPlay = () => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
    }
  };

  // Reanudar música cuando el video termina o se pausa
  const handleVideoEnd = () => {
    if (audioRef.current && !isMuted) {
      audioRef.current.play().catch(err => {
        console.log('Audio resume failed:', err);
      });
    }
  };

  // Floating particles effect
  const FloatingParticles = () => (
    <div className="floating-particles">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="particle"
          animate={{
            y: [-20, -100, -20],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        >
          {['🌸', '🌺', '🌼', '✨', '💫', '🦋'][Math.floor(Math.random() * 6)]}
        </motion.div>
      ))}
    </div>
  );

  // Confetti animation
  const ConfettiRain = () => (
    <div className="confetti-container">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="confetti-piece"
          initial={{
            x: Math.random() * window.innerWidth,
            y: -20,
            rotate: 0,
            opacity: 1,
          }}
          animate={{
            y: window.innerHeight + 100,
            rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            ease: 'easeOut',
            delay: Math.random() * 0.5,
          }}
          style={{
            background: ['#FFB7B2', '#B5EAD7', '#FFFFD8', '#E2F0CB', '#ff6b9d', '#c56cf0'][Math.floor(Math.random() * 6)],
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="enchanted-container">
      <audio ref={audioRef} loop>
        <source src={mock.musicUrl} type="audio/mpeg" />
      </audio>

      {/* Scroll Progress Indicator */}
      {revealed && <ScrollProgress />}

      {/* EFECTOS DE PARTÍCULAS DESACTIVADOS PARA MEJOR RENDIMIENTO */}
      {/* Si quieres reactivar alguno, descomenta la línea correspondiente: */}
      {/* {revealed && <FloatingPetals />} */}
      {/* {revealed && <SnowEffect />} */}
      {/* {revealed && <FloatingBalloons />} */}
      {/* {revealed && <CursorEffect />} */}
      {/* {revealed && <EasterEggs />} */}
      {/* {revealed && <InteractiveConfetti />} */}

      {/* Botón de música eliminado */}

      <AnimatePresence>
        {showConfetti && <ConfettiRain />}
      </AnimatePresence>

      {/* Welcome Screen */}
      <AnimatePresence>
        {!revealed && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="welcome-screen-enchanted"
            style={{
              backgroundImage: `url(${mock.welcomeBackgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <FloatingParticles />
            <div className="welcome-content">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="welcome-inner glass-morphism"
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="welcome-icon"
                >
                  🐱✨
                </motion.div>

                <p className="welcome-subtitle">Algo mágico te espera</p>

                <Button
                  onClick={handleReveal}
                  className="reveal-btn glass-morphism"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  놀라움을 발견하다
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="main-content-with-background"
            style={{
              backgroundImage: mock.webBackgroundImage ? `url(${mock.webBackgroundImage})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Hero Section with Parallax */}
            <section className="hero-enchanted" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
              {/* FloatingParticles desactivado para mejor rendimiento */}
              <div className="hero-content">
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.8 }}
                  className="hero-text"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                    className="hero-cake"
                  >
                    🎂
                  </motion.div>

                  <h1 className="hero-title-enchanted">
                    생일 축하해 내 사랑
                  </h1>
                  <p className="hero-subtitle-korean">Feliz Cumpleaños mi Bella Señorita</p>

                  <p className="hero-subtitle-enchanted">
                    매년 더 많은 사랑, 더 많은 기쁨, 더 많은 미소를 가져다줄 거야
                  </p>
                  <p className="hero-subtitle-korean">Que cada año te traiga más amor, más alegría y más razones para sonreír</p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                    className="hero-icons"
                  >
                    <Heart className="hero-icon" />
                    <Cat className="hero-icon" />
                    <Sparkles className="hero-icon" />
                  </motion.div>
                </motion.div>
              </div>

              {/* Elementos decorativos desactivados para mejor rendimiento */}
            </section>

            {/* Countdown Timer Section */}
            <section className="countdown-section">
              <div className="container">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <CountdownTimer targetDate={mock.birthdayDate} />
                </motion.div>
              </div>
            </section>

            {/* Interactive Flip Cards Section */}
            <section className="flip-cards-section">
              <div className="container">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="section-header"
                >
                  <h2 className="section-title-enchanted">너를 위한 시 💌</h2>
                  <p className="section-subtitle-korean">Versos Para Ti</p>

                </motion.div>

                <div className="flip-cards-grid">
                  {mock.flipCards.map((card, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flip-card-wrapper"
                      onMouseEnter={() => handleCardFlip(index)}
                      onMouseLeave={() => handleCardFlip(index)}
                    >
                      <motion.div
                        className="flip-card-inner"
                        animate={{ rotateY: flippedCards[index] ? 180 : 0 }}
                        transition={{ duration: 0.6 }}
                      >
                        {/* Front */}
                        <div className="flip-card-front glass-morphism">
                          <div className="flip-card-icon">{card.icon}</div>
                          <h3 className="flip-card-title-front">{card.title}</h3>
                        </div>

                        {/* Back */}
                        <div className="flip-card-back glass-morphism">
                          <p className="flip-card-text">{card.text}</p>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Animated Counters Section */}
            <section className="counters-section">
              <div className="container">
                <motion.h2
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="section-title-enchanted text-center mb-12"
                >
                  En Números ✨
                </motion.h2>

                <div className="counters-grid">
                  {mock.counters.map((counter, index) => (
                    <ReasonCounter
                      key={index}
                      targetNumber={counter.number}
                      label={counter.label}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Wishes Cloud Section */}
            <section className="wishes-section">
              <div className="container">
                <motion.h2
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="section-title-enchanted text-center mb-8"
                >
                  Deseos Para Ti 🌟
                </motion.h2>
                <WishesCloud wishes={mock.wishes} />
              </div>
            </section>

            {/* Blow Candles Section */}
            <section className="blow-candles-section">
              <div className="container">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <BlowCandles />
                </motion.div>
              </div>
            </section>

            {/* 21 Things Section */}
            <section className="twenty-one-section">
              <div className="container">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <TwentyOneThings things={mock.twentyOneThings} />
                </motion.div>
              </div>
            </section>

            {/* Emotional Message with Glass Effect */}
            <section className="message-section-enchanted">
              <div className="container">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                  className="message-card-enchanted glass-morphism"
                >
                  <div className="message-decoration">🌺</div>
                  <h2 className="message-title">아주 특별한 사람</h2>
                  <p className="section-subtitle-korean">Una Persona Muy Especial</p>
                  <div className="message-text">
                    <p>{mock.emotionalMessage}</p>
                  </div>
                  {mock.emotionalMessageImage && (
                    <motion.img
                      src={mock.emotionalMessageImage}
                      alt="Foto especial"
                      className="message-image"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true }}
                    />
                  )}
                  <div className="message-decoration-bottom">💖</div>
                </motion.div>
              </div>
            </section>

            {/* Lightbox Gallery - Interactive */}
            <section className="gallery-section-enchanted">
              <div className="container">
                <motion.h2
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="section-title-enchanted text-center"
                >
                  잊을 수 없는 순간들 📸
                </motion.h2>
                <p className="section-subtitle-korean text-center">Momentos Inolvidables</p>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="section-subtitle text-center mb-12"
                >
                  <span className="subtitle-kr">사진을 클릭하면 크게 볼 수 있어요</span>
                  <span className="subtitle-es">Haz clic en cualquier foto para verla en grande</span>
                </motion.p>

                <LightboxGallery photos={mock.photos} />
              </div>
            </section>

            {/* Cinema Section - Video Spotlight */}
            <section className="cinema-section">
              <div className="container">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                  className="cinema-content"
                >
                  <h2 className="cinema-title">널한테 바치게 🎬</h2>
                  <p className="section-subtitle-korean">Te La Dedico</p>

                  <div className="videos-grid">
                    {/* Video 1 */}
                    <motion.div
                      className="video-frame glass-morphism"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true }}
                    >
                      <h3 className="video-subtitle">BTS도 너한테 바치게 💜</h3>
                      <p className="video-subtitle-es">Te Lo Dedica BTS</p>
                      <div className="video-wrapper">
                        {mock.video1Url ? (
                          <video
                            controls
                            className="birthday-video"
                            poster={mock.video1Poster}
                            onPlay={handleVideoPlay}
                            onPause={handleVideoEnd}
                            onEnded={handleVideoEnd}
                          >
                            <source src={mock.video1Url} type="video/mp4" />
                          </video>
                        ) : (
                          <div className="video-placeholder">
                            <Play className="w-12 h-12" />
                            <p>Agrega video1Url en mock.js</p>
                          </div>
                        )}
                      </div>
                    </motion.div>

                    {/* Video 2 */}
                    <motion.div
                      className="video-frame glass-morphism"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <h3 className="video-subtitle">이 고양이가 너한테 바치게 🐱</h3>
                      <p className="video-subtitle-es">Este Gatito Te Lo Dedica</p>
                      <div className="video-wrapper">
                        {mock.video2Url ? (
                          <video
                            controls
                            className="birthday-video"
                            poster={mock.video2Poster}
                            onPlay={handleVideoPlay}
                            onPause={handleVideoEnd}
                            onEnded={handleVideoEnd}
                          >
                            <source src={mock.video2Url} type="video/mp4" />
                          </video>
                        ) : (
                          <div className="video-placeholder">
                            <Play className="w-12 h-12" />
                            <p>Agrega video2Url en mock.js</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Winding Timeline */}
            <section className="timeline-section-enchanted">
              <div className="container">
                <motion.h2
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="section-title-enchanted"
                >
                  추억의 타임라인 ⏳
                </motion.h2>
                <p className="section-subtitle-korean text-center">Línea del Tiempo de Recuerdos</p>

                <div className="timeline-winding">
                  {mock.timelineNotes.map((note, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      className={`timeline-item ${index % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}
                    >
                      <div className="timeline-marker">
                        <div className="timeline-dot">🐾</div>
                      </div>

                      <div className="timeline-card glass-morphism">
                        <div className="timeline-icon-badge">{note.emoji || '✨'}</div>
                        <h3 className="timeline-card-title">{note.titleKr}</h3>
                        <p className="timeline-card-title-es">{note.title}</p>
                        <p className="timeline-card-text-kr">{note.textKr}</p>
                        <p className="timeline-card-text">{note.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="footer-enchanted">
              <div className="container">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1.5 }}
                  viewport={{ once: true }}
                  className="footer-content"
                >
                  <div className="footer-icons">
                    <Heart className="footer-icon animate-pulse" />
                    <Cat className="footer-icon" />
                    <Heart className="footer-icon animate-pulse" />
                  </div>

                  <p className="footer-message">
                    생일 축하해 내 사랑 ❤️
                  </p>
                  <p className="footer-subtitle-korean">Feliz Cumpleaños mi niña</p>

                  <p className="footer-date">
                    12월 24일 • 21살
                  </p>
                  <p className="footer-date-es">24 de Diciembre • 21 Años</p>

                  <div className="footer-share">
                    <ShareButtons />
                  </div>


                </motion.div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BirthdaySurprise;