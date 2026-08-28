import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Layout() {
	// === Background Music ===
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = 0.1; // volume 50%
			const playPromise = audioRef.current.play();
			if (playPromise !== undefined) {
				playPromise.catch((err) => {
					console.log(
						"Autoplay diblokir browser, menunggu user interaksi:",
						err,
					);
				});
			}
		}
	}, []);

	const toggleMusic = () => {
		if (!audioRef.current) return;
		if (isPlaying) {
			audioRef.current.pause();
			setIsPlaying(false);
		} else {
			audioRef.current.play();
			setIsPlaying(true);
		}
	};

	const playHoverSound = () => {
		const audioContext = new (window.AudioContext ||
			(window as any).webkitAudioContext)();
		const oscillator = audioContext.createOscillator();
		const gainNode = audioContext.createGain();
		oscillator.connect(gainNode);
		gainNode.connect(audioContext.destination);
		oscillator.frequency.value = 600;
		oscillator.type = "sine";
		gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
		gainNode.gain.exponentialRampToValueAtTime(
			0.01,
			audioContext.currentTime + 0.1,
		);
		oscillator.start(audioContext.currentTime);
		oscillator.stop(audioContext.currentTime + 0.1);
	};

	const contractAddress = "7fJS2pvdW7CTEVK2J2CEb4cJEyd5HK8C2oqLWAakpump";

	return (
		<div className="min-h-screen bg-[#00D145] max-w-7xl mx-auto ">
			{/* Header */}
			<div className="px-2 sm:px-1">
				<header className="flex items-center justify-between py-2  px-4 sm:px-6 border-4 mt-2 sm:mb-[-10px] border-black rounded-3xl sm:mx-4  bg-white relative z-50">
					<div className="flex items-center gap-1 sm:gap-2">
						<Link to="/">
							<img
								src="/assets/logo.png"
								alt="nuf dog"
								className="w-12 sm:w-16"
							/>
						</Link>
						<Link to="/">
							<img
								src="/assets/gifmefrog.gif"
								alt="Gifme Banner"
								className="w-20 sm:w-32 mt-2"
							/>
						</Link>
					</div>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center gap-2 sm:gap-4">
						{/* Dropdown Menu */}
						<div
							className="relative"
							onMouseEnter={() => setIsMenuOpen(true)}
							onMouseLeave={() => setIsMenuOpen(false)}
						>
							<button
								className="bg-black text-white px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-transform hover:scale-105 active:scale-95 flex items-center gap-1 cursor-pointer"
								onMouseEnter={playHoverSound}
							>
								Page ▾
							</button>
							{isMenuOpen && (
								<div className="absolute top-full right-0 pt-2 w-48 z-50">
									<div className="bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col">
										<Link
											to="/gifmetune"
											className="px-4 py-3 hover:bg-[#00D145] hover:text-white font-bold border-b-4 border-black text-black transition-colors"
											onMouseEnter={playHoverSound}
										>
											GifMeTune
										</Link>
										<Link
											to="https://bags.gifmefrog.fun/"
											target="_blank"
											className="px-4 py-3 hover:bg-[#00D145] hover:text-white font-bold text-black transition-colors"
											onMouseEnter={playHoverSound}
										>
											GifMeBags
										</Link>
									</div>
								</div>
							)}
						</div>

						<a
							target="_blank"
							href={`https://game.gifmefrog.fun`}
							className="bg-black text-white px-2 py-1 rounded-full text-xs sm:text-sm font-bold transition-transform hover:scale-105 active:scale-95"
							onMouseEnter={playHoverSound}
						>
							<img src="/assets/game.png" alt="Game" className="w-8" />
						</a>
						<a
							href="https://x.com/gifmefrog"
							target="_blank"
							className="bg-black text-white px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-transform hover:scale-105 active:scale-95"
							onMouseEnter={playHoverSound}
						>
							<img src="/assets/x.png" alt="Gifme Banner" className="w-6" />
						</a>
						<a
							target="_blank"
							href={`https://dexscreener.com/solana/${contractAddress}`}
							className="bg-black text-white px-2 py-2 rounded-full text-xs sm:text-sm font-bold transition-transform hover:scale-105 active:scale-95"
							onMouseEnter={playHoverSound}
						>
							<img src="/assets/dex.png" alt="Gifme Banner" className="w-12" />
						</a>
					</div>

					{/* Mobile Menu Button */}
					<button
						className="md:hidden bg-black text-white p-2 rounded-full border-2 border-transparent active:scale-90 transition-transform"
						onClick={() => setIsMenuOpen(true)}
					>
						<Menu size={24} />
					</button>
				</header>
			</div>

			{/* Mobile Slide-in Menu */}
			<div
				className={`fixed inset-0 z-[100] md:hidden ${
					isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
				}`}
			>
				{/* Backdrop */}
				<div
					className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
						isMenuOpen ? "opacity-100" : "opacity-0"
					}`}
					onClick={() => setIsMenuOpen(false)}
				/>

				{/* Menu Panel */}
				<div
					className={`absolute right-0 top-0 bottom-0 w-[80%] max-w-sm bg-[#00D145] border-l-4 border-black p-6 shadow-2xl flex flex-col gap-6 transition-transform duration-300 ease-in-out ${
						isMenuOpen ? "translate-x-0" : "translate-x-full"
					}`}
				>
					<div className="flex justify-between items-center">
						<span className="text-2xl font-black text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
							MENU
						</span>
						<button
							className="bg-white text-black p-2 rounded-full border-4 border-black hover:scale-110 active:scale-90 transition-transform"
							onClick={() => setIsMenuOpen(false)}
						>
							<X size={24} strokeWidth={3} />
						</button>
					</div>

					<div className="flex flex-col gap-4">
						<div className="grid grid-cols-3 gap-2">
							<a
								target="_blank"
								href={`https://game.gifmefrog.fun`}
								className="bg-black text-white border-4 border-black p-3 rounded-xl flex flex-col items-center justify-center gap-1 hover:scale-105 transition-transform"
							>
								<img src="/assets/game.png" alt="Game" className="w-8" />
								<span className="font-bold text-xs">Game</span>
							</a>
							<a
								href="https://x.com/gifmefrog"
								target="_blank"
								className="bg-black text-white border-4 border-black p-3 rounded-xl flex flex-col items-center justify-center gap-1 hover:scale-105 transition-transform"
							>
								<img src="/assets/x.png" alt="X" className="w-10" />
								<span className="font-bold text-xs">Twitter</span>
							</a>
							<a
								target="_blank"
								href={`https://dexscreener.com/solana/${contractAddress}`}
								className="bg-black text-white border-4 border-black p-3 rounded-xl flex flex-col items-center justify-center gap-1 hover:scale-105 transition-transform"
							>
								<img src="/assets/dex.png" alt="Dex" className="w-16" />
								<span className="font-bold text-xs">Dex</span>
							</a>
						</div>
						<div className="border-4 border-black bg-white rounded-xl overflow-hidden">
							<div className="bg-black text-white px-4 py-2 font-black text-sm uppercase">
								Pages
							</div>
							<Link
								to="/gifmetune"
								className="block px-4 py-3 font-bold border-b-2 border-black hover:bg-gray-100"
								onClick={() => setIsMenuOpen(false)}
							>
								GifMeTune
							</Link>
							<Link
								to="https://bags.gifmefrog.fun/"
								className="block px-4 py-3 font-bold hover:bg-gray-100"
								onClick={() => setIsMenuOpen(false)}
							>
								GifMeBags
							</Link>
						</div>
					</div>

					<div className="mt-auto text-center font-black text-black/20 text-4xl select-none">
						GifMeFrog
					</div>
				</div>
			</div>

			{/* Main content */}
			<main className="px-2 sm:px-4 py-4 sm:py-8 max-w-7xl mx-auto">
				<Outlet context={{ playHoverSound }} />
			</main>

			{/* Background music player (hidden) */}
			<audio ref={audioRef} src="/assets/bgm.mp3" loop hidden />

			{/* Tombol Play/Pause di kanan bawah */}
			<button
				onClick={toggleMusic}
				className="fixed bottom-4 right-4 z-50 bg-black text-white px-4 py-2 rounded-full font-bold shadow-lg hover:scale-105 active:scale-95"
			>
				{isPlaying ? "⏸ Pause" : "▶️ Play"}
			</button>
		</div>
	);
}
