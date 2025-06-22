import type { ReactNode } from 'react';

type IndexLayoutProps = {
	children: ReactNode;
};

const IndexLayout: React.FC<IndexLayoutProps> = ({ children }) => {
	return (
		<>
			<div className="min-h-[95vh] m-6 border border-[#222] rounded-[20px]">
				<div className="max-h-[5rem]">
					<header className="z-10 flex justify-between items-center px-6 py-4 border-b border-[#222]">
						<div />
						<nav className="flex space-x-6 text-sm">
							<div className="flex items-center gap-3">
								<div className="h-3 w-3 bg-[#ff0000d9] rounded-full" />
								<p className="text-white">LIVE</p>
							</div>
						</nav>
					</header>
				</div>
				<div className="p-6">{children}</div>
			</div>
		</>
	);
};

export default IndexLayout;
