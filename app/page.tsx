"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Instagram,
  Music,
  Users,
  Award,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Zap,
  Camera,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const AllessonSite = () => {
  const [clickedCards, setClickedCards] = useState<Record<number, boolean>>({});
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);
  const heroRef = useRef(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [explosions, setExplosions] = useState<{ id: number; x: number; y: number }[]>([]);
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; size: number; speed: number; emoji: string }[]
  >([]);
  const [currentPhase, setCurrentPhase] = useState(0);
  
  // Novos estados para as features rockstar
  const [alessonMode, setAlessonMode] = useState(false);
  const [currentMoodboardSlide, setCurrentMoodboardSlide] = useState(0);
  const [isCarouselTransitioning, setIsCarouselTransitioning] = useState(false);
  const [hoveredLocationId, setHoveredLocationId] = useState<number | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [selectedVideo, setSelectedVideo] = useState<{
    src: string;
    title: string;
    description: string;
    emotion: string;
  } | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageModal, setSelectedImageModal] = useState<{
    image: string;
    title: string;
    subtitle: string;
    description: string;
    colors: string[];
    style: string;
  } | null>(null);

  // Add Instagram stats here
  const followersCount = 2090000; // Example: 1,050,000 followers
  const engagementCount = 100.2;    // Example: 7.2% engagement

  const videos = [
    {
      src: "/namoro.mp4",
      title: "O Pedido de Namoro",
      description: "Quando a vida te apresenta o amor verdadeiro",
      emotion: "❤️ O momento que mudou tudo para sempre",
    },
    {
      src: "/aniversario.mp4",
      title: "Aniversários Temáticos",
      description: "Celebrando a vida com estilo único",
      emotion: "🎉 Cada ano uma nova aventura épica",
    },
    {
      src: "/sonhocarro.mp4",
      title: "Sonho do Carro",
      description: "Realizando o sonho do pai",
      emotion: "🚗 Quando o filho realiza o sonho do herói",
    },
  ];

  // Moodboard do Estilo Alesson - Rockstar Level! 🔥
  const moodboardSlides = [
    {
      image: "/carrossel1.jpg",
      title: "Bahia Chic Vibes",
      subtitle: "O estilo que conquista",
      colors: ["#FF6B35", "#F7931E", "#FFD23F", "#06FFA5"],
      description: "Cores vibrantes que refletem a alma baiana",
      style: "Casual Elegante"
    },
    {
      image: "/carrossel2.jpg",
      title: "Pagodão Clean",
      subtitle: "Elegância com raízes",
      colors: ["#4ECDC4", "#44A08D", "#093637", "#20BDFF"],
      description: "A sofisticação encontra a tradição",
      style: "Moderno Baiano"
    },
    {
      image: "/carrossel3.jpg",
      title: "Salvador Style",
      subtitle: "Autenticidade pura",
      colors: ["#FD79A8", "#FDCB6E", "#6C5CE7", "#A29BFE"],
      description: "O charme único de quem é raiz",
      style: "Urbano Tropical"
    },
    {
      image: "/carrossel4.jpg",
      title: "Sunset Energy",
      subtitle: "Energia contagiante",
      colors: ["#FF7675", "#FDCB6E", "#E17055", "#00B894"],
      description: "Como o pôr do sol na Barra",
      style: "Lifestyle Bahia"
    },
    {
      image: "/carrossel5.jpg",
      title: "Rockstar Mood",
      subtitle: "Atitude em cada look",
      colors: ["#2D3436", "#636E72", "#FFEAA7", "#55A3FF"],
      description: "Quando o estilo fala por si só",
      style: "Confident Boss"
    }
  ];

  // Locais Icônicos da Bahia que Alesson visitou 🗺️
  const bahiaLocations = [
    {
      id: 1,
      name: "Pelourinho",
      position: { x: 45, y: 55 },
      description: "Centro histórico cheio de cultura",
      emoji: "🏛️",
      visited: true,
      visitInfo: {
        date: "15/03/2024",
        activity: "Show de pagode no Largo do Pelourinho",
        duration: "3 horas",
        highlight: "Tocou 'Evidências' e a galera cantou junto!",
        photos: 47,
        companions: ["Cristian", "Sheuba", "Carlinhos"]
      }
    },
    {
      id: 2,
      name: "Farol da Barra",
      position: { x: 30, y: 60 },
      description: "Pôr do sol mais lindo de Salvador",
      emoji: "🌅",
      visited: true,
      visitInfo: {
        date: "22/02/2024",
        activity: "Sessão de fotos românticas",
        duration: "2 horas",
        highlight: "Pediu a namorada em namoro vendo o pôr do sol!",
        photos: 89,
        companions: ["Renatinha ❤️"]
      }
    },
    {
      id: 3,
      name: "Elevador Lacerda",
      position: { x: 47, y: 56 },
      description: "Vista panorâmica da cidade",
      emoji: "🏗️",
      visited: true,
      visitInfo: {
        date: "08/04/2024",
        activity: "Vlog sobre história da Bahia",
        duration: "1.5 horas",
        highlight: "Gravou dancinha viral com vista incrível",
        photos: 23,
        companions: ["Tiago", "Rafa"]
      }
    },
    {
      id: 4,
      name: "Rio Vermelho",
      position: { x: 35, y: 58 },
      description: "Boemia e cultura local",
      emoji: "🎭",
      visited: true,
      visitInfo: {
        date: "30/01/2024",
        activity: "Festa de aniversário de 1 ano no YouTube",
        duration: "5 horas",
        highlight: "Festa épica com todos os amigos!",
        photos: 156,
        companions: ["Galera toda", "Cristian", "Sheuba", "Carlinhos", "Tiago", "Rafa"]
      }
    },
    {
      id: 5,
      name: "Porto da Barra",
      position: { x: 32, y: 62 },
      description: "Praia urbana com história",
      emoji: "🏖️",
      visited: true,
      visitInfo: {
        date: "12/05/2024",
        activity: "Aula de surf e beach tennis",
        duration: "4 horas",
        highlight: "Primeira onda surfada! Caiu só 20 vezes 😂",
        photos: 72,
        companions: ["Carlinhos", "Instrutores locais"]
      }
    },
    {
      id: 6,
      name: "Mercado Modelo",
      position: { x: 46, y: 57 },
      description: "Artesanato e tradições baianas",
      emoji: "🛍️",
      visited: true,
      visitInfo: {
        date: "18/03/2024",
        activity: "Compras de lembranças e degustação",
        duration: "2.5 horas",
        highlight: "Provou acarajé pela primeira vez e amou!",
        photos: 34,
        companions: ["Sheuba", "Vendedores simpáticos"]
      }
    }
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    // Animação de loading épica
    setTimeout(() => setIsLoaded(true), 800);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  interface MousePosition {
    x: number;
    y: number;
  }

  interface Video {
    src: string;
    title: string;
    description: string;
    emotion: string;
  }

  interface Explosion {
    id: number;
    x: number;
    y: number;
  }

  interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
    emoji: string;
  }

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  interface OpenModalFn {
    (videoIndex: number): void;
  }

  const openModal: OpenModalFn = (videoIndex) => {
    console.log("🎯 Abrindo modal para vídeo:", videoIndex);
    console.log("🎬 Vídeo selecionado:", videos[videoIndex]);

    setSelectedVideo(videos[videoIndex]);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedVideo(null);
  };

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentVideo((prev) => (prev - 1 + videos.length) % videos.length);
  };

const loadingPhases = [
  "🎭 PREPARANDO O CARNALÊ...",
  "🎉 AJUSTANDO A COREÔ...",
  "🕺 ENSAIANDO O PASSINHO...",
  "📸 BOTANDO O LOOK PRA JOGO...",
  "🌟 LIBERANDO O BRILHO!",
];

