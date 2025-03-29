"use client";
import { motion, AnimatePresence } from "framer-motion";
import { GiftIcon, SparklesIcon, HeartIcon, CakeIcon, SpeakerWaveIcon, SpeakerXMarkIcon, SunIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import { useState, useEffect, useRef } from "react";
import dynamic from 'next/dynamic';

const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

interface ExperienceButtonProps {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  isCompleted: boolean;
  onReset: () => void;
  onComplete: (title: string) => void;
}

interface ActivityPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  funDetails: string;
  onComplete: () => void;
}

interface PreparationInstructions {
  title: string;
  items: string[];
}

const getPreparationInstructions = (title: string): PreparationInstructions => {
  switch (title) {
    case "Dylan's Smoothie Bar":
      return {
        title: "Time for Smoothie Magic! 🍹",
        items: [
          "Wear something comfy and tropical 🌺",
          "Bring your adventurous taste buds 😋",
          "Get ready for some fun smoothie trivia!",
          "Duration: About 1 hour of fruity fun"
        ]
      };
    case "Dylan's Massage Parlour":
      return {
        title: "Prepare for Relaxation 💆‍♀️",
        items: [
          "Wear comfortable, loose clothing 👕",
          "Take a warm shower beforehand 🚿",
          "Choose your favorite relaxing music 🎵",
          "Duration: 45 minutes of pure bliss"
        ]
      };
    case "Dylan's Noodling Experience":
      return {
        title: "Pool Party Prep! 🌊",
        items: [
          "Bring your swimsuit and a towel 👙",
          "Don't forget sunscreen! ☀️",
          "Get ready for some pool games 🎮",
          "Duration: 1-2 hours of splashing fun"
        ]
      };
    case "Dylan's Restaurant/Baking Show":
      return {
        title: "Showtime in the Kitchen! 👨‍🍳",
        items: [
          "Wear your fancy 'dinner date' outfit 👗",
          "Bring your appetite and camera 📸",
          "Prepare for some taste-testing fun!",
          "Duration: 2 hours of culinary adventure"
        ]
      };
    case "Backyard Picnic & Ice Cream Date":
      return {
        title: "Picnic Paradise Awaits! 🧺",
        items: [
          "Dress for outdoor comfort 🌞",
          "Bring your sweet tooth 🍦",
          "Maybe pack a light blanket 🌸",
          "Duration: 1-2 hours of outdoor delight"
        ]
      };
    default:
      return {
        title: "Get Ready for Fun! 🎉",
        items: [
          "Wear comfortable clothing 👕",
          "Bring your excitement! 🌟",
          "Get ready for a great time ✨",
          "Duration: 1-2 hours of fun"
        ]
      };
  }
};

const getFunDetails = (title: string) => {
  switch (title) {
    case "Dylan's Smoothie Bar":
      return "🎭 Step right up to the most colorful bar in town! Your personal smoothie artist (that is me!) is ready to blend up a storm. We are talking secret recipes, fancy umbrella garnishes, and maybe even a smoothie-making dance or two. Warning: Excessive happiness and brain freeze may occur! 🌈";
    case "Dylan's Massage Parlour":
      return "✨ Welcome to your personal relaxation station! Get ready for the most luxurious at-home spa experience ever. Featuring aromatic candles, soothing music, and your very own massage therapist (still me!). No fancy spa has this much love per square foot! 💆‍♀️";
    case "Dylan's Noodling Experience":
      return "🌊 Dive into the ultimate pool relaxation session! Picture this: You, a comfy pool noodle, and the gentle sway of the water. Your personal pool party host (that's me!) has prepared the perfect temperature (well... hopefully!), some refreshing drinks, and maybe even some fun pool games! Warning: May cause extreme relaxation, pruney fingers, and occasional squeals about water temperature! 🏊‍♀️✨";
    case "Dylan's Restaurant/Baking Show":
      return "📺 Lights, Camera, Kitchen Action! Your favorite chef (me again!) is ready to put on a show that would make Gordon Ramsay jealous. Expect cooking commentary, dramatic plate reveals, and possibly a few kitchen dance breaks. No angry chef outbursts guaranteed! 🎬";
    case "Backyard Picnic & Ice Cream Date":
      return "🌟 Get ready for the ultimate outdoor feast! Picture this: A cozy blanket, fairy lights twinkling, your favorite snacks, and an ice cream selection that would make a dessert shop envious. Plus, your personal picnic curator (still yours truly!) has some magical surprises planned! 🧺✨";
    default:
      return "Get ready for an amazing experience! 🎉";
  }
};

