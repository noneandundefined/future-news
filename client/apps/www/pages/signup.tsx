import { useState } from 'react';
import IndexLayout from '../components/layout/index-layout';
import { ToastContainer } from 'react-toastify';
import userAPI from '@/api/user.api';

const Signup = () => {
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	return (
		<IndexLayout>
			<ToastContainer
				position="bottom-right"
				autoClose={2500}
				hideProgressBar={true}
				newestOnTop={false}
				closeOnClick={true}
			/>

			<div className="text-white font-mono flex items-center justify-center relative overflow-hidden">
				<div className="z-10 bg-black/80 border border-gray-700 p-10 rounded-2xl shadow-[0_0_150px_#222] w-full max-w-md">
					<div className="text-center mb-8">
						<div className="text-4xl font-bold tracking-widest text-gray-500">
							THE FUTURE
						</div>
						<div className="text-sm text-gray-300 mt-1">
							Operative Signup Interface
						</div>
					</div>

					<div className="space-y-6">
						<div>
							<label htmlFor="username" className="block mb-1">
								Username
							</label>
							<input
								type="text"
								id="login"
								className="w-full bg-black border border-gray-700 px-4 py-2 rounded shadow-inner focus:outline-none focus:ring-2 focus:ring-gray-500"
								placeholder="anonymous1337"
								autoComplete="off"
								onChange={(e) => setUsername(e.target.value)}
								value={username}
							/>
						</div>

						<div>
							<label htmlFor="password" className="block mb-1">
								Password
							</label>
							<input
								type="password"
								id="password"
								className="w-full bg-black border border-gray-700 px-4 py-2 rounded shadow-inner focus:outline-none focus:ring-2 focus:ring-gray-500"
								placeholder="••••••••"
								onChange={(e) => setPassword(e.target.value)}
								value={password}
							/>
						</div>

						<button
							type="submit"
							className="w-full bg-gray-600 hover:bg-gray-500 text-black font-bold py-2 rounded shadow transition-all duration-150"
							onClick={async () => {
								await userAPI.signup(username, password);
							}}
						>
							SIGN UP
						</button>
					</div>

					<p className="text-xs text-gray-400 mt-6 text-center">
						Access granted only to The Future operatives.
					</p>
				</div>
			</div>
		</IndexLayout>
	);
};

export default Signup;
