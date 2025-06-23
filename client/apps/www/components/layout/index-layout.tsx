import type { ReactNode } from 'react';

type IndexLayoutProps = {
	children: ReactNode;
};

const IndexLayout: React.FC<IndexLayoutProps> = ({ children }) => {
	return (
		<>
			<div className="min-h-[95vh] m-6 border border-[#222] rounded-[20px]">
				<div className="max-h-[5rem]">
					<Header
				</div>
				<div className="p-6">{children}</div>
			</div>
		</>
	);
};

export default IndexLayout;