const rockstarMessages = [
  "⚡ O PAI TÁ ON!",
  "🔥 LÁ ELE, MAS TÁ VINDO!",
  "🎊 É MUITA ENERGIA, MAINHA!",
  "🌈 VIBE LÁ EM CIMA!",
  "🫦 NA TENDÊNCIA, BB!",
  "📢 O FURACÃO DE ACUPE CHEGOU!",
  "👑 ALÊ TÁ CARREGANDO, SEGURA!",
];

  // Simular carregamento
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoaded(true), 1000);
          return 100;
        }
        
        const newProgress = prev + Math.random() * 15;
        const phase = Math.floor((newProgress / 100) * loadingPhases.length);
        setCurrentPhase(Math.min(phase, loadingPhases.length - 1));
        
        return Math.min(newProgress, 100);
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Gerar partículas
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 2 + 1,
          emoji: ['⚡', '🔥', '💥', '✨', '🎸', '⭐'][Math.floor(Math.random() * 6)]
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  const toggleAlessonMode = () => {
    const newMode = !alessonMode;
    setAlessonMode(newMode);
    
    if (newMode) {
      if (audioRef.current) {
        audioRef.current.volume = 0.3;
        audioRef.current.play().catch(console.log);
      }
      
      const newExplosions = [];
      for (let i = 0; i < 15; i++) {
        newExplosions.push({
          id: Date.now() + i,
          x: Math.random() * 100,
          y: Math.random() * 100,
        });
      }
      setExplosions(newExplosions);
      
      // Remover explosões
      setTimeout(() => setExplosions([]), 2000);
      
      // 🎮 EFEITOS ROCKSTAR GAMES - SHAKE + GLITCH ÉPICO!
      setIsShaking(true);
      setIsGlitching(true);
      
      // Sequência de efeitos épicos
      setTimeout(() => setIsShaking(false), 500);
      setTimeout(() => setIsGlitching(false), 1500);
      
      // Glitch adicional aleatório durante o modo
      const glitchInterval = setInterval(() => {
        if (alessonMode) {
          setIsGlitching(true);
          setTimeout(() => setIsGlitching(false), 200);
        } else {
          clearInterval(glitchInterval);
        }
      }, Math.random() * 10000 + 5000); // Entre 5-15 segundos
      
    } else {
      // Parar música e efeitos
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsShaking(false);
      setIsGlitching(false);
    }
  };

  // Controles do Moodboard Carrossel
  const nextMoodboardSlide = () => {
    if (isCarouselTransitioning) return;
    setIsCarouselTransitioning(true);
    setCurrentMoodboardSlide((prev) => (prev + 1) % moodboardSlides.length);
    setTimeout(() => setIsCarouselTransitioning(false), 600);
  };

  const prevMoodboardSlide = () => {
    if (isCarouselTransitioning) return;
    setIsCarouselTransitioning(true);
    setCurrentMoodboardSlide((prev) => (prev - 1 + moodboardSlides.length) % moodboardSlides.length);
    setTimeout(() => setIsCarouselTransitioning(false), 600);
  };

  const goToMoodboardSlide = (index: number) => {
    if (isCarouselTransitioning || index === currentMoodboardSlide) return;
    setIsCarouselTransitioning(true);
    setCurrentMoodboardSlide(index);
    setTimeout(() => setIsCarouselTransitioning(false), 600);
  };

  // Gerar explosões
  useEffect(() => {
    if (loadingProgress > 0) {
      const explosion = {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 100
      };
      setExplosions(prev => [...prev, explosion]);
      
      setTimeout(() => {
        setExplosions(prev => prev.filter(e => e.id !== explosion.id));
      }, 1000);
    }
  }, [Math.floor(loadingProgress / 20)]);

  interface UseCountUpOptions {
    end: number;
    duration?: number;
    startWhen?: boolean;
  }

  type AnimateFn = (currentTime: number) => void;

  const useCountUp = (
    end: number,
    duration: number = 2000,
    startWhen: boolean = true
  ): number => {
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
      if (!startWhen) return;

      let startTime: number | undefined;
      let animate: AnimateFn;

      animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress: number = Math.min((currentTime - startTime) / duration, 1);

        setCount(Math.floor(progress * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, [end, duration, startWhen]);

    return count;
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-rose-50 text-gray-900 overflow-x-hidden ${
      isShaking ? 'animate-rockstar-shake' : ''
    } ${
      isGlitching ? 'animate-glitch' : ''
    }`}>
      {/* Floating 3D Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-orange-300/20 to-rose-300/20 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${
              mousePosition.y * 0.02
            }px)`,
            left: "10%",
            top: "20%",
          }}
        />
        <div
          className="absolute w-64 h-64 bg-gradient-to-r from-amber-300/20 to-orange-300/20 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * -0.03}px, ${
              mousePosition.y * -0.03
            }px)`,
            right: "10%",
            bottom: "20%",
          }}
        />
        <div
          className="absolute w-80 h-80 bg-gradient-to-r from-rose-300/15 to-pink-300/15 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 0.015}px, ${
              mousePosition.y * 0.015
            }px)`,
            left: "50%",
            top: "60%",
          }}
        />
      </div>

      {/* 🎮 OVERLAY DE GLITCH ROCKSTAR GAMES */}
      {isGlitching && (
        <div className="fixed inset-0 pointer-events-none z-30">
          {/* Linhas de scan horizontais */}
          <div className="absolute inset-0 opacity-20" style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(255, 107, 53, 0.8) 2px,
              rgba(255, 107, 53, 0.8) 4px
            )`,
            animation: 'glitch-scan 0.1s infinite'
          }}></div>
          
          {/* Barras coloridas de glitch */}
          <div className="absolute top-0 left-0 w-full h-2 bg-red-500 opacity-70 animate-pulse"></div>
          <div className="absolute top-1/4 left-0 w-full h-1 bg-cyan-400 opacity-80" style={{
            animation: 'glitch-slide 0.2s infinite'
          }}></div>
          <div className="absolute top-1/2 left-0 w-full h-3 bg-yellow-400 opacity-60" style={{
            animation: 'glitch-slide 0.15s infinite reverse'
          }}></div>
          <div className="absolute top-3/4 left-0 w-full h-1 bg-purple-500 opacity-90" style={{
            animation: 'glitch-slide 0.25s infinite'
          }}></div>
          
          {/* Efeito de static */}
          <div className="absolute inset-0 opacity-10" style={{
            background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.3'/%3E%3C/svg%3E")`,
            animation: 'static-noise 0.1s infinite'
          }}></div>
        </div>
      )}

      {/* Epic Loading Animation - VERSÃO ROCKSTAR */}
      <div
        className={`fixed inset-0 bg-gradient-to-br from-orange-500 via-rose-500 to-purple-600 z-50 flex items-center justify-center transition-all duration-1000 ${
          isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{
          animation: loadingProgress > 80 ? 'screen-shake 0.5s ease-in-out infinite' : 'none'
        }}
      >
        {/* Fundo com efeito matrix */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse"></div>
        </div>

        {/* Partículas flutuantes */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute text-2xl pointer-events-none"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animation: `particle-float ${particle.speed}s linear infinite`,
              animationDelay: `${particle.id * 0.1}s`
            }}
          >
            {particle.emoji}
          </div>
        ))}

        {/* Explosões */}
        {explosions.map(explosion => (
          <div
            key={explosion.id}
            className="absolute text-5xl pointer-events-none"
            style={{
              left: `${explosion.x}%`,
              top: `${explosion.y}%`,
              animation: 'explosion-burst 1s ease-out forwards'
            }}
          >
            💥
          </div>
        ))}

        {/* Efeito de raio */}
        {loadingProgress > 70 && (
          <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
        )}

        {/* Conteúdo principal - CENTRALIZADO */}
        <div className="text-center z-10 flex flex-col items-center">
          {/* Logo principal */}
          <div className="text-8xl font-black mb-6 bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
            ALESSON
          </div>

          {/* Mensagem rockstar */}
          <div className="text-2xl font-bold text-white mb-4 animate-bounce">
            {rockstarMessages[currentPhase] || "🎮 LOADING..."}
          </div>

          {/* Barra de progresso épica - PERFEITAMENTE CENTRALIZADA */}
          <div className="relative w-80 h-4 bg-black/30 rounded-full overflow-hidden mb-6 border-2 border-white/50 mx-auto">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 rounded-full transition-all duration-300"
              style={{ 
                width: `${loadingProgress}%`,
                boxShadow: '0 0 20px rgba(249, 115, 22, 0.8)'
              }}
            ></div>
            
            {/* Indicador de progresso */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {Math.round(loadingProgress)}%
              </span>
            </div>
          </div>

          {/* Fase atual */}
          <div className="text-white/90 text-lg font-semibold mb-4">
            {loadingPhases[currentPhase]}
          </div>

          {/* Indicadores de status - CENTRALIZADOS */}
          <div className="flex justify-center space-x-4 text-white/70">
            <div className={`flex items-center ${loadingProgress > 20 ? 'text-green-400' : ''}`}>
              <span className="mr-2">🔧</span>
              <span>Carnalê</span>
            </div>
            <div className={`flex items-center ${loadingProgress > 40 ? 'text-green-400' : ''}`}>
              <span className="mr-2">📁</span>
              <span>Look Pronto</span>
            </div>
            <div className={`flex items-center ${loadingProgress > 60 ? 'text-green-400' : ''}`}>
              <span className="mr-2">⚡</span>
              <span>Passinho Ensaiado</span>
            </div>
            <div className={`flex items-center ${loadingProgress > 80 ? 'text-green-400' : ''}`}>
              <span className="mr-2">🚀</span>
              <span>Alê Chegando!</span>
            </div>
          </div>

          {/* Mensagem final épica */}
          {loadingProgress > 95 && (
            <div className="mt-6 text-3xl font-black text-white animate-bounce">
              🎸 READY TO ROCK! 🎸
            </div>
          )}
        </div>

        {/* Confetes finais */}
        {loadingProgress > 90 && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({length: 30}).map((_, i) => (
              <div
                key={i}
                className="absolute text-2xl animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              >
                {['🎉', '🎊', '✨', '🔥', '⚡', '🎸'][Math.floor(Math.random() * 6)]}
              </div>
            ))}
          </div>
        )}
</div>

      {/* Glassmorphism Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-2xl border-b border-white/20 shadow-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-3xl font-black bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
              ALESSON
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {[
                { label: "HOME", id: "home" },
                { label: "SOBRE", id: "about" },
                { label: "ESTILO", id: "moodboard" },
                { label: "SALVADOR", id: "mapa-bahia" },
                { label: "CONTATO", id: "contato" }
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.id)}
                  className="relative px-4 py-2 text-gray-700 hover:text-orange-500 transition-all duration-300 group"
                >
                  {item.label}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-orange-500 to-rose-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white/20 backdrop-blur-lg border border-white/30 hover:bg-white/30 transition-all"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 bg-white/20 rounded-2xl backdrop-blur-lg border border-white/30 p-4">
              <div className="flex flex-col space-y-4">
                {[
                  { label: "HOME", id: "home" },
                  { label: "SOBRE", id: "about" },
                  { label: "ESTILO", id: "moodboard" },
                  { label: "SALVADOR", id: "mapa-bahia" },
                  { label: "CONTATO", id: "contato" }
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left py-2 text-gray-700 hover:text-orange-500 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Floating Professional Polaroids */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <div
          className="absolute top-1/4 left-1/4 w-40 h-48 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-3 transform rotate-12 border-4 border-white"
          style={{
            transform: `translate3d(${mousePosition.x * 0.03}px, ${
              mousePosition.y * 0.03
            }px, 0) rotate(12deg)`,
            animation: "float 6s ease-in-out infinite",
          }}
        >
          <img
            src="/alesson2.jpg"
            alt="Alesson - Momento Profissional"
            className="w-full h-4/5 object-cover rounded-xl"
          />
          <div className="text-center mt-2">
            <p className="text-xs font-bold text-gray-700">Salvador, BA</p>
          </div>
        </div>

        <div
          className="absolute bottom-1/4 right-1/4 w-36 h-44 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-3 transform -rotate-12 border-4 border-white"
          style={{
            transform: `translate3d(${mousePosition.x * -0.02}px, ${
              mousePosition.y * -0.02
            }px, 0) rotate(-12deg)`,
            animation: "float 8s ease-in-out infinite reverse",
          }}
        >
          <img
            src="/alesson3.jpg"
            alt="Alesson - Lifestyle"
            className="w-full h-4/5 object-cover rounded-xl"
          />
          <div className="text-center mt-2">
            <p className="text-xs font-bold text-gray-700">Lifestyle</p>
          </div>
        </div>

        {/* Floating 3D Cards - Os que você adorou! */}
        <div
          className="absolute top-1/3 right-1/3 w-32 h-32 bg-gradient-to-br from-orange-300/40 to-rose-300/40 rounded-3xl shadow-2xl backdrop-blur-sm transform rotate-12"
          style={{
            transform: `translate3d(${mousePosition.x * 0.03}px, ${
              mousePosition.y * 0.03
            }px, 0) rotate(12deg)`,
            animation: "float 6s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-gradient-to-br from-amber-300/40 to-orange-300/40 rounded-2xl shadow-2xl backdrop-blur-sm transform -rotate-12"
          style={{
            transform: `translate3d(${mousePosition.x * -0.02}px, ${
              mousePosition.y * -0.02
            }px, 0) rotate(-12deg)`,
            animation: "float 8s ease-in-out infinite reverse",
          }}
        />
        <div
          className="absolute top-3/4 left-1/2 w-20 h-20 bg-gradient-to-br from-rose-300/40 to-pink-300/40 rounded-xl shadow-2xl backdrop-blur-sm transform rotate-45"
          style={{
            transform: `translate3d(${mousePosition.x * 0.025}px, ${
              mousePosition.y * 0.025
            }px, 0) rotate(45deg)`,
            animation: "float 7s ease-in-out infinite",
          }}
        />
      </div>

      {/* Enhanced About Section */}
      <section
        id="about"
        className="py-24 bg-gradient-to-b from-white/50 to-orange-50/50 backdrop-blur-3xl"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto text-center mb-20">
            <div className="inline-flex items-center bg-gradient-to-r from-orange-500/20 to-rose-500/20 rounded-full px-8 py-4 backdrop-blur-lg border border-white/30 mb-8">
              <Award className="text-orange-500 mr-3" size={24} />
              <span className="text-gray-700 font-bold text-lg">Sobre Mim</span>
            </div>

            <h2 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
              ALESSON
            </h2>

            <p className="text-2xl text-gray-600 mb-12 leading-relaxed">
              Influenciador digital de Salvador, especializado em criar conteúdo
              <span className="text-orange-500 font-semibold">
                {" "}
                autêntico
              </span>{" "}
              e<span className="text-rose-500 font-semibold"> envolvente</span>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: Users,
                number: "2.000.000+",
                label: "Seguidores",
                color: "from-orange-500 to-rose-500",
              },
              {
                icon: Play,
                number: "500M+",
                label: "Visualizações",
                color: "from-rose-500 to-pink-500",
              },
              {
                icon: Award,
                number: "6 Anos",
                label: "Experiência",
                color: "from-amber-500 to-orange-500",
              },
            ].map((stat, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-rose-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-white/40 backdrop-blur-2xl border border-white/30 p-8 rounded-3xl text-center hover:transform hover:scale-105 transition-all duration-300 shadow-xl">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl mb-6 shadow-lg`}
                  >
                    <stat.icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-4xl font-black mb-2 text-gray-800">
                    {stat.number}
                  </h3>
                  <p className="text-gray-600 font-semibold">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative overflow-visible">
            {/* Efeito neon REAL passando pelas bordas - ESTILO GTA/ROCKSTAR */}
            <div className="absolute -inset-6 rounded-3xl pointer-events-none">
              {/* Linha neon principal com piscar estilo Rockstar */}
              <div 
                className="absolute inset-0 rounded-3xl"
                style={{
                  boxShadow: `
                    0 0 0 2px transparent,
                    0 0 0 4px rgba(255, 107, 53, 0.3),
                    0 0 10px rgba(255, 107, 53, 0.5),
                    0 0 20px rgba(255, 107, 53, 0.3),
                    0 0 40px rgba(255, 107, 53, 0.1)
                  `,
                  border: '2px solid rgba(255, 107, 53, 0.8)',
                  animation: 'neon-pulse 4s ease-in-out infinite, neon-flicker 6s linear infinite'
                }}
              ></div>
              
              {/* Efeito de luz correndo com flicker */}
              <div 
                className="absolute inset-0 rounded-3xl border-2 border-transparent"
                style={{
                  background: `
                    linear-gradient(90deg, transparent 0%, rgba(255, 107, 53, 0.9) 50%, transparent 100%),
                    linear-gradient(0deg, transparent 0%, rgba(255, 107, 53, 0.9) 50%, transparent 100%),
                    linear-gradient(-90deg, transparent 0%, rgba(255, 107, 53, 0.9) 50%, transparent 100%),
                    linear-gradient(180deg, transparent 0%, rgba(255, 107, 53, 0.9) 50%, transparent 100%)
                  `,
                  backgroundSize: '200% 4px, 4px 200%, 200% 4px, 4px 200%',
                  backgroundPosition: '0 0, 100% 0, 100% 100%, 0 100%',
                  backgroundRepeat: 'no-repeat',
                  animation: 'neon-runner 3s linear infinite, neon-flicker 8s linear infinite'
                }}
              ></div>
              
              {/* Camada extra de brilho intenso */}
              <div 
                className="absolute inset-2 rounded-3xl"
                style={{
                  boxShadow: '0 0 30px rgba(255, 107, 53, 0.4), inset 0 0 30px rgba(255, 107, 53, 0.1)',
                  animation: 'neon-flicker 5s linear infinite reverse'
                }}
              ></div>
            </div>
            
            {/* Glow suave de fundo */}
            <div className="absolute -inset-4 rounded-3xl bg-orange-500/10 blur-xl"></div>

            {/* Foto do Alesson como fundo do card inteiro */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <img
                src="/alesson4.jpg"
                alt="Alesson"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center top" }}
              />
              {/* Overlay escuro para legibilidade + efeito cinematográfico */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/70"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30"></div>
              {/* Efeito de luz laranja */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-rose-500/20 mix-blend-overlay"></div>
            </div>

            <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-12 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative z-10">
                  <h3 className="text-4xl font-black mb-6 bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent drop-shadow-lg">
                    Minha Jornada
                  </h3>
                  <div className="space-y-6 text-white/90 text-lg leading-relaxed font-medium">
                    <p className="drop-shadow-md">
                      Nascido e criado em Salvador, sempre tive paixão por criar
                      conteúdo que conecta com as pessoas. Começei nas redes
                      sociais compartilhando minha vida e experiências da nossa
                      querida Bahia.
                    </p>
                    <p className="drop-shadow-md">
                      Hoje, com uma comunidade de mais de 500 mil seguidores,
                      meu foco é criar conteúdo autêntico que inspire e
                      entretenha, sempre mostrando a beleza e cultura da nossa
                      terra.
                    </p>
                  </div>
                </div>

                <div className="relative z-10">
                  {/* Quote section com efeito glass */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/40 to-rose-500/40 rounded-3xl blur-xl animate-pulse"></div>
                    <div className="relative bg-gradient-to-br from-white/20 via-white/10 to-white/5 rounded-3xl p-8 text-center backdrop-blur-lg border border-white/30 shadow-2xl">
                      <div className="text-3xl font-black bg-gradient-to-r from-orange-300 to-rose-300 bg-clip-text text-transparent mb-3 drop-shadow-lg">
                        "Autenticidade é tudo"
                      </div>
                      <p className="text-white/80 font-semibold text-lg drop-shadow-md">
                        Meu lema para criar conteúdo
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Epic Content Section */}
      <section
        id="content"
        className="py-24 bg-gradient-to-b from-orange-50/50 via-rose-50/50 to-orange-50/50"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-gradient-to-r from-orange-500/20 to-rose-500/20 rounded-full px-8 py-4 backdrop-blur-lg border border-white/30 mb-8">
              <Camera className="text-orange-500 mr-3" size={24} />
              <span className="text-gray-700 font-bold text-lg">
                Meu Conteúdo
              </span>
            </div>

            <h2 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
              PLATAFORMAS
            </h2>

            <p className="text-2xl text-gray-600">
              Acompanhe meus conteúdos nas principais redes sociais
            </p>
          </div>

          {/* Instagram 3D Card with Video Background */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-300"></div>
            <div className="relative bg-white/40 backdrop-blur-2xl border border-white/30 rounded-3xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-2xl">
              {/* Video Background */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/alessonvideo1.mp4" type="video/mp4" />
                </video>
                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
              </div>

{/* Content over video */}
              <div className="relative z-10 p-10">
                <div className="flex items-center mb-8">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-4 rounded-2xl shadow-lg mr-4 backdrop-blur-lg">
                    <Instagram className="text-white" size={32} />
                  </div>
                  <h3 className="text-4xl font-black text-white drop-shadow-2xl">
                    Instagram
                  </h3>
                </div>

                <p className="text-white/90 mb-8 text-lg leading-relaxed drop-shadow-lg">
                  Stories diários, posts inspiradores e bastidores da vida em
                  Salvador
                </p>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/30">
                    <div className="text-3xl font-black text-pink-300 mb-2 drop-shadow-lg">
                      {followersCount >= 1000000 ? `${(followersCount / 1000000).toFixed(1)}M` : `${Math.floor(followersCount / 1000)}K`}
                    </div>
                    <div className="text-white/80 font-semibold">
                      Seguidores
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/30">
                    <div className="text-3xl font-black text-pink-300 mb-2 drop-shadow-lg">
                      {engagementCount}%
                    </div>
                    <div className="text-white/80 font-semibold">
                      Engajamento
                    </div>
                  </div>
                </div>

                <a 
                  href="https://instagram.com/alesson" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl backdrop-blur-lg text-center"
                >
                  Seguir no Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Video Preview Section com Estilo Rockstar */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-rose-500/10 rounded-3xl blur-2xl"></div>
            <div className="relative bg-white/40 backdrop-blur-2xl border border-white/30 rounded-3xl p-12 shadow-2xl">
              <h3 className="text-4xl font-black text-center mb-12 bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
                Vídeos Recentes
              </h3>

              <div className="grid md:grid-cols-3 gap-8">
                {videos.map((video, index) => {
                  const handleClick = () => {
                    console.log("🎸 Clicou no card:", index);
                    console.log("🎬 Vídeo selecionado:", video);
                    console.log("📹 Todos os vídeos:", videos);
                    setClickedCards((prev) => ({ ...prev, [index]: true }));

                    setTimeout(() => {
                      setClickedCards((prev) => ({ ...prev, [index]: false }));
                    }, 800);

                    openModal(index);
                  };

                  return (
                    <div
                      key={index}
                      className={`group relative rockstar-card ${
                        clickedCards[index] ? "clicked" : ""
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-rose-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                      <div
                        className="relative bg-white/30 backdrop-blur-lg border border-white/40 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer shadow-xl card-border"
                        onClick={handleClick}
                      >
                        <div className="aspect-video bg-gradient-to-br from-orange-500/20 to-rose-500/20 flex items-center justify-center relative overflow-hidden video-background">
                          {/* Video thumbnail com blur como fundo */}
                          <video
                            className="absolute inset-0 w-full h-full object-cover blur-sm scale-110 opacity-60"
                            muted
                            loop
                            autoPlay
                            playsInline
                          >
                            <source src={video.src} type="video/mp4" />
                          </video>
                          
                          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-rose-500/20"></div>
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300"></div>
                          <Play
                            className="text-white group-hover:scale-110 group-hover:text-orange-400 transition-all duration-300 relative z-10 drop-shadow-2xl play-button"
                            size={48}
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                            <div className="text-white text-xs font-semibold opacity-90">
                              {video.emotion}
                            </div>
                          </div>
                        </div>
                        <div className="p-6">
                          <h4 className="font-black text-gray-800 mb-2 text-lg">
                            {video.title}
                          </h4>
                          <p className="text-gray-600">{video.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contato"
        className="py-24 bg-gradient-to-b from-orange-50/50 via-rose-50/50 to-amber-50/50 relative"
      >
        {/* Imagem de fundo cobrindo toda a seção */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/alessoncapa.jpg"
            alt="Alesson Background"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center center" }}
          />
          {/* Degradê principal ultra suave - eliminando completamente qualquer linha */}
          <div className="absolute inset-0 bg-gradient-to-b from-orange-50/70 via-orange-50/50 via-orange-50/30 via-orange-50/20 via-orange-50/15 to-orange-50/10"></div>
          {/* Degradê lateral para eliminar bordas */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-50/40 via-orange-50/10 via-transparent via-orange-50/10 to-orange-50/40"></div>
          {/* Overlay com transição muito gradual */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/25 via-orange-50/10 via-transparent to-rose-50/15 mix-blend-overlay"></div>
          {/* Camada extra de transição no centro */}
          <div className="absolute inset-0 bg-gradient-to-t from-orange-50/20 via-transparent to-orange-50/20"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center bg-gradient-to-r from-orange-500/20 to-rose-500/20 rounded-full px-8 py-4 backdrop-blur-lg border border-white/30 mb-8">
              <Zap className="text-orange-500 mr-3" size={24} />
              <span className="text-gray-700 font-bold text-lg">
                Vamos Trabalhar Juntos
              </span>
            </div>

            <h2 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
              PARCERIAS
            </h2>

            <p className="text-2xl text-gray-600 mb-16 leading-relaxed">
              Interessado em parcerias, colaborações ou publicidade? Vamos criar
              algo épico juntos!
            </p>

            {/* Seção de Depoimentos de Blogueiros */}
            <div className="mb-20">
              <h3 className="text-4xl font-black text-center mb-12 bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent drop-shadow-sm">
                O Que Dizem Sobre Mim
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Depoimento 1 */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-rose-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-300"></div>
                  <div className="relative bg-white/40 backdrop-blur-2xl border border-white/30 rounded-3xl p-8 hover:transform hover:scale-105 transition-all duration-300 shadow-2xl">
                    <div className="flex items-start space-x-4">
                        {/* Foto do blogueiro */}
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-rose-400 rounded-full flex items-center justify-center shadow-lg flex-shrink-0 overflow-hidden">
                        <img
                          src="/guitube1.jpg"
                          alt="Guitube"
                          className="w-full h-full object-cover"
                        />
                        </div>
                      
                      <div className="flex-1">
                        <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 relative">
                          {/* Bubble arrow */}
                          <div className="absolute left-0 top-6 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-white/60 -translate-x-2"></div>
                          
                          <p className="text-gray-700 font-medium mb-4 leading-relaxed">
"Meu povo, o que falar de Alesson? Ele simplesmente entrega TUDO! Carisma, verdade, estilo e ainda representa com orgulho nossas raízes. Quem trabalha com ele sabe: é profissionalismo com close certo! Sucesso sempre, bicho!"                          </p>
                          
                          <div className="flex items-center">
                            <div>
                              <div className="font-bold text-gray-800">@Guitube</div>
                              <div className="text-orange-500 text-sm font-semibold">Blogueiro Baiano</div>
                            </div>
                            <div className="ml-auto flex space-x-1">
                              <span className="text-red-500">❤️</span>
                              <span className="text-orange-500">🔥</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Depoimento 2 */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-orange-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-300"></div>
                  <div className="relative bg-white/40 backdrop-blur-2xl border border-white/30 rounded-3xl p-8 hover:transform hover:scale-105 transition-all duration-300 shadow-2xl">
                    <div className="flex items-start space-x-4 flex-row-reverse">
                        {/* Foto do blogueiro */}
                        <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg flex-shrink-0 overflow-hidden">
                        <img
                          src="/sheuba1.png"
                          alt="Sheuba"
                          className="w-full h-full object-cover"
                        />
                        </div>
                      
                      <div className="flex-1">
                        <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 relative">
                          {/* Bubble arrow (direita) */}
                          <div className="absolute right-0 top-6 w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-white/60 translate-x-2"></div>
                          
                          <p className="text-gray-700 font-medium mb-4 leading-relaxed">
"Alesson, pelo amor de Deus, me dá um pouco dessa energia aí! Enquanto ele tá lindo, gravando, influenciando e entregando tudo, eu tô aqui lutando com o frizz e stalkeando a perua que faz o triplo e ainda sorri. Como é que podeeeeeeeeeeee, gente?!"                          </p>
                          
                          <div className="flex items-center">
                            <div>
                              <div className="font-bold text-gray-800">@Sheuba</div>
                              <div className="text-orange-500 text-sm font-semibold">Blogueira Baiana</div>
                            </div>
                            <div className="ml-auto flex space-x-1">
                              <span className="text-red-500">❤️</span>
                              <span className="text-orange-500">👑</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-rose-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-300"></div>
                <div className="relative bg-white/40 backdrop-blur-2xl border border-white/30 rounded-3xl p-10 hover:transform hover:scale-105 transition-all duration-300 shadow-2xl">
                  <h3 className="text-3xl font-black mb-6 bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
                    Parcerias Comerciais
                  </h3>
                  <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                    Trabalho com marcas que se alinham com meus valores e com
                    minha audiência engajada
                  </p>
                  <button className="w-full bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl">
                    Propor Parceria
                  </button>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-amber-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-300"></div>
                <div className="relative bg-white/40 backdrop-blur-2xl border border-white/30 rounded-3xl p-10 hover:transform hover:scale-105 transition-all duration-300 shadow-2xl">
                  <h3 className="text-3xl font-black mb-6 bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent">
                    Contato Geral
                  </h3>
                  <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                    Para outras oportunidades, dúvidas ou apenas para trocar uma
                    ideia
                  </p>
                  <button className="w-full bg-white/30 backdrop-blur-lg border border-white/40 text-gray-700 hover:text-orange-500 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl">
                    Enviar Mensagem
                  </button>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-rose-500/10 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white/40 backdrop-blur-2xl border border-white/30 rounded-3xl p-12 text-center shadow-2xl">
                <div className="text-2xl font-bold text-gray-600 mb-4">
                  📍 Salvador, Bahia - Brasil
                </div>
                <div className="text-xl text-gray-600 mb-6">
                  ✉️ alessoncontato@hotmail.com
                </div>
                <div className="text-lg text-gray-500">
                  Resposta em até 24h para parcerias comerciais
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🎨 MOODBOARD DO ESTILO ALESSON - FEATURE ROCKSTAR! */}
      <section 
        id="moodboard" 
        className={`py-24 relative overflow-hidden transition-all duration-1000 ${
          alessonMode ? 'bg-gradient-to-br from-orange-600 via-rose-600 to-purple-700' : 'bg-gradient-to-br from-orange-500/20 via-rose-500/20 to-amber-500/20'
        }`}
      >
        {/* Fundo animado rockstar */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className={`absolute inset-0 opacity-30 transition-all duration-1000 ${
              alessonMode ? 'bg-gradient-to-r from-orange-500/20 to-rose-500/20' : 'bg-gradient-to-r from-orange-500/10 to-rose-500/10'
            }`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff6b35' fill-opacity='0.1'%3E%3Ccircle cx='9' cy='9' r='4'/%3E%3Cpath d='m35 19h20v20h-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              animation: alessonMode ? 'float 4s ease-in-out infinite' : 'float 8s ease-in-out infinite'
            }}
          />
        </div>

        {/* 🎉 EFEITOS ANIMADOS ÉPICOS DO ALESSON MODE */}
        {alessonMode && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Sóis baianos flutuantes */}
            <div className="absolute top-10 left-10 text-6xl animate-spin-slow opacity-80" style={{ animation: 'bahia-float 8s ease-in-out infinite', animationDelay: '0s' }}>☀️</div>
            <div className="absolute top-32 right-20 text-5xl animate-spin-slow opacity-70" style={{ animation: 'bahia-float 10s ease-in-out infinite', animationDelay: '2s' }}>🌞</div>
            <div className="absolute bottom-40 left-32 text-4xl animate-spin-slow opacity-75" style={{ animation: 'bahia-float 12s ease-in-out infinite', animationDelay: '4s' }}>☀️</div>
            
            {/* Fogos e energia */}
            <div className="absolute top-1/4 right-1/4 text-5xl opacity-80" style={{ animation: 'fire-dance 6s ease-in-out infinite', animationDelay: '1s' }}>🔥</div>
            <div className="absolute bottom-1/3 right-1/3 text-4xl opacity-70" style={{ animation: 'fire-dance 8s ease-in-out infinite', animationDelay: '3s' }}>🔥</div>
            <div className="absolute top-2/3 left-1/4 text-6xl opacity-75" style={{ animation: 'fire-dance 7s ease-in-out infinite', animationDelay: '5s' }}>🔥</div>
            
            {/* Festa e celebração */}
            <div className="absolute top-16 left-1/2 text-5xl opacity-80" style={{ animation: 'party-bounce 4s ease-in-out infinite', animationDelay: '0.5s' }}>🎉</div>
            <div className="absolute bottom-20 left-16 text-4xl opacity-70" style={{ animation: 'party-bounce 6s ease-in-out infinite', animationDelay: '2.5s' }}>🎊</div>
            <div className="absolute top-1/2 right-16 text-6xl opacity-75" style={{ animation: 'party-bounce 5s ease-in-out infinite', animationDelay: '4.5s' }}>🎈</div>
            
            {/* Elementos baianos */}
            <div className="absolute bottom-32 right-32 text-5xl opacity-80" style={{ animation: 'bahia-sway 10s ease-in-out infinite', animationDelay: '1.5s' }}>🌴</div>
            <div className="absolute top-40 left-1/3 text-4xl opacity-70" style={{ animation: 'bahia-sway 8s ease-in-out infinite', animationDelay: '3.5s' }}>🥥</div>
            <div className="absolute bottom-1/4 left-1/2 text-5xl opacity-75" style={{ animation: 'bahia-sway 12s ease-in-out infinite', animationDelay: '6s' }}>🏖️</div>
            
            {/* Estrelas e brilhos */}
            <div className="absolute top-20 right-1/3 text-4xl opacity-60" style={{ animation: 'sparkle-twinkle 3s ease-in-out infinite', animationDelay: '0s' }}>✨</div>
            <div className="absolute bottom-16 left-1/4 text-3xl opacity-70" style={{ animation: 'sparkle-twinkle 4s ease-in-out infinite', animationDelay: '1s' }}>⭐</div>
            <div className="absolute top-1/3 left-16 text-5xl opacity-65" style={{ animation: 'sparkle-twinkle 5s ease-in-out infinite', animationDelay: '2s' }}>💫</div>
            <div className="absolute bottom-1/2 right-20 text-4xl opacity-75" style={{ animation: 'sparkle-twinkle 3.5s ease-in-out infinite', animationDelay: '3s' }}>✨</div>
            
            {/* Música e ritmo */}
            <div className="absolute top-1/2 left-1/3 text-5xl opacity-80" style={{ animation: 'music-pulse 2s ease-in-out infinite', animationDelay: '0s' }}>🎵</div>
            <div className="absolute bottom-40 right-1/4 text-4xl opacity-70" style={{ animation: 'music-pulse 3s ease-in-out infinite', animationDelay: '1s' }}>🎶</div>
            <div className="absolute top-3/4 right-1/2 text-6xl opacity-75" style={{ animation: 'music-pulse 2.5s ease-in-out infinite', animationDelay: '1.5s' }}>🎤</div>
            
            {/* Efeitos de energia radiante */}
            <div className="absolute top-1/4 left-1/2 w-32 h-32 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-xl opacity-60" style={{ animation: 'energy-pulse 4s ease-in-out infinite', animationDelay: '0s' }}></div>
            <div className="absolute bottom-1/3 right-1/2 w-24 h-24 bg-gradient-to-r from-rose-400/20 to-purple-500/20 rounded-full blur-xl opacity-50" style={{ animation: 'energy-pulse 6s ease-in-out infinite', animationDelay: '2s' }}></div>
            <div className="absolute top-2/3 left-1/5 w-20 h-20 bg-gradient-to-r from-orange-400/20 to-red-500/20 rounded-full blur-xl opacity-70" style={{ animation: 'energy-pulse 5s ease-in-out infinite', animationDelay: '4s' }}></div>
          </div>
        )}

        <div className="container mx-auto px-6 relative z-10">
          {/* Header da seção */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-orange-500/20 to-rose-500/20 rounded-full px-8 py-4 backdrop-blur-lg border border-white/30 mb-8">
              <Sparkles className="text-orange-500 mr-3" size={24} />
              <span className={`font-bold text-lg ${alessonMode ? 'text-white' : 'text-gray-700'}`}>Meu Estilo</span>
            </div>
            
            <h2 className={`text-6xl md:text-7xl font-black mb-6 transition-all duration-1000 ${
              alessonMode 
                ? 'bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent' 
                : 'bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent'
            }`}>
              BAHIA CHIC
            </h2>
            
            <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
              alessonMode ? 'text-gray-200' : 'text-gray-600'
            }`}>
              Descubra as cores, texturas e vibes que definem meu estilo único 🎨✨
            </p>
          </div>

          {/* Carrossel Moodboard ROCKSTAR */}
          <div className="relative max-w-6xl mx-auto">
            {/* Container do slide principal */}
            <div className="relative h-[650px] rounded-3xl overflow-hidden shadow-2xl group">
              {/* Slide atual */}
              <div 
                className={`absolute inset-0 transition-all duration-600 ease-in-out cursor-pointer ${
                  isCarouselTransitioning ? 'scale-110 rotate-1' : 'scale-100 rotate-0'
                } group-hover:scale-105`}
                style={{
                  backgroundImage: `url(${moodboardSlides[currentMoodboardSlide].image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                }}
                onClick={() => setSelectedImageModal(moodboardSlides[currentMoodboardSlide])}
              >
                {/* Overlay gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Indicador de clique - aparece no hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                  <div className="bg-white/20 backdrop-blur-lg rounded-full p-6 transform group-hover:scale-110 transition-transform duration-300 border-2 border-white/30">
                    <div className="text-white text-2xl animate-pulse">🔍</div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-20">
                    <div className="bg-black/50 backdrop-blur-lg rounded-full px-4 py-2 text-white text-sm font-semibold">
                      Clique para ver completa
                    </div>
                  </div>
                </div>
                
                {/* Conteúdo do slide */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="max-w-3xl">
                    <h3 className="text-5xl font-black mb-4 text-white">
                      {moodboardSlides[currentMoodboardSlide].title}
                    </h3>
                    <p className="text-xl text-orange-300 font-semibold mb-4">
                      {moodboardSlides[currentMoodboardSlide].subtitle}
                    </p>
                    <p className="text-lg text-gray-200 mb-6">
                      {moodboardSlides[currentMoodboardSlide].description}
                    </p>
                    
                    {/* Paleta de cores */}
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="text-white font-semibold">Paleta:</span>
                      <div className="flex space-x-2">
                        {moodboardSlides[currentMoodboardSlide].colors.map((color, index) => (
                          <div
                            key={index}
                            className="w-8 h-8 rounded-full border-2 border-white shadow-lg transform hover:scale-110 transition-transform"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Tag do estilo */}
                    <span className="inline-block bg-gradient-to-r from-orange-500 to-rose-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                      {moodboardSlides[currentMoodboardSlide].style}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Controles do carrossel */}
            <button
              onClick={prevMoodboardSlide}
              disabled={isCarouselTransitioning}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full backdrop-blur-lg border border-white/20 transition-all duration-300 hover:scale-110 disabled:opacity-50"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button
              onClick={nextMoodboardSlide}
              disabled={isCarouselTransitioning}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full backdrop-blur-lg border border-white/20 transition-all duration-300 hover:scale-110 disabled:opacity-50"
            >
              <ChevronRight size={24} />
            </button>

            {/* Indicadores */}
            <div className="flex justify-center space-x-3 mt-8">
              {moodboardSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToMoodboardSlide(index)}
                  disabled={isCarouselTransitioning}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentMoodboardSlide
                      ? 'bg-gradient-to-r from-orange-500 to-rose-500 scale-125'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            {/* Thumbnails das próximas imagens */}
            <div className="flex justify-center space-x-4 mt-12">
              {moodboardSlides.map((slide, index) => {
                if (index === currentMoodboardSlide) return null;
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedImageModal(slide)}
                    disabled={isCarouselTransitioning}
                    className="group relative w-20 h-20 rounded-xl overflow-hidden border-2 border-white/20 hover:border-orange-500/50 transition-all duration-300 hover:scale-110"
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
                    
                    {/* Indicador de clique nos thumbnails */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                      <div className="text-white text-sm">🔍</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* �️ MODAL ÉPICO PARA IMAGEM COMPLETA */}
      {selectedImageModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg"
          style={{ animation: 'modal-fade-in 0.3s ease-out forwards' }}
          onClick={() => setSelectedImageModal(null)}
        >
          {/* Container do modal */}
          <div 
            className="relative max-w-6xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl transform"
            style={{ animation: 'modal-scale-in 0.4s ease-out forwards' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Imagem principal */}
            <div className="relative">
              <img
                src={selectedImageModal.image}
                alt={selectedImageModal.title}
                className="w-full h-auto object-contain max-h-[80vh]"
                style={{ animation: 'image-reveal 0.6s ease-out forwards' }}
              />
              
              {/* Overlay com informações */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-8 text-white">
                <div className="max-w-4xl">
                  <h3 className="text-4xl font-black mb-3 text-white">
                    {selectedImageModal.title}
                  </h3>
                  <p className="text-xl text-orange-300 font-semibold mb-3">
                    {selectedImageModal.subtitle}
                  </p>
                  <p className="text-lg text-gray-200 mb-4">
                    {selectedImageModal.description}
                  </p>
                  
                  {/* Paleta de cores */}
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-white font-semibold">Paleta:</span>
                    <div className="flex space-x-2">
                      {selectedImageModal.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-6 h-6 rounded-full border-2 border-white shadow-lg transform hover:scale-125 transition-transform"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Tag do estilo */}
                  <span className="inline-block bg-gradient-to-r from-orange-500 to-rose-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                    {selectedImageModal.style}
                  </span>
                </div>
              </div>
            </div>

            {/* Botão fechar estiloso */}
            <button
              onClick={() => setSelectedImageModal(null)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-lg border border-white/20 transition-all duration-300 hover:scale-110 group"
            >
              <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Efeitos de borda animados */}
            <div className="absolute inset-0 rounded-3xl border-2 border-orange-500/30 pointer-events-none"
                 style={{ animation: 'border-glow 2s ease-in-out infinite alternate' }}></div>
          </div>
        </div>
      )}

      {/* �🗺️ MAPA INTERATIVO DA BAHIA - FEATURE ROCKSTAR! */}
      <section 
        id="mapa-bahia" 
        className={`py-24 relative overflow-hidden transition-all duration-1000 ${
          alessonMode ? 'bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600' : 'bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50'
        }`}
      >
        {/* Emojis de fundo estilo WhatsApp */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-10 left-10 text-6xl animate-bounce" style={{ animationDelay: '0s' }}>🌴</div>
          <div className="absolute top-20 right-20 text-5xl animate-bounce" style={{ animationDelay: '0.5s' }}>🔥</div>
          <div className="absolute bottom-32 left-16 text-7xl animate-bounce" style={{ animationDelay: '1s' }}>🏙️</div>
          <div className="absolute top-1/3 left-1/3 text-4xl animate-bounce" style={{ animationDelay: '1.5s' }}>🌴</div>
          <div className="absolute bottom-20 right-32 text-6xl animate-bounce" style={{ animationDelay: '2s' }}>🔥</div>
          <div className="absolute top-1/2 right-1/4 text-5xl animate-bounce" style={{ animationDelay: '2.5s' }}>🏙️</div>
          <div className="absolute bottom-1/3 left-1/2 text-4xl animate-bounce" style={{ animationDelay: '3s' }}>🌴</div>
          <div className="absolute top-16 left-1/2 text-5xl animate-bounce" style={{ animationDelay: '3.5s' }}>🔥</div>
          <div className="absolute bottom-16 right-16 text-6xl animate-bounce" style={{ animationDelay: '4s' }}>🏙️</div>
        </div>
        <div className="container mx-auto px-6">
          {/* Header da seção */}
          <div className="text-center mb-16 relative z-10">
            <div className="inline-flex items-center bg-gradient-to-r from-orange-500/20 to-rose-500/20 rounded-full px-8 py-4 backdrop-blur-lg border border-white/30 mb-8">
              <div className="relative mr-3">
                {/* Ícone de mapa mais elaborado */}
                <div className="relative w-8 h-8 bg-gradient-to-br from-orange-500 to-rose-500 rounded-lg flex items-center justify-center shadow-lg">
                  <svg 
                    className="w-5 h-5 text-white" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  {/* Efeito de brilho */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 rounded-lg"></div>
                  {/* Pulso animado */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-orange-500/50 to-rose-500/50 rounded-lg blur-sm animate-pulse"></div>
                </div>
                {/* Mini badge */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <span className={`font-bold text-lg ${alessonMode ? 'text-white' : 'text-gray-700'}`}>Meus Rolês</span>
            </div>
            
            <h2 className={`text-6xl md:text-7xl font-black mb-6 transition-all duration-1000 ${
              alessonMode 
                ? 'bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent' 
                : 'bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent'
            }`}>
              SALVADOR
            </h2>
            
            <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
              alessonMode ? 'text-gray-200' : 'text-gray-600'
            }`}>
              Conheça os lugares icônicos de Salvador que já visitei e compartilhei com vocês! 🏖️✨
            </p>
          </div>

          {/* Container do mapa */}
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="relative bg-gradient-to-br from-orange-100/80 to-rose-100/80 rounded-3xl p-8 shadow-2xl backdrop-blur-lg border border-white/30">
              {/* Mapa interativo do Google Maps com marcadores */}
              <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-xl">
                <iframe
                  src="https://www.google.com/maps/embed/v1/search?key=AIzaSyCXlnYAEgr2kdEgSfE3nf2TpOUK90Aa4Xk&q=Pelourinho+Salvador+BA|Farol+da+Barra+Salvador+BA|Elevador+Lacerda+Salvador+BA|Rio+Vermelho+Salvador+BA&center=-12.9714,-38.5014&zoom=12"
                  width="100%"
                  height="100%"
                  style={{ 
                    border: 0, 
                    filter: alessonMode ? 'hue-rotate(30deg) saturate(1.2) contrast(1.1)' : 'none' 
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-2xl"
                />
                
                {/* Overlay decorativo quando Alesson Mode ativo */}
                {alessonMode && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-rose-500/10 rounded-2xl"></div>
                    <div className="absolute inset-0 rounded-2xl border-2 border-orange-500/30 animate-pulse"></div>
                    
                    {/* Efeitos extras no Alesson Mode */}
                    <div className="absolute top-2 right-2 text-2xl animate-bounce" style={{animationDelay: '0s'}}>🎸</div>
                    <div className="absolute bottom-2 left-2 text-xl animate-bounce" style={{animationDelay: '1s'}}>🔥</div>
                  </div>
                )}

                {/* Label Salvador personalizado */}
                <div className="absolute top-4 left-4 bg-black/80 text-white px-4 py-2 rounded-lg backdrop-blur-lg border border-white/20 shadow-xl">
                  <div className="font-bold text-lg">🎸 Rolês do Alesson</div>
                  <div className="text-sm text-orange-300">Salvador - BA 🌴</div>
                </div>

                {/* Tooltip interativo */}
                <div className="absolute top-4 right-4 bg-orange-500/90 text-white px-3 py-2 rounded-lg text-sm backdrop-blur-lg border border-white/20 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <span>📍</span>
                    <span>4 locais visitados</span>
                  </div>
                </div>

                {/* Botão para abrir no Google Maps */}
                <div className="absolute bottom-4 right-4">
                  <a
                    href="https://www.google.com/maps/place/Salvador,+BA/@-12.9714,-38.5014,12z"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg backdrop-blur-lg flex items-center space-x-2"
                  >
                    <span>🗺️</span>
                    <span>Ver Completo</span>
                  </a>
                </div>
              </div>

              {/* Lista dos locais visitados */}
              <div className="mt-8 grid md:grid-cols-2 gap-4">
                {bahiaLocations.map((location) => (
                  <div
                    key={location.id}
                    className={`relative p-4 rounded-xl transition-all duration-300 cursor-pointer group ${
                      alessonMode 
                        ? 'bg-white/20 border border-white/30 hover:bg-white/30' 
                        : 'bg-white/50 hover:bg-white/70'
                    } hover:scale-105 hover:shadow-xl`}
                    onMouseEnter={() => setHoveredLocationId(location.id)}
                    onMouseLeave={() => setHoveredLocationId(null)}
                    onClick={() => {
                      // Abrir localização específica no Google Maps
                      const query = encodeURIComponent(`${location.name}, Salvador, BA, Brazil`);
                      window.open(`https://www.google.com/maps/search/${query}`, '_blank');
                    }}
                  >
                    <div className="flex items-center space-x-3 relative z-10">
                      <div className="relative">
                        {/* Emoji com efeito mais elaborado */}
                        <div className="relative text-3xl group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">
                          {location.emoji}
                        </div>
                        {/* Efeito de brilho no hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-rose-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-150"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <div className={`font-bold text-lg ${alessonMode ? 'text-white' : 'text-gray-800'}`}>{location.name}</div>
                          {location.visited && (
                            <div className="relative">
                              <span className="text-green-500 text-xl animate-pulse">✓</span>
                              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-md animate-pulse"></div>
                            </div>
                          )}
                        </div>
                        <div className={`text-sm ${alessonMode ? 'text-gray-300' : 'text-gray-600'}`}>{location.description}</div>
                        <div className={`text-xs mt-1 opacity-70 ${alessonMode ? 'text-gray-400' : 'text-gray-500'} group-hover:opacity-100 transition-opacity duration-300`}>
                          <span className="inline-flex items-center space-x-1">
                            <span>🗺️</span>
                            <span>Clique para ver no Google Maps</span>
                            <span className="animate-bounce">→</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tooltip melhorado com informações da visita */}
                    {location.visitInfo && hoveredLocationId === location.id && (
                      <div 
                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-96 p-5 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-2xl shadow-2xl z-50 pointer-events-none border border-orange-500/30"
                        style={{
                          animation: 'tooltip-appear 0.3s ease-out forwards, location-glow 2s ease-in-out infinite'
                        }}
                      >
                        {/* Header do tooltip */}
                        <div className="text-center mb-4">
                          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-rose-500 px-4 py-2 rounded-full mb-2">
                            <span className="text-lg">🎬</span>
                            <span className="font-bold text-sm">Visita do Alesson</span>
                          </div>
                        </div>
                        
                        {/* Conteúdo organizado */}
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="bg-blue-500/20 p-2 rounded-lg">
                              <span className="text-blue-300 font-semibold">📅 Data</span>
                              <div className="text-white">{location.visitInfo.date}</div>
                            </div>
                            <div className="bg-purple-500/20 p-2 rounded-lg">
                              <span className="text-purple-300 font-semibold">⏱️ Duração</span>
                              <div className="text-white">{location.visitInfo.duration}</div>
                            </div>
                          </div>
                          
                          <div className="bg-green-500/20 p-3 rounded-lg">
                            <span className="text-green-300 font-semibold text-sm">🎯 Atividade</span>
                            <div className="text-white text-sm mt-1">{location.visitInfo.activity}</div>
                          </div>
                          
                          <div className="bg-yellow-500/20 p-3 rounded-lg">
                            <span className="text-yellow-300 font-semibold text-sm">✨ Destaque</span>
                            <div className="text-white text-sm mt-1 italic">"{location.visitInfo.highlight}"</div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="bg-pink-500/20 p-2 rounded-lg">
                              <span className="text-pink-300 font-semibold">📸 Fotos</span>
                              <div className="text-white">{location.visitInfo.photos}</div>
                            </div>
                            <div className="bg-cyan-500/20 p-2 rounded-lg">
                              <span className="text-cyan-300 font-semibold">👥 Galera</span>
                              <div className="text-white text-xs">{location.visitInfo.companions.join(", ")}</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Seta do tooltip melhorada */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                          <div className="w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-gray-900"></div>
                        </div>
                        
                        {/* Efeito de borda animada */}
                        <div className="absolute inset-0 rounded-2xl border-2 border-orange-500/50 animate-pulse pointer-events-none"></div>
                      </div>
                    )}
                    
                    {/* Efeito hover corrigido */}
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-rose-500/0 group-hover:from-orange-500/10 group-hover:to-rose-500/10 rounded-xl transition-all duration-300 pointer-events-none"></div>
                    
                    {/* Efeito de shimmer no hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/0 to-transparent group-hover:via-white/10 rounded-xl transition-all duration-500 pointer-events-none transform translate-x-[-100%] group-hover:translate-x-[100%]"></div>
                  </div>
                ))}
              </div>

              {/* Estatísticas de Salvador */}
              <div className="mt-8 pt-6 border-t border-white/30">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className={`text-2xl font-black ${
                      alessonMode ? 'text-yellow-300' : 'text-orange-500'
                    }`}>
                      2.9M
                    </div>
                    <div className={`text-sm ${
                      alessonMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      Habitantes
                    </div>
                  </div>
                  <div>
                    <div className={`text-2xl font-black ${
                      alessonMode ? 'text-yellow-300' : 'text-orange-500'
                    }`}>
                      474
                    </div>
                    <div className={`text-sm ${
                      alessonMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      Anos de História
                    </div>
                  </div>
                  <div>
                    <div className={`text-2xl font-black ${
                      alessonMode ? 'text-yellow-300' : 'text-orange-500'
                    }`}>
                      ∞
                    </div>
                    <div className={`text-sm ${
                      alessonMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      Axé Baiano
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🎭 ALESSON MODE BUTTON - FEATURE MAIS ROCKSTAR! */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-4xl font-black text-white mb-6">
              Pronto para a experiência completa?
            </h3>
            
            <p className="text-xl text-gray-300 mb-12">
              Ative o <strong className="text-orange-500">Alesson Mode</strong> e sinta a vibe baiana com direito a pagodão e efeitos rockstar!
            </p>

            {/* BOTÃO ALESSON MODE ÉPICO */}
            <button
              onClick={toggleAlessonMode}
              className={`group relative px-12 py-6 text-2xl font-black rounded-2xl transition-all duration-500 transform hover:scale-110 ${
                alessonMode
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 shadow-2xl'
                  : 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-xl hover:shadow-2xl'
              }`}
            >
              {/* Efeito de brilho */}
              <div className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
                alessonMode 
                  ? 'bg-gradient-to-r from-yellow-300/50 to-orange-400/50 blur-xl' 
                  : 'bg-gradient-to-r from-orange-500/30 to-rose-500/30 blur-lg group-hover:blur-xl'
              }`} />
              
              {/* Conteúdo do botão */}
              <span className="relative z-10 flex items-center justify-center space-x-3">
                {alessonMode ? (
                  <>
                    <span className="text-3xl animate-spin">🔥</span>
                    <span>ALESSON MODE: ON!</span>
                    <span className="text-3xl animate-bounce">⚡</span>
                  </>
                ) : (
                  <>
                    <span className="text-3xl">🎭</span>
                    <span>ATIVAR ALESSON MODE</span>
                    <span className="text-3xl group-hover:animate-pulse">🚀</span>
                  </>
                )}
              </span>
              
              {/* Partículas quando ativo */}
              {alessonMode && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-ping"
                      style={{
                        left: `${20 + i * 10}%`,
                        top: `${10 + (i % 3) * 30}%`,
                        animationDelay: `${i * 0.2}s`,
                        animationDuration: '1s'
                      }}
                    />
                  ))}
                </div>
              )}
            </button>

            {/* Status do mode */}
            {alessonMode && (
              <div className="mt-8 animate-bounce">
                <div className="text-6xl mb-4">🎉</div>
                <div className="text-2xl font-bold text-yellow-400">
                  {rockstarMessages[Math.floor(Math.random() * rockstarMessages.length)]}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Audio para o Alesson Mode */}
      <audio
        ref={audioRef}
        src="/bloquinho3.mp3"
        loop
        preload="metadata"
        className="hidden"
      />

      {/* Epic Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="text-5xl font-black bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent mb-8 md:mb-0">
              ALESSON
            </div>

            <div className="flex space-x-8">
              <button className="group relative p-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl hover:transform hover:scale-110 transition-all duration-300">
                <Instagram
                  className="text-white group-hover:text-pink-400 transition-colors"
                  size={32}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button className="group relative p-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl hover:transform hover:scale-110 transition-all duration-300">
                <Music
                  className="text-white group-hover:text-purple-400 transition-colors"
                  size={32}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          <div className="text-center text-gray-400 pt-8 border-t border-gray-700">
            <p className="text-lg">
              &copy; 2025 Alesson. Todos os direitos reservados. Made with ❤️
              in Salvador, BA
            </p>
          </div>
        </div>

        {modalOpen && selectedVideo && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-lg flex items-center justify-center z-50 rockstar-modal-backdrop">
            <div className="relative bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-2xl rounded-3xl p-8 max-w-5xl w-full mx-4 max-h-[90vh] overflow-auto border border-white/30 shadow-2xl rockstar-modal-container">
              {/* Efeito de brilho com animação */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-rose-500/10 rounded-3xl blur-xl rockstar-modal-glow"></div>

              {/* Botão de fechar rockstar com animação */}
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 text-gray-500 hover:text-orange-500 text-3xl z-10 transition-all duration-300 hover:scale-110 hover:rotate-90 rockstar-modal-close"
              >
                ✕
              </button>

              {/* Conteúdo do modal */}
              <div className="relative space-y-6">
                <div className="text-center rockstar-modal-title">
                  <h2 className="text-4xl font-black bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent mb-2">
                    {selectedVideo.title}
                  </h2>
                  <p className="text-orange-500 font-semibold text-lg">
                    {selectedVideo.emotion}
                  </p>
                </div>

                {/* Player de vídeo com animação */}
                <div className="relative rockstar-modal-video">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-rose-500/20 rounded-2xl blur-xl"></div>
                  <div className="relative bg-black/20 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
                    <video
                      controls
                      autoPlay
                      className="w-full h-auto rounded-xl shadow-2xl"
                      src={selectedVideo.src}
                    >
                      Seu navegador não suporta o elemento de vídeo.
                    </video>
                  </div>
                </div>

                <div className="text-center rockstar-modal-description">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {selectedVideo.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </footer>

      {/* CSS Animations */}
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        /* Animações de entrada do modal - Efeito Rockstar Games */
        @keyframes rockstar-modal-entrance {
          0% {
            opacity: 0;
            transform: scale(0.3) rotate(-10deg) translateY(100px);
            filter: blur(20px);
          }
          30% {
            opacity: 0.3;
            transform: scale(0.7) rotate(-5deg) translateY(30px);
            filter: blur(10px);
          }
          60% {
            opacity: 0.7;
            transform: scale(1.1) rotate(2deg) translateY(-10px);
            filter: blur(3px);
          }
          80% {
            opacity: 0.9;
            transform: scale(0.98) rotate(-1deg) translateY(5px);
            filter: blur(1px);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg) translateY(0px);
            filter: blur(0px);
          }
        }

        @keyframes rockstar-backdrop-entrance {
          0% {
            opacity: 0;
            backdrop-filter: blur(0px);
          }
          100% {
            opacity: 1;
            backdrop-filter: blur(12px);
          }
        }

        @keyframes neon-pulse {
          0% {
            boxShadow: 
              0 0 0 2px transparent,
              0 0 0 4px rgba(255, 107, 53, 0.1),
              0 0 5px rgba(255, 107, 53, 0.2),
              0 0 10px rgba(255, 107, 53, 0.1),
              0 0 20px rgba(255, 107, 53, 0.05);
            border-color: rgba(255, 107, 53, 0.3);
          }
          15% {
            boxShadow: 
              0 0 0 2px transparent,
              0 0 0 4px rgba(255, 107, 53, 0.8),
              0 0 15px rgba(255, 107, 53, 0.9),
              0 0 30px rgba(255, 107, 53, 0.7),
              0 0 60px rgba(255, 107, 53, 0.4);
            border-color: rgba(255, 107, 53, 1);
          }
          25% {
            boxShadow: 
              0 0 0 2px transparent,
              0 0 0 4px rgba(255, 107, 53, 0.2),
              0 0 8px rgba(255, 107, 53, 0.3),
              0 0 15px rgba(255, 107, 53, 0.2),
              0 0 30px rgba(255, 107, 53, 0.1);
            border-color: rgba(255, 107, 53, 0.4);
          }
          35% {
            boxShadow: 
              0 0 0 2px transparent,
              0 0 0 4px rgba(255, 107, 53, 0.9),
              0 0 20px rgba(255, 107, 53, 1),
              0 0 40px rgba(255, 107, 53, 0.8),
              0 0 80px rgba(255, 107, 53, 0.5);
            border-color: rgba(255, 107, 53, 1);
          }
          50% {
            boxShadow: 
              0 0 0 2px transparent,
              0 0 0 4px rgba(255, 107, 53, 0.6),
              0 0 12px rgba(255, 107, 53, 0.7),
              0 0 25px rgba(255, 107, 53, 0.5),
              0 0 50px rgba(255, 107, 53, 0.3);
            border-color: rgba(255, 107, 53, 0.8);
          }
          100% {
            boxShadow: 
              0 0 0 2px transparent,
              0 0 0 4px rgba(255, 107, 53, 0.3),
              0 0 10px rgba(255, 107, 53, 0.5),
              0 0 20px rgba(255, 107, 53, 0.3),
              0 0 40px rgba(255, 107, 53, 0.1);
            border-color: rgba(255, 107, 53, 0.6);
          }
        }

        @keyframes neon-flicker {
          0% { opacity: 1; }
          2% { opacity: 0.1; }
          4% { opacity: 1; }
          8% { opacity: 0.3; }
          10% { opacity: 1; }
          12% { opacity: 0.2; }
          14% { opacity: 1; }
          94% { opacity: 1; }
          96% { opacity: 0.4; }
          98% { opacity: 1; }
          100% { opacity: 1; }
        }

        @keyframes neon-runner {
          0% {
            backgroundPosition: -200% 0, 100% -200%, 200% 100%, 0 200%;
          }
          25% {
            backgroundPosition: 0% 0, 100% -200%, 200% 100%, 0 200%;
          }
          50% {
            backgroundPosition: 200% 0, 100% 0%, 200% 100%, 0 200%;
          }
          75% {
            backgroundPosition: 200% 0, 100% 200%, 0% 100%, 0 200%;
          }
          100% {
            backgroundPosition: 200% 0, 100% 200%, -200% 100%, 0 0%;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes rockstar-modal-glow-entrance {
          0% {
            opacity: 0;
            transform: scale(0.5);
            filter: blur(30px);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.2);
            filter: blur(15px);
          }
          100% {
            opacity: 0.6;
            transform: scale(1);
            filter: blur(24px);
          }
        }

        @keyframes rockstar-title-entrance {
          0% {
            opacity: 0;
            transform: translateY(-50px) scale(0.8);
            filter: blur(10px);
          }
          40% {
            opacity: 0;
            transform: translateY(-30px) scale(0.8);
            filter: blur(8px);
          }
          70% {
            opacity: 0.7;
            transform: translateY(10px) scale(1.1);
            filter: blur(2px);
          }
          100% {
            opacity: 1;
            transform: translateY(0px) scale(1);
            filter: blur(0px);
          }
        }

        @keyframes rockstar-video-entrance {
          0% {
            opacity: 0;
            transform: scale(0.7) rotateY(-15deg);
            filter: blur(15px);
          }
          30% {
            opacity: 0;
            transform: scale(0.7) rotateY(-10deg);
            filter: blur(10px);
          }
          60% {
            opacity: 0.6;
            transform: scale(1.05) rotateY(5deg);
            filter: blur(5px);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotateY(0deg);
            filter: blur(0px);
          }
        }

        @keyframes rockstar-close-button-entrance {
          0% {
            opacity: 0;
            transform: rotate(-180deg) scale(0.3);
          }
          50% {
            opacity: 0.5;
            transform: rotate(-90deg) scale(0.8);
          }
          80% {
            opacity: 0.8;
            transform: rotate(15deg) scale(1.2);
          }
          100% {
            opacity: 1;
            transform: rotate(0deg) scale(1);
          }
        }

        @keyframes rockstar-particles-explosion {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
          }
          20% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.5);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(3) rotate(360deg);
          }
        }

        @keyframes rockstar-lightning-flash {
          0%,
          100% {
            opacity: 0;
          }
          10%,
          30%,
          50% {
            opacity: 1;
          }
          20%,
          40% {
            opacity: 0.3;
          }
        }

        /* Classes para aplicar no modal */
        .rockstar-modal-backdrop {
          animation: rockstar-backdrop-entrance 0.5s
            cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .rockstar-modal-container {
          animation: rockstar-modal-entrance 0.8s
            cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
        }

        .rockstar-modal-glow {
          animation: rockstar-modal-glow-entrance 1s ease-out;
        }

        .rockstar-modal-title {
          animation: rockstar-title-entrance 1.2s
            cubic-bezier(0.175, 0.885, 0.32, 1.275);
          animation-delay: 0.3s;
          animation-fill-mode: both;
        }

        .rockstar-modal-video {
          animation: rockstar-video-entrance 1s
            cubic-bezier(0.175, 0.885, 0.32, 1.275);
          animation-delay: 0.5s;
          animation-fill-mode: both;
        }

        .rockstar-modal-close {
          animation: rockstar-close-button-entrance 0.6s
            cubic-bezier(0.68, -0.55, 0.265, 1.55);
          animation-delay: 0.8s;
          animation-fill-mode: both;
        }

        .rockstar-modal-description {
          animation: rockstar-title-entrance 1s ease-out;
          animation-delay: 0.7s;
          animation-fill-mode: both;
        }

        /* Efeito de partículas na abertura do modal */
        .rockstar-modal-container::before {
          content: "⚡🔥💥✨🎸⭐";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 2rem;
          z-index: -1;
          animation: rockstar-particles-explosion 1.5s ease-out;
          pointer-events: none;
        }

        /* Efeito de raio na abertura */
        .rockstar-modal-container::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            45deg,
            transparent 40%,
            rgba(255, 255, 255, 0.8) 50%,
            transparent 60%
          );
          border-radius: 1.5rem;
          z-index: 1;
          animation: rockstar-lightning-flash 0.6s ease-out;
          pointer-events: none;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-reverse {
          animation: float 8s ease-in-out infinite reverse;
        }

        .animate-float-slow {
          animation: float 10s ease-in-out infinite;
        }

        /* Efeito Rockstar para Cards de Vídeo */
        @keyframes rockstar-pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.7);
          }
          50% {
            transform: scale(1.02);
            box-shadow: 0 0 0 20px rgba(249, 115, 22, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(249, 115, 22, 0);
          }
        }

        @keyframes rockstar-glow {
          0%,
          100% {
            filter: drop-shadow(0 0 5px rgba(249, 115, 22, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 25px rgba(249, 115, 22, 0.8))
              drop-shadow(0 0 35px rgba(244, 63, 94, 0.6));
          }
        }

        @keyframes rockstar-shake {
          0%,
          100% {
            transform: translateX(0);
          }
          10% {
            transform: translateX(-2px) rotate(-1deg);
          }
          20% {
            transform: translateX(2px) rotate(1deg);
          }
          30% {
            transform: translateX(-2px) rotate(-1deg);
          }
          40% {
            transform: translateX(2px) rotate(1deg);
          }
          50% {
            transform: translateX(-2px) rotate(-1deg);
          }
          60% {
            transform: translateX(2px) rotate(1deg);
          }
          70% {
            transform: translateX(-2px) rotate(-1deg);
          }
          80% {
            transform: translateX(2px) rotate(1deg);
          }
          90% {
            transform: translateX(-2px) rotate(-1deg);
          }
        }

        @keyframes rockstar-zoom {
          0% {
            transform: scale(1) rotate(0deg);
          }
          50% {
            transform: scale(1.1) rotate(2deg);
          }
          100% {
            transform: scale(1.15) rotate(0deg);
          }
        }

        @keyframes rockstar-background-pulse {
          0%,
          100% {
            background: linear-gradient(
              135deg,
              rgba(249, 115, 22, 0.1),
              rgba(244, 63, 94, 0.1)
            );
          }
          50% {
            background: linear-gradient(
              135deg,
              rgba(249, 115, 22, 0.3),
              rgba(244, 63, 94, 0.3)
            );
          }
        }

        @keyframes rockstar-border-flow {
          0% {
            border-color: rgba(249, 115, 22, 0.4);
          }
          25% {
            border-color: rgba(244, 63, 94, 0.4);
          }
          50% {
            border-color: rgba(168, 85, 247, 0.4);
          }
          75% {
            border-color: rgba(59, 130, 246, 0.4);
          }
          100% {
            border-color: rgba(249, 115, 22, 0.4);
          }
        }

        /* Classes para aplicar nos cards */
        .rockstar-card {
          position: relative;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .rockstar-card:hover {
          animation: rockstar-pulse 0.6s ease-in-out;
        }

        .rockstar-card .play-button {
          transition: all 0.3s ease;
        }

        .rockstar-card:hover .play-button {
          animation: rockstar-glow 2s ease-in-out infinite;
          transform: scale(1.2) rotate(360deg);
        }

        .rockstar-card .video-background {
          transition: all 0.4s ease;
        }

        .rockstar-card:hover .video-background {
          animation: rockstar-background-pulse 1.5s ease-in-out infinite;
        }

        .rockstar-card .card-border {
          transition: all 0.3s ease;
        }

        .rockstar-card:hover .card-border {
          animation: rockstar-border-flow 2s linear infinite;
        }

        /* Efeito de clique que persiste */
        .rockstar-card.clicked {
          animation: rockstar-shake 0.5s ease-in-out,
            rockstar-zoom 0.3s ease-out;
        }

        .rockstar-card.clicked .play-button {
          transform: scale(1.4) rotate(720deg);
          filter: drop-shadow(0 0 30px rgba(249, 115, 22, 1))
            drop-shadow(0 0 40px rgba(244, 63, 94, 0.8));
        }

        /* Efeito de brilho ao clicar */
        .rockstar-card.clicked::before {
          content: "";
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(
            45deg,
            rgba(249, 115, 22, 0.8),
            rgba(244, 63, 94, 0.8),
            rgba(168, 85, 247, 0.8),
            rgba(59, 130, 246, 0.8)
          );
          border-radius: 1rem;
          z-index: -1;
          filter: blur(8px);
          animation: rockstar-glow 0.3s ease-out;
        }

        /* Efeito de partículas ao clicar */
        .rockstar-card.clicked::after {
          content: "✨🎸⚡🔥";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 1.5rem;
          z-index: 10;
          animation: rockstar-particles 0.8s ease-out forwards;
          pointer-events: none;
        }

        @keyframes rockstar-particles {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.2);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(2) rotate(360deg);
          }
        }

        /* 🎨 ESTILOS ROCKSTAR PARA AS NOVAS FEATURES */
        
        /* Animações para o Alesson Mode */
        @keyframes rockstar-shake {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          10% { transform: translateX(-2px) rotate(-0.5deg); }
          20% { transform: translateX(2px) rotate(0.5deg); }
          30% { transform: translateX(-3px) rotate(-0.5deg); }
          40% { transform: translateX(3px) rotate(0.5deg); }
          50% { transform: translateX(-2px) rotate(-0.5deg); }
          60% { transform: translateX(2px) rotate(0.5deg); }
          70% { transform: translateX(-1px) rotate(-0.2deg); }
          80% { transform: translateX(1px) rotate(0.2deg); }
          90% { transform: translateX(-0.5px) rotate(-0.1deg); }
        }

        @keyframes neon-pulse {
          0%, 100% {
            box-shadow: 
              0 0 0 2px transparent,
              0 0 0 4px rgba(255, 107, 53, 0.3),
              0 0 10px rgba(255, 107, 53, 0.5),
              0 0 20px rgba(255, 107, 53, 0.3),
              0 0 40px rgba(255, 107, 53, 0.1);
          }
          50% {
            box-shadow: 
              0 0 0 2px rgba(255, 107, 53, 0.8),
              0 0 0 6px rgba(255, 107, 53, 0.6),
              0 0 20px rgba(255, 107, 53, 0.8),
              0 0 40px rgba(255, 107, 53, 0.6),
              0 0 80px rgba(255, 107, 53, 0.3);
          }
        }

        @keyframes neon-flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
            opacity: 1;
          }
          20%, 24%, 55% {
            opacity: 0.4;
          }
          22% {
            opacity: 0.1;
          }
        }

        @keyframes carousel-slide-in {
          0% {
            transform: translateX(100%) scale(0.8) rotateY(45deg);
            opacity: 0;
            filter: blur(10px);
          }
          50% {
            transform: translateX(0%) scale(1.1) rotateY(-5deg);
            opacity: 0.8;
            filter: blur(2px);
          }
          100% {
            transform: translateX(0%) scale(1) rotateY(0deg);
            opacity: 1;
            filter: blur(0px);
          }
        }

        @keyframes carousel-slide-out {
          0% {
            transform: translateX(0%) scale(1) rotateY(0deg);
            opacity: 1;
            filter: blur(0px);
          }
          50% {
            transform: translateX(-100%) scale(0.8) rotateY(-45deg);
            opacity: 0.5;
            filter: blur(5px);
          }
          100% {
            transform: translateX(-100%) scale(0.6) rotateY(-90deg);
            opacity: 0;
            filter: blur(15px);
          }
        }

        @keyframes map-pin-bounce {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.3);
          }
        }

        @keyframes map-ripple {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }

        @keyframes alesson-mode-activate {
          0% {
            transform: scale(1) rotate(0deg);
            background: linear-gradient(45deg, #f97316, #f43f5e);
          }
          25% {
            transform: scale(1.1) rotate(5deg);
            background: linear-gradient(45deg, #facc15, #f97316);
          }
          50% {
            transform: scale(1.2) rotate(-5deg);
            background: linear-gradient(45deg, #eab308, #facc15);
          }
          75% {
            transform: scale(1.1) rotate(3deg);
            background: linear-gradient(45deg, #f59e0b, #eab308);
          }
          100% {
            transform: scale(1) rotate(0deg);
            background: linear-gradient(45deg, #facc15, #f97316);
          }
        }

        @keyframes rockstar-explosion {
          0% {
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.5) rotate(180deg);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(3) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes color-shift {
          0% { filter: hue-rotate(0deg) saturate(1.2); }
          25% { filter: hue-rotate(90deg) saturate(1.5); }
          50% { filter: hue-rotate(180deg) saturate(1.8); }
          75% { filter: hue-rotate(270deg) saturate(1.5); }
          100% { filter: hue-rotate(360deg) saturate(1.2); }
        }

        @keyframes text-rainbow {
          0% { 
            background: linear-gradient(45deg, #ff6b35, #f7931e);
            -webkit-background-clip: text;
            background-clip: text;
          }
          20% { 
            background: linear-gradient(45deg, #f7931e, #ffd23f);
            -webkit-background-clip: text;
            background-clip: text;
          }
          40% { 
            background: linear-gradient(45deg, #ffd23f, #06ffa5);
            -webkit-background-clip: text;
            background-clip: text;
          }
          60% { 
            background: linear-gradient(45deg, #06ffa5, #20bdff);
            -webkit-background-clip: text;
            background-clip: text;
          }
          80% { 
            background: linear-gradient(45deg, #20bdff, #a29bfe);
            -webkit-background-clip: text;
            background-clip: text;
          }
          100% { 
            background: linear-gradient(45deg, #a29bfe, #ff6b35);
            -webkit-background-clip: text;
            background-clip: text;
          }
        }

        /* Classes de utilidade rockstar */
        .carousel-transitioning {
          animation: carousel-slide-in 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .map-pin-active {
          animation: map-pin-bounce 0.6s ease-in-out infinite;
        }

        .map-pin-active::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 20px;
          height: 20px;
          border: 2px solid rgba(249, 115, 22, 0.6);
          border-radius: 50%;
          animation: map-ripple 1.5s ease-out infinite;
        }

        .alesson-mode-active {
          animation: color-shift 3s ease-in-out infinite;
        }

        .alesson-mode-text {
          animation: text-rainbow 2s linear infinite;
        }

        .rockstar-button-active {
          animation: alesson-mode-activate 1s ease-in-out;
        }

        .screen-shake {
          animation: rockstar-shake 0.5s ease-in-out;
        }

        .rockstar-explosion-effect {
          animation: rockstar-explosion 2s ease-out forwards;
        }

        @keyframes particle-float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
          100% { transform: translateY(0px) rotate(360deg); }
        }
        
        @keyframes explosion-burst {
          0% { transform: scale(0) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.5) rotate(180deg); opacity: 0.8; }
          100% { transform: scale(2) rotate(360deg); opacity: 0; }
        }
        
        @keyframes screen-shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }
        
        /* Animações do Modal de Imagem */
        @keyframes modal-fade-in {
          0% {
            opacity: 0;
            backdrop-filter: blur(0px);
          }
          100% {
            opacity: 1;
            backdrop-filter: blur(12px);
          }
        }
        
        @keyframes modal-scale-in {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(50px);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05) translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes image-reveal {
          0% {
            opacity: 0;
            transform: scale(1.1);
            filter: blur(10px);
          }
          100% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0px);
          }
        }
        
        @keyframes border-glow {
          0% {
            border-color: rgba(255, 107, 53, 0.3);
            box-shadow: 0 0 20px rgba(255, 107, 53, 0.1);
          }
          100% {
            border-color: rgba(247, 147, 30, 0.6);
            box-shadow: 0 0 40px rgba(247, 147, 30, 0.3);
          }
        }
        
        /* 🎉 ANIMAÇÕES ÉPICAS DO ALESSON MODE BAHIA CHIC */
        @keyframes bahia-float {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-15px) translateX(10px) rotate(5deg);
          }
          50% {
            transform: translateY(-25px) translateX(-5px) rotate(-3deg);
          }
          75% {
            transform: translateY(-10px) translateX(15px) rotate(8deg);
          }
        }
        
        @keyframes fire-dance {
          0%, 100% {
            transform: translateY(0px) scale(1) rotate(0deg);
            filter: hue-rotate(0deg);
          }
          20% {
            transform: translateY(-20px) scale(1.2) rotate(10deg);
            filter: hue-rotate(30deg);
          }
          40% {
            transform: translateY(-35px) scale(0.9) rotate(-15deg);
            filter: hue-rotate(60deg);
          }
          60% {
            transform: translateY(-25px) scale(1.3) rotate(20deg);
            filter: hue-rotate(90deg);
          }
          80% {
            transform: translateY(-15px) scale(1.1) rotate(-10deg);
            filter: hue-rotate(45deg);
          }
        }
        
        @keyframes party-bounce {
          0%, 100% {
            transform: translateY(0px) scale(1) rotate(0deg);
          }
          15% {
            transform: translateY(-30px) scale(1.3) rotate(15deg);
          }
          30% {
            transform: translateY(-45px) scale(1.1) rotate(-10deg);
          }
          45% {
            transform: translateY(-20px) scale(1.4) rotate(25deg);
          }
          60% {
            transform: translateY(-35px) scale(0.9) rotate(-20deg);
          }
          75% {
            transform: translateY(-15px) scale(1.2) rotate(10deg);
          }
        }
        
        @keyframes bahia-sway {
          0%, 100% {
            transform: translateX(0px) rotate(0deg) scale(1);
          }
          25% {
            transform: translateX(20px) rotate(8deg) scale(1.1);
          }
          50% {
            transform: translateX(-15px) rotate(-5deg) scale(0.95);
          }
          75% {
            transform: translateX(25px) rotate(12deg) scale(1.05);
          }
        }
        
        @keyframes sparkle-twinkle {
          0%, 100% {
            opacity: 0.4;
            transform: scale(0.8) rotate(0deg);
          }
          25% {
            opacity: 0.9;
            transform: scale(1.3) rotate(90deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.5) rotate(180deg);
          }
          75% {
            opacity: 0.7;
            transform: scale(1.1) rotate(270deg);
          }
        }
        
        @keyframes music-pulse {
          0%, 100% {
            transform: scale(1) translateY(0px);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.4) translateY(-10px);
            opacity: 1;
          }
        }
        
        @keyframes tooltip-appear {
          0% {
            opacity: 0;
            transform: translateX(-50%) translateY(10px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateX(-50%) translateY(0px) scale(1);
          }
        }
        
        @keyframes location-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 107, 53, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 107, 53, 0.6), 0 0 60px rgba(244, 63, 94, 0.3);
          }
        }
        
        /* 🎮 EFEITOS ROCKSTAR GAMES - GLITCH ÉPICO! */
        @keyframes glitch {
          0% {
            transform: translate(0);
            filter: hue-rotate(0deg);
          }
          10% {
            transform: translate(-2px, 1px);
            filter: hue-rotate(30deg) contrast(110%) brightness(105%);
          }
          20% {
            transform: translate(-1px, -1px);
            filter: hue-rotate(60deg) saturate(120%);
          }
          30% {
            transform: translate(1px, 1px);
            filter: hue-rotate(90deg) contrast(95%) brightness(110%);
          }
          40% {
            transform: translate(1px, -1px);
            filter: hue-rotate(120deg) saturate(110%) contrast(105%);
          }
          50% {
            transform: translate(-1px, 1px);
            filter: hue-rotate(150deg) brightness(115%) contrast(100%);
          }
          60% {
            transform: translate(-1px, 1px);
            filter: hue-rotate(180deg) saturate(130%);
          }
          70% {
            transform: translate(1px, 1px);
            filter: hue-rotate(210deg) contrast(108%);
          }
          80% {
            transform: translate(-1px, -1px);
            filter: hue-rotate(240deg) brightness(95%);
          }
          90% {
            transform: translate(1px, 1px);
            filter: hue-rotate(270deg) saturate(105%);
          }
          100% {
            transform: translate(0);
            filter: hue-rotate(0deg);
          }
        }
        
        @keyframes rockstar-shake {
          0%, 100% {
            transform: translateX(0) translateY(0) rotate(0deg);
          }
          10% {
            transform: translateX(-3px) translateY(2px) rotate(-0.5deg);
          }
          20% {
            transform: translateX(3px) translateY(-1px) rotate(0.5deg);
          }
          30% {
            transform: translateX(-2px) translateY(3px) rotate(-0.3deg);
          }
          40% {
            transform: translateX(4px) translateY(-2px) rotate(0.7deg);
          }
          50% {
            transform: translateX(-1px) translateY(4px) rotate(-0.4deg);
          }
          60% {
            transform: translateX(2px) translateY(-3px) rotate(0.6deg);
          }
          70% {
            transform: translateX(-4px) translateY(1px) rotate(-0.8deg);
          }
          80% {
            transform: translateX(3px) translateY(-4px) rotate(0.2deg);
          }
          90% {
            transform: translateX(-1px) translateY(2px) rotate(-0.1deg);
          }
        }
        
        /* Classes utilitárias para os efeitos */
        .animate-glitch {
          animation: glitch 0.3s infinite;
        }
        
        .animate-rockstar-shake {
          animation: rockstar-shake 0.5s ease-in-out;
        }
        
        /* Animações do overlay de glitch */
        @keyframes glitch-scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(100vh); }
        }
        
        @keyframes glitch-slide {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        
        @keyframes static-noise {
          0% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(-2px) translateY(2px); }
          50% { transform: translateX(2px) translateY(-2px); }
          75% { transform: translateX(-1px) translateY(1px); }
          100% { transform: translateX(1px) translateY(-1px); }
        }
        
        @keyframes energy-pulse {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            opacity: 0.3;
          }
          33% {
            transform: scale(1.5) rotate(120deg);
            opacity: 0.7;
          }
          66% {
            transform: scale(1.2) rotate(240deg);
            opacity: 0.5;
          }
        }
        
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        }
      `}</style>
    </div>
  );
};

export default AllessonSite;
