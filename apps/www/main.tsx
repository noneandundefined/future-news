import './index.css';
import Router from './router';

import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';

import Fallback from './components/layout/fallback';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
	const ErrorFallback = (
		<main className="flex flex-col items-center justify-center h-screen w-screen">
			<h1 className="my-5">Что-то пошло не так.</h1>
			<p>Пожалуйста, обновите страницу или попробуйте позже.</p>
		</main>
	);

	return (
		<ErrorBoundary fallback={ErrorFallback}>
			<Suspense fallback={<Fallback />}>
				<Router />
			</Suspense>
		</ErrorBoundary>
	);
};

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);
