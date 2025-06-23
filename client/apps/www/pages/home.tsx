import { useEffect, useRef } from 'react';
import IndexLayout from '../components/layout/index-layout';
import { COLORS } from '../constants/colors';

const Home = () => {
	const chatRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (chatRef.current) {
			chatRef.current.scrollTop = chatRef.current.scrollHeight;
		}
	}, []);

	return (
		<IndexLayout>
			<div className="text-gray-400 relative overflow-hidden">
				<main className="z-10 relative p-6 flex flex-col lg:flex-row gap-6">
					<div className="flex-1 bg-black border border-gray-700 rounded-xl shadow-[0_0_150px_#222] p-4">
						<div className="w-full aspect-video bg-gray-950 flex items-center justify-center text-gray-400 text-xl">
							<div className="flex flex-col items-center gap-3">
								<img
									src="/future-logo.png"
									alt=""
									className="opacity-20 max-w-[10rem]"
								/>
								<p className="text-[14px] opacity-70">
									Your future is in our hands.
								</p>
							</div>
						</div>
						<div className="mt-4 flex justify-between text-sm text-gray-500">
							<span>NOW STREAMING: The leader #thef</span>
							<div className="flex items-center gap-2">
								<div className="h-2 w-2 bg-[#ff0000d9] rounded-full" />
								<span className="flex items-center gap-1">
									3,451 viewers
								</span>
							</div>
						</div>
					</div>

					<div className="w-full lg:w-1/3 bg-black border border-gray-800 rounded-xl p-4 flex flex-col max-h-[75vh]">
						<div className="text-gray-300 font-semibold mb-2">
							CHAT
						</div>
						<div
							ref={chatRef}
							className="flex-1 overflow-y-auto text-md space-y-1 tracking-wide scrollbar-hide opacity-80"
						>
							{Array.from({ length: 40 }, (_, i) => (
								<p
									key={i}
									style={{
										color: COLORS[
											Math.floor(
												Math.random() * COLORS.length
											)
										],
									}}
								>
									~: message {i + 1}
								</p>
							))}
						</div>
						<div className="border-t border-gray-700 pt-3">
							<input
								type="text"
								placeholder="Type a message..."
								className="w-full px-3 py-2 rounded-md bg-[#0a0a0a] border border-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00ffcc] focus:border-transparent"
							/>
						</div>
					</div>
				</main>
			</div>
		</IndexLayout>
	);
};

export default Home;
