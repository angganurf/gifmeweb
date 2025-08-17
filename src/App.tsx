import React, { useState, useRef } from 'react';

function App() {
  const [copied, setCopied] = useState(false);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const contractAddress = "vQQ3Z2j8Rz4bupwENK9rhGkpgy3Bj6LdUTPz9J2pump";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      setShowConfetti(true);
      playSound();
      setTimeout(() => setCopied(false), 2000);
      setTimeout(() => setShowConfetti(false), 3000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = contractAddress;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setShowConfetti(true);
      playSound();
      setTimeout(() => setCopied(false), 2000);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const playSound = () => {
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  };

  const playHoverSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 600;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const imageUrls = [
    "https://ext.same-assets.com/1682164579/1110044156.jpeg",
    "https://ext.same-assets.com/1682164579/2121905498.jpeg",
    "https://ext.same-assets.com/1682164579/3424647380.jpeg",
    "https://ext.same-assets.com/1682164579/102213519.jpeg",
    "https://ext.same-assets.com/1682164579/2208978701.jpeg",
    "https://ext.same-assets.com/1682164579/781635082.png",
    "https://ext.same-assets.com/1682164579/4070002725.jpeg",
    "https://ext.same-assets.com/1682164579/676438517.jpeg",
    "https://ext.same-assets.com/1682164579/1694562246.jpeg",
    "https://ext.same-assets.com/1682164579/4037394631.jpeg",
    "https://ext.same-assets.com/1682164579/4029951982.png",
    "https://ext.same-assets.com/1682164579/216994735.jpeg",
    "https://ext.same-assets.com/1682164579/3904561446.jpeg",
    "https://ext.same-assets.com/1682164579/2264503453.jpeg",
    "https://ext.same-assets.com/1682164579/3969666495.jpeg",
    "https://ext.same-assets.com/1682164579/130704857.jpeg",
    "https://ext.same-assets.com/1682164579/2623312466.jpeg",
    "https://ext.same-assets.com/1682164579/1887970413.jpeg",
    "https://ext.same-assets.com/1682164579/3301826439.jpeg",
    "https://ext.same-assets.com/1682164579/284654174.jpeg",
    "https://ext.same-assets.com/1682164579/3274061496.jpeg",
    "https://ext.same-assets.com/1682164579/3597467129.jpeg",
    "https://ext.same-assets.com/1682164579/1459167438.jpeg",
    "https://ext.same-assets.com/1682164579/3756698418.jpeg"
  ];

  return (
    <div className="min-h-screen bg-[#fbf1f5] font-mono">
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-4 border-4 border-black rounded-3xl mx-2 sm:mx-4 mt-4 bg-white">
        <div className="flex items-center gap-3">
          {/* Nuf logo - blue dog character */}
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#a7c4da] rounded-full border-4 border-black flex items-center justify-center transition-transform hover:scale-110">
            <img src="https://ext.same-assets.com/1682164579/1528366781.jpeg" alt="nuf dog" className="w-8 h-8 sm:w-12 sm:h-12 rounded-full" />
          </div>
          <span className="text-2xl sm:text-4xl font-bold">nuf</span>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href="https://t.me/addstickers/nufdog_by_fStikBot"
            className="bg-black text-white px-2 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-transform hover:scale-105 active:scale-95"
            onMouseEnter={playHoverSound}
          >
            <span className="hidden sm:inline">Telegram Stickers</span>
            <span className="sm:hidden">Telegram</span>
          </a>
          <a
            href="https://x.com/nufdog"
            className="text-xl sm:text-2xl font-bold transition-transform hover:scale-110 active:scale-95"
            onMouseEnter={playHoverSound}
          >
            X
          </a>
          <a
            href="https://dexscreener.com/solana/vQQ3Z2j8Rz4bupwENK9rhGkpgy3Bj6LdUTPz9J2pump"
            className="text-xl sm:text-2xl font-bold transition-transform hover:scale-110 active:scale-95"
            onMouseEnter={playHoverSound}
          >
            🔍
          </a>
        </div>
      </header>

      {/* Main content */}
      <main className="px-2 sm:px-4 py-4 sm:py-8 max-w-7xl mx-auto">
        {/* Free Nub section */}
        <div className="flex flex-col lg:flex-row items-start gap-4 sm:gap-8 mb-8 max-w-6xl">
          <div className="relative flex flex-col items-center">
            {/* Jail bars with dog behind */}
            <div className="relative">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={`jail-bar-${i}`}
                    className="w-8 sm:w-10 h-32 sm:h-40 bg-gradient-to-b from-pink-300 to-pink-400 border-4 border-black rounded-t-xl transition-transform hover:scale-105 jail-bar"
                    style={{
                      animationDelay: `${i * 0.1}s`
                    }}
                  />
                ))}
              </div>
              {/* Dog behind bars */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-[-1]">
                <img
                  src="https://ext.same-assets.com/1682164579/1528366781.jpeg"
                  alt="nuf in jail"
                  className="w-16 sm:w-20 h-16 sm:h-20 rounded-full transition-transform hover:scale-110"
                />
              </div>
            </div>
            <div className="mt-4 text-center font-bold text-lg nuf-pulse">FREE NUB</div>
          </div>

          {/* Dog illustration outside */}
          <div className="flex items-center justify-center lg:justify-start">
            <img
              src="https://ext.same-assets.com/1682164579/1528366781.jpeg"
              alt="nuf dog"
              className="w-32 sm:w-40 h-32 sm:h-40 rounded-2xl transition-transform hover:scale-110 hover:rotate-3"
              onMouseEnter={playHoverSound}
            />
          </div>

          {/* Speech bubble */}
          <div className="bg-[#c7b8d4] border-4 border-black rounded-3xl p-4 sm:p-8 max-w-lg relative ml-0 lg:ml-4 transition-all hover:shadow-lg hover:scale-105">
            <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-[#c7b8d4] border-l-4 border-b-4 border-black rotate-45 hidden lg:block" />
            <p className="text-lg sm:text-2xl font-bold leading-relaxed text-black">
              i'm nuf free my boy nub till its backwards. i be cooking up and shit.
            </p>
          </div>
        </div>

        {/* Contract address with click-to-copy */}
        <div className="relative mb-8">
          <div
            className="bg-white border-4 border-black rounded-3xl p-4 text-center cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] group"
            onClick={copyToClipboard}
            onMouseEnter={playHoverSound}
          >
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <code className="text-sm sm:text-lg font-mono break-all">
                {contractAddress}
              </code>
              <span className="text-2xl opacity-50 group-hover:opacity-100 transition-opacity">
                📋
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              Click to copy contract address
            </p>
          </div>
          {copied && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold animate-bounce">
              Copied to clipboard! 🎉
            </div>
          )}
        </div>

        {/* Image gallery with hover effects */}
        <div className="bg-[#c7b8d4] border-4 border-black rounded-3xl p-4 sm:p-8">
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3">
            {imageUrls.map((url, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl border-3 border-black bg-white group cursor-pointer"
                onMouseEnter={() => {
                  setHoveredImage(index);
                  playHoverSound();
                }}
                onMouseLeave={() => setHoveredImage(null)}
                onClick={() => playSound()}
              >
                <img
                  src={url}
                  alt={`nuf sticker ${index + 1}`}
                  className="gallery-image transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    filter: hoveredImage === index ? 'brightness(1.2) contrast(1.1)' : 'none'
                  }}
                />
                {hoveredImage === index && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent flex items-end justify-center p-2">
                    <span className="text-white text-xs font-bold bg-black/50 px-2 py-1 rounded animate-bounce">
                      #{index + 1}
                    </span>
                  </div>
                )}
                <div
                  className="absolute inset-0 border-2 border-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"
                  style={{
                    boxShadow: hoveredImage === index ? '0 0 20px rgba(255, 255, 0, 0.6)' : 'none'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(10)].map((_, i) => (
            <div key={`confetti-${i}`} className="confetti" />
          ))}
        </div>
      )}

    </div>
  );
}

export default App;
