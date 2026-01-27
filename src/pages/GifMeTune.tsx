import React, { useEffect, useState } from "react";
import {
	Copy,
	Terminal,
	ArrowRight,
	BookOpen,
	Github,
	Check,
} from "lucide-react";

export default function GifMeTune() {
	const [typedCommand, setTypedCommand] = useState("");
	const [visibleLines, setVisibleLines] = useState(0);
	const [isCopied, setIsCopied] = useState(false);

	const handleCopy = () => {
		const textToCopy = "/plugin marketplace add gifmetune/main";
		navigator.clipboard.writeText(textToCopy).then(() => {
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 2000);
		});
	};

	useEffect(() => {
		const fullCommand = '/ctx:plan "Add meme authentication"';
		let isMounted = true;

		const runAnimation = async () => {
			while (isMounted) {
				// Reset
				setTypedCommand("");
				setVisibleLines(0);
				await new Promise((r) => setTimeout(r, 1000));

				// Type Command
				for (let i = 1; i <= fullCommand.length; i++) {
					if (!isMounted) return;
					setTypedCommand(fullCommand.slice(0, i));
					await new Promise((r) => setTimeout(r, 50));
				}

				await new Promise((r) => setTimeout(r, 500));

				// Show Lines
				for (let i = 1; i <= 4; i++) {
					if (!isMounted) return;
					setVisibleLines(i);
					await new Promise((r) => setTimeout(r, 400));
				}

				// Wait before restart
				await new Promise((r) => setTimeout(r, 4000));
			}
		};

		runAnimation();

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<div className="flex flex-col items-center justify-center py-10 px-4 ">
			<div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
				{/* Left Column: Text Content */}
				<div className="flex flex-col text-left gap-6">
					<div>
						<span className="inline-block bg-[#2f2f2f] text-[#d4af37] border-2 border-[#d4af37] px-4 py-1 rounded-full text-sm font-bold mb-6">
							✨ Claude Plugin
						</span>
						<h1 className="text-5xl sm:text-7xl font-black uppercase leading-tight mb-4 ">
							Optimize <br />
							context flow, <br />
							<span className="text-[#FFD700] drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
								Not prompt chaos.
							</span>
						</h1>
						<p className="text-xl text-gray-700 font-medium leading-relaxed max-w-xl">
							Precision-tuned context engineering for your Meme flow. Natural
							language to beat mapping, modular mix plans, and parallel groove
							execution.
						</p>
					</div>

					{/* Stats */}
					{/* <div className="grid grid-cols-3 gap-4 border-t-4 border-black pt-6 mt-2 text-center">
						<div>
							<div className="text-3xl font-black">📉 81%</div>
							<div className="text-sm font-bold text-gray-600">
								Cost Reduction
							</div>
						</div>
						<div>
							<div className="text-3xl font-black">⚡ 3x</div>
							<div className="text-sm font-bold text-gray-600">Speedup</div>
						</div>
						<div>
							<div className="text-3xl font-black">🎯 95%</div>
							<div className="text-sm font-bold text-gray-600">
								Token Reduction
							</div>
						</div>
					</div> */}

					{/* Buttons */}
					<div className="flex flex-wrap gap-4 mt-1">
						<button className="bg-[#FFD700] text-black border-4 border-black px-6 py-3 rounded-full font-black hover:scale-105 active:scale-95 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2">
							View on Github <ArrowRight size={20} strokeWidth={3} />
						</button>
						<button className="bg-white text-black border-4 border-black px-6 py-3 rounded-full font-black hover:scale-105 active:scale-95 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2">
							<BookOpen size={20} strokeWidth={3} /> Documentation
						</button>
					</div>
				</div>

				{/* Right Column: Terminal Mockup */}
				<div className="relative">
					{/* Terminal Card */}
					<div className="bg-[#1a1a1a] border-4 border-black rounded-3xl p-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-white font-mono text-sm sm:text-base relative overflow-hidden min-h-[400px]">
						{/* Terminal Header */}
						<div className="flex gap-2 mb-6 opacity-80">
							<div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
							<div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
							<div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
						</div>

						{/* Content */}
						<div className="flex flex-col gap-4 mb-8">
							<div className="opacity-50 text-xs uppercase tracking-widest border-b border-white/20 pb-2 mb-2">
								Terminal
							</div>
							<div className="h-6">
								<span className="text-gray-400">$ </span>
								<span className="text-yellow-400">
									{typedCommand}
									<span className="animate-pulse">_</span>
								</span>
							</div>
							<div className="flex flex-col gap-2 text-gray-300 min-h-[120px]">
								{visibleLines >= 1 && (
									<div className="flex gap-2 items-center animate-in fade-in slide-in-from-left-2 duration-300">
										<span className="text-[#00D145]">✓</span> Smart detection:
										Planning workflow
									</div>
								)}
								{visibleLines >= 2 && (
									<div className="flex gap-2 items-center animate-in fade-in slide-in-from-left-2 duration-300">
										<span className="text-[#00D145]">✓</span> Spawning parallel
										frog agents...
									</div>
								)}
								{visibleLines >= 3 && (
									<div className="flex gap-2 items-center animate-in fade-in slide-in-from-left-2 duration-300">
										<span className="text-[#00D145]">✓</span> 5 tasks created in
										2 minutes
									</div>
								)}
								{visibleLines >= 4 && (
									<div className="flex gap-2 items-center text-[#00D145] font-bold animate-in fade-in slide-in-from-left-2 duration-300">
										<span className="">✓</span> 81% Cost Savings
									</div>
								)}
							</div>
						</div>

						{/* Input Box Mock */}
						<div className="bg-black/50 border-2 border-white/20 rounded-xl p-4 flex items-center justify-between gap-4 mt-auto">
							<code className="text-xs sm:text-sm text-gray-400 break-all">
								/plugin marketplace add gifmetune/main
							</code>
							<button
								onClick={handleCopy}
								className="bg-[#333] hover:bg-[#444] text-white p-2 rounded-lg transition-colors active:scale-95"
								title="Copy to clipboard"
							>
								{isCopied ? (
									<Check size={16} className="text-[#00D145]" />
								) : (
									<Copy size={16} />
								)}
							</button>
						</div>

						{/* Glow Effect */}
						<div className="absolute top-0 right-0 w-64 h-64 bg-[#00D145] opacity-5 blur-[100px] pointer-events-none"></div>
					</div>
				</div>
			</div>
		</div>
	);
}