const ActivityPopup = ({ isOpen, onClose, title, description, funDetails, onComplete }: ActivityPopupProps) => {
  const [isConfetti, setIsConfetti] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [showPreparation, setShowPreparation] = useState(false);
  const [finalCelebration, setFinalCelebration] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset states when popup closes
  useEffect(() => {
    if (!isOpen) {
      setIsConfetti(false);
      setIsCelebrating(false);
      setShowPreparation(false);
    }
  }, [isOpen]);

  const handleLetsDoIt = () => {
    setIsConfetti(true);
    setIsCelebrating(true);
    const audio = new Audio('/celebration.mp3');
    audio.volume = 0.5; // Set volume to 50%
    audio.play().catch(error => {
      console.log('Audio playback failed:', error);
    });
    
    // First transition: Show confetti and celebration
    setTimeout(() => {
      setIsConfetti(false);
      setIsCelebrating(false);
    }, 2000);

    // Second transition: Show preparation screen
    setTimeout(() => {
      setShowPreparation(true);
    }, 2100);
  };

  const handleStartAdventure = () => {
    setFinalCelebration(true);
    const audio = new Audio('/celebration.mp3');
    audio.volume = 0.5; // Set volume to 50%
    audio.play().catch(error => {
      console.log('Audio playback failed:', error);
    });
    
    setTimeout(() => {
      setFinalCelebration(false);
      onComplete(); // Mark as completed
      onClose(); // Close the popup
    }, 3000);
  };

  const preparationInstructions = getPreparationInstructions(title);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {(isConfetti || finalCelebration) && (
            <>
              <Confetti
                width={windowSize.width}
                height={windowSize.height}
                recycle={finalCelebration}
                numberOfPieces={finalCelebration ? 200 : 500}
                gravity={0.3}
                style={{ zIndex: 100 }}
              />
              {!finalCelebration ? (
                <motion.div
                  initial={{ opacity: 0, scale: 1 }}
                  animate={{ 
                    opacity: [0, 1, 1, 0],
                    scale: [1, 1.2, 1.2, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 2, times: [0, 0.2, 0.8, 1] }}
                  className="fixed inset-0 flex items-center justify-center z-[100] pointer-events-none"
                >
                  <div className="text-6xl md:text-8xl font-bold text-white text-center drop-shadow-lg">
                    WOOHOO! 🎉
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="fixed inset-0 flex items-center justify-center z-[100] pointer-events-none"
                >
                  <div className="text-center space-y-4 bg-white/80 p-8 rounded-3xl backdrop-blur-md shadow-lg">
                    <motion.div
                      animate={{ 
                        y: [0, -20, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                      className="text-6xl md:text-8xl font-bold text-center drop-shadow-lg rainbow-text"
                      style={{
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundImage: 'linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8f00ff)',
                        backgroundSize: '300% 100%',
                        animation: 'rainbow-move 4s linear infinite',
                        filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.3))'
                      }}
                    >
                      <span
                        style={{
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundImage: 'linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8f00ff)',
                          backgroundSize: '300% 100%',
                          animation: 'rainbow-move 4s linear infinite',
                          filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.3))'
                        }}
                      >
                        Adventure Started!
                      </span>
                      <span className="text-yellow-400"> 🌟</span>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-2xl md:text-3xl font-medium px-4 py-2 rounded-lg"
                      style={{
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundImage: 'linear-gradient(90deg, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082)',
                        backgroundSize: '200% 100%',
                        animation: 'rainbow-move 3s linear infinite',
                        filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.3))'
                      }}
                    >
                      Have an amazing time! ✨
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </>
          )}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={!isCelebrating ? onClose : undefined}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={isCelebrating ? {
              scale: [1, 1.05, 1],
              rotate: [0, -2, 2, 0],
              transition: { duration: 0.5, times: [0, 0.2, 0.8, 1] }
            } : { opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-2xl p-6 shadow-xl z-50 border-4 border-emerald-200"
          >
            {!showPreparation ? (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center space-y-4"
              >
                <h3 className="text-2xl font-bold text-emerald-800">{title}</h3>
                <p className="text-emerald-600">{description}</p>
                <div className="bg-emerald-50 rounded-xl p-4 text-left">
                  <p className="text-emerald-700 font-pixel text-sm leading-relaxed">
                    {funDetails}
                  </p>
                </div>
                <div className="flex gap-4 justify-center mt-6">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors text-gray-700"
                  >
                    Maybe Later
                  </button>
                  <motion.button
                    onClick={handleLetsDoIt}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-colors text-white"
                  >
                    Let&apos;s Do It! 🎉
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center space-y-4"
              >
                <h3 className="text-2xl font-bold text-emerald-800">{preparationInstructions.title}</h3>
                <div className="bg-emerald-50 rounded-xl p-6">
                  <ul className="space-y-3 text-left">
                    {preparationInstructions.items.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="flex items-center text-emerald-700"
                      >
                        <span className="mr-2">✨</span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <motion.button
                  onClick={handleStartAdventure}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-colors text-white font-medium"
                >
                  Start the Adventure! ✨
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ExperienceButton = ({ icon: Icon, title, description, isCompleted, onReset, onComplete }: Omit<ExperienceButtonProps, 'href'>) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full relative"
      >
        <button
          onClick={() => !isCompleted && setIsPopupOpen(true)}
          className={`block w-full group rounded-2xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl 
            ${isCompleted 
              ? 'bg-gray-100/90 cursor-not-allowed' 
              : 'bg-emerald-50/90 hover:scale-105 hover:rotate-1'} 
            backdrop-blur-sm border-2 ${isCompleted ? 'border-gray-200' : 'border-emerald-100'}`}
        >
          <div className="flex flex-col items-center space-y-3">
            <div className={`p-3 rounded-full transition-colors 
              ${isCompleted ? 'bg-gray-200' : 'bg-emerald-100 group-hover:bg-emerald-200'}`}
            >
              <Icon className={`w-8 h-8 ${isCompleted ? 'text-gray-500' : 'text-emerald-600'}`} />
            </div>
            <h3 className={`text-xl font-bold ${isCompleted ? 'text-gray-500 line-through' : 'text-emerald-800'}`}>
              {title}
            </h3>
            <p className={`text-center text-sm ${isCompleted ? 'text-gray-500' : 'text-emerald-600'}`}>
              {description}
            </p>
          </div>
        </button>
        {isCompleted && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.2, rotate: 180 }}
            onClick={onReset}
            className="absolute -right-3 -top-3 p-2 bg-emerald-500 rounded-full shadow-lg hover:bg-emerald-600 transition-colors"
          >
            <ArrowPathIcon className="w-4 h-4 text-white" />
          </motion.button>
        )}
      </motion.div>
      <ActivityPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title={title}
        description={description}
        funDetails={getFunDetails(title)}
        onComplete={() => onComplete(title)}
      />
    </>
  );
};

// Pixel art floating elements
const PixelElement = ({ index }: { index: number }) => {
  const elements = ["⭐", "✨", "💫", "🌟", "⚡"];
  const [randomProps] = useState(() => ({
    startX: Math.random() * 100,
    scale: Math.random() * 0.3 + 0.3,
    duration: Math.random() * 2 + 1,
    delay: -Math.random() * 2,
  }));

  return (
    <motion.div
      className="fixed"
      initial={{
        x: `${randomProps.startX}vw`,
        y: "-10vh",
        scale: randomProps.scale,
      }}
      animate={{
        y: ["0vh", "110vh"],
        rotate: [0, 360],
      }}
      transition={{
        duration: randomProps.duration,
        repeat: Infinity,
        ease: "linear",
        delay: randomProps.delay,
      }}
    >
      <div className="text-4xl" style={{ imageRendering: "pixelated" }}>
        {elements[index % elements.length]}
      </div>
    </motion.div>
  );
};

export default function Wishes() {
  const [isClient, setIsClient] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [completedExperiences, setCompletedExperiences] = useState<Set<string>>(new Set());
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setIsClient(true);
    // Load completed experiences from localStorage
    const savedExperiences = localStorage.getItem('completedExperiences');
    if (savedExperiences) {
      setCompletedExperiences(new Set(JSON.parse(savedExperiences)));
    }

    // Add pixel font and keyframes for rainbow animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rainbow-move {
        0% { background-position: 0% 50%; }
        100% { background-position: 300% 50%; }
      }
    `;
    document.head.appendChild(style);

    // Add pixel font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const handleCompleteExperience = (title: string) => {
    setCompletedExperiences(prev => {
      const newSet = new Set([...prev, title]);
      // Save to localStorage
      localStorage.setItem('completedExperiences', JSON.stringify([...newSet]));
      return newSet;
    });
  };

  const handleResetExperience = (title: string) => {
    setCompletedExperiences(prev => {
      const newSet = new Set(prev);
      newSet.delete(title);
      // Save to localStorage
      localStorage.setItem('completedExperiences', JSON.stringify([...newSet]));
      return newSet;
    });
  };

  const experiences = [
    {
      icon: GiftIcon,
      title: "Dylan's Smoothie Bar",
      description: "A tropical paradise of fresh fruits and love, blended just for you 🍹",
      href: "/wishes/smoothie-bar"
    },
    {
      icon: SparklesIcon,
      title: "Dylan's Massage Parlour",
      description: "Relax and unwind with a special spa experience 💆‍♀️",
      href: "/wishes/massage"
    },
    {
      icon: HeartIcon,
      title: "Dylan's Noodling Experience",
      description: "Splash into relaxation with a fun pool float adventure 🏊‍♀️🌊",
      href: "/wishes/noodles"
    },
    {
      icon: CakeIcon,
      title: "Dylan's Restaurant/Baking Show",
      description: "A private cooking show with your personal chef 👨‍🍳",
      href: "/wishes/cooking"
    },
    {
      icon: SunIcon,
      title: "Backyard Picnic & Ice Cream Date",
      description: "A romantic outdoor feast with your favorite sweet treats 🧺🍦",
      href: "/wishes/picnic"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-300 to-pink-300 relative overflow-hidden font-pixel">
      <audio
        ref={audioRef}
        loop
        autoPlay
        muted={isMuted}
        src="/adventure-music.mp3"
      />
      
      <button
        onClick={toggleMute}
        className="fixed top-4 right-4 z-50 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
      >
        {isMuted ? (
          <SpeakerXMarkIcon className="w-6 h-6 text-gray-800" />
        ) : (
          <SpeakerWaveIcon className="w-6 h-6 text-gray-800" />
        )}
      </button>

      {/* Pixel art background elements */}
      {isClient && (
        <>
          {[...Array(20)].map((_, i) => (
            <PixelElement key={i} index={i} />
          ))}
        </>
      )}

      <main className="container mx-auto px-4 py-8 relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
            Your Birthday Adventure
          </h1>
          <p className="text-lg md:text-xl text-white drop-shadow-md">
            Hey there! Ready for some birthday fun? 🎮
          </p>
        </motion.div>

        <div className="flex flex-col gap-6 max-w-md w-full">
          {experiences.map((experience, index) => (
            <ExperienceButton
              key={index}
              {...experience}
              isCompleted={completedExperiences.has(experience.title)}
              onReset={() => handleResetExperience(experience.title)}
              onComplete={handleCompleteExperience}
            />
          ))}
        </div>
      </main>
    </div>
  );
}