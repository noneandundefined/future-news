const Fallback = () => {
	return (
		<div className="w-screen h-screen flex flex-col gap-3 justify-center items-center">
			<img src="/load.gif" alt="loading..." width={76} />
			<p className="opacity-80 text-white text-[14px]">
				One moment please...
			</p>
		</div>
	);
};

export default Fallback;
