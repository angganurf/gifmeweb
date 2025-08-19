import React, { useEffect, useRef, useState } from "react";

function App() {
	const [copied, setCopied] = useState(false);
	const [hoveredImage, setHoveredImage] = useState<number | null>(null);
	const [showConfetti, setShowConfetti] = useState(false);

	// NEW: state untuk image viewer
	const [isViewerOpen, setIsViewerOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState<number>(0);

	// === Background Music ===
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = 0.1; // volume 50%
			const playPromise = audioRef.current.play();
			if (playPromise !== undefined) {
				playPromise.catch((err) => {
					console.log(
						"Autoplay diblokir browser, menunggu user interaksi:",
						err
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

	const contractAddress = " ";

	const imageUrls = [
		"/assets/1.gif",
		"/assets/2.gif",
		"/assets/3.gif",
		"/assets/4.gif",
		"/assets/5.gif",
		"/assets/6.gif",
		"/assets/7.gif",
		"/assets/8.gif",
		"/assets/9.gif",
		"/assets/10.gif",
		"/assets/11.gif",
		"/assets/12.gif",
		"/assets/13.gif",
		"/assets/14.gif",
		"/assets/15.gif",
		"/assets/16.gif",
		"/assets/17.gif",
		"/assets/18.gif",
		"/assets/19.gif",
		"/assets/20.gif",
		"/assets/4.gif",
	];

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(contractAddress);
			setCopied(true);
			setShowConfetti(true);
			playSound();
			setTimeout(() => setCopied(false), 2000);
			setTimeout(() => setShowConfetti(false), 3000);
		} catch (err) {
			// Fallback untuk browser lama
			const textArea = document.createElement("textarea");
			textArea.value = contractAddress;
			document.body.appendChild(textArea);
			textArea.focus();
			textArea.select();
			document.execCommand("copy");
			document.body.removeChild(textArea);
			setCopied(true);
			setShowConfetti(true);
			playSound();
			setTimeout(() => setCopied(false), 2000);
			setTimeout(() => setShowConfetti(false), 3000);
		}
	};

	const playSound = () => {
		const audioContext = new (window.AudioContext ||
			(window as any).webkitAudioContext)();
		const oscillator = audioContext.createOscillator();
		const gainNode = audioContext.createGain();
		oscillator.connect(gainNode);
		gainNode.connect(audioContext.destination);
		oscillator.frequency.value = 800;
		oscillator.type = "sine";
		gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
		gainNode.gain.exponentialRampToValueAtTime(
			0.01,
			audioContext.currentTime + 0.2
		);
		oscillator.start(audioContext.currentTime);
		oscillator.stop(audioContext.currentTime + 0.2);
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
			audioContext.currentTime + 0.1
		);
		oscillator.start(audioContext.currentTime);
		oscillator.stop(audioContext.currentTime + 0.1);
	};

	// === Image Viewer handlers ===
	const openViewer = (index: number) => {
		setCurrentIndex(index);
		setIsViewerOpen(true);
		// Kunci scroll halaman di belakang modal
		document.body.style.overflow = "hidden";
	};

	const closeViewer = () => {
		setIsViewerOpen(false);
		document.body.style.overflow = "";
	};

	const showPrev = () => {
		setCurrentIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
	};

	const showNext = () => {
		setCurrentIndex((prev) => (prev + 1) % imageUrls.length);
	};

	// Keyboard support: ← → untuk navigasi, Esc untuk close
	useEffect(() => {
		if (!isViewerOpen) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "ArrowLeft") showPrev();
			else if (e.key === "ArrowRight") showNext();
			else if (e.key === "Escape") closeViewer();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isViewerOpen]);

	// Optional: preload gambar next/prev agar mulus
	useEffect(() => {
		if (!isViewerOpen) return;
		const nextImg = new Image();
		nextImg.src = imageUrls[(currentIndex + 1) % imageUrls.length];
		const prevImg = new Image();
		prevImg.src =
			imageUrls[(currentIndex - 1 + imageUrls.length) % imageUrls.length];
	}, [currentIndex, isViewerOpen]);

	const downloadCurrent = async () => {
		const url = imageUrls[currentIndex];
		// Untuk aset lokal yang sama origin, cukup pakai <a download>
		const link = document.createElement("a");
		link.href = url;
		const filename = url.split("/").pop() || `image-${currentIndex + 1}`;
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<div className="min-h-screen bg-[#00D145] max-w-7xl mx-auto ">
			{/* Header */}
			<div className="px-2 sm:px-1">
				<header className="flex items-center justify-between py-2  px-4 sm:px-6 border-4 mt-2 sm:mb-[-10px] border-black rounded-3xl sm:mx-4  bg-white">
					<div className="flex items-center gap-1 sm:gap-2">
						<img
							src="/assets/logo.png"
							alt="nuf dog"
							className="w-12 sm:w-16"
						/>
						<img
							src="/assets/gifmefrog.gif"
							alt="Gifme Banner"
							className="w-32 mt-2"
						/>
					</div>

					<div className="flex items-center gap-2 sm:gap-4">
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
				</header>
			</div>

			{/* Main content */}
			<main className="px-2 sm:px-4 py-4 sm:py-8 max-w-7xl mx-auto">
				{/* Banner */}
				<div className="w-full mb-4 border-4 border-black rounded-3xl text-center cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] group">
					<img
						src="/assets/banner.gif"
						alt="Gifme Banner"
						className="w-full rounded-3xl"
					/>
				</div>

				{/* Contract address */}
				<div className="relative mb-4">
					<div
						className="bg-white border-4 border-black rounded-3xl p-4 text-center cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] group"
						onClick={copyToClipboard}
						onMouseEnter={playHoverSound}
					>
						<div className="flex items-center justify-center gap-2 flex-wrap ">
							<code className="font-bold sm:text-2xl break-all">
								{contractAddress}
							</code>
							<span className="text-2xl opacity-50 group-hover:opacity-100 transition-opacity">
								📋
							</span>
						</div>
					</div>
					{copied && (
						<div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold animate-bounce">
							Copied to clipboard! 🎉
						</div>
					)}
				</div>

				{/* Image gallery */}
				<div className="bg-[#22941A] border-4 border-black rounded-3xl p-4 sm:p-8">
					<div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-2 sm:gap-3">
						{imageUrls.map((url, index) => (
							<button
								key={index}
								type="button"
								className="relative overflow-hidden rounded-xl border-3 border-black bg-white group cursor-pointer"
								onMouseEnter={() => {
									setHoveredImage(index);
									playHoverSound();
								}}
								onMouseLeave={() => setHoveredImage(null)}
								onClick={() => openViewer(index)}
								aria-label={`Open image ${index + 1}`}
							>
								<img
									src={url}
									alt={`nuf sticker ${index + 1}`}
									className="gallery-image transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 w-full h-full object-cover"
									style={{
										filter:
											hoveredImage === index
												? "brightness(1.2) contrast(1.1)"
												: "none",
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
										boxShadow:
											hoveredImage === index
												? "0 0 20px rgba(255, 255, 0, 0.6)"
												: "none",
									}}
								/>
							</button>
						))}
					</div>
				</div>
				<span className="text-[#22941A] mt-6 block text-center">
					[ Stay tuned for more frogs...! ]
				</span>
				{/* Background music player (hidden) */}
				<audio ref={audioRef} src="/assets/bgm.mp3" loop hidden />

				{/* Tombol Play/Pause di kanan bawah */}
				<button
					onClick={toggleMusic}
					className="fixed bottom-4 right-4 z-50 bg-black text-white px-4 py-2 rounded-full font-bold shadow-lg hover:scale-105 active:scale-95"
				>
					{isPlaying ? "⏸ Pause" : "▶️ Play"}
				</button>

				{/* === Rest of your existing UI === */}
				{/* ... semua kode yang sudah ada tetap ... */}
			</main>

			{/* Confetti Effect */}
			{showConfetti && (
				<div className="fixed inset-0 pointer-events-none z-50">
					{[...Array(10)].map((_, i) => (
						<div key={`confetti-${i}`} className="confetti" />
					))}
				</div>
			)}

			{/* === Image Viewer Modal === */}
			{isViewerOpen && (
				<div
					className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
					onClick={(e) => {
						// klik background untuk close
						if (e.target === e.currentTarget) closeViewer();
					}}
					role="dialog"
					aria-modal="true"
				>
					<div className="relative w-full max-w-5xl">
						{/* Close button */}
						<button
							onClick={closeViewer}
							className="absolute -top-10 right-0 bg-white text-black px-3 py-1 rounded-full font-bold border-2 border-black shadow-lg hover:scale-105 active:scale-95"
							aria-label="Close viewer"
						>
							✕
						</button>

						{/* Image container */}
						<div className="relative bg-white border-4 border-black rounded-3xl overflow-hidden">
							{/* Prev */}
							<button
								onClick={showPrev}
								className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 border-2 border-black rounded-full w-10 h-10 flex items-center justify-center font-bold hover:scale-105 active:scale-95"
								aria-label="Previous image"
							>
								‹
							</button>

							{/* Next */}
							<button
								onClick={showNext}
								className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 border-2 border-black rounded-full w-10 h-10 flex items-center justify-center font-bold hover:scale-105 active:scale-95"
								aria-label="Next image"
							>
								›
							</button>

							{/* Big image */}
							<img
								src={imageUrls[currentIndex]}
								alt={`nuf sticker ${currentIndex + 1} large`}
								className="w-full max-h-[75vh] object-contain bg-white"
								draggable={false}
								onLoad={playHoverSound}
							/>

							{/* Footer controls */}
							<div className="flex items-center justify-between gap-2 p-3 border-t-4 border-black bg-[#f7f7f7]">
								<div className="font-bold">
									#{currentIndex + 1} / {imageUrls.length}
								</div>
								<div className="flex items-center gap-2">
									<button
										onClick={downloadCurrent}
										className="bg-black text-white px-4 py-2 rounded-full font-bold hover:scale-105 active:scale-95"
									>
										⬇️ Download
									</button>
									{/* <button
										onClick={showPrev}
										className="bg-white border-2 border-black px-4 py-2 rounded-full font-bold hover:scale-105 active:scale-95"
									>
										← Prev
									</button>
									<button
										onClick={showNext}
										className="bg-white border-2 border-black px-4 py-2 rounded-full font-bold hover:scale-105 active:scale-95"
									>
										Next →
									</button> */}
								</div>
							</div>
						</div>

						{/* Tip keyboard */}
						<div className="mt-3 text-center text-white/80 text-sm">
							Tip: use ← → keys to navigate, Esc to close.
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
