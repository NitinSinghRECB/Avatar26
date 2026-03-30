import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import IntroAnimation from '../components/IntroAnimation';
import About from '../components/About';
import Events from '../components/Events';
import Timeline from '../components/Timeline';
import Countdown from '../components/Countdown';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import RegistrationModal from '../components/RegistrationModal';

const Home = () => {
  const [isIntroActive, setIsIntroActive] = useState(true);
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    if (isIntroActive) {
      document.body.classList.add('intro-active');
      document.body.classList.remove('intro-done');
    } else {
      document.body.classList.remove('intro-active');
      document.body.classList.add('intro-done');
    }
  }, [isIntroActive]);

  const openRegModal = (event = null) => {
    setSelectedEvent(event);
    setIsRegModalOpen(true);
  };

  const closeRegModal = () => {
    setIsRegModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <>
      {isIntroActive && <IntroAnimation onComplete={() => setIsIntroActive(false)} />}
      
      <Navbar onRegisterClick={() => openRegModal()} />
      
      <Hero onRegisterClick={() => openRegModal()} />
      <Countdown />
      <About />
      <Events onRegisterClick={openRegModal} />
      <Timeline />
      <FAQ />
      <Footer />

      <RegistrationModal 
        isOpen={isRegModalOpen} 
        onClose={closeRegModal} 
        preSelectedEvent={selectedEvent} 
      />
    </>
  );
};

export default Home;
