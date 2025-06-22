import { config } from '@/app/config/config.client';
import React, { type ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    error?: Error;
    hasError: boolean;
}

class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    state = { hasError: false, error: new Error() };

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    render() {
        if (this.state.hasError) {
            return (
                <>
                    {config.type.release === 'prod' ? (
                        <main className="flex flex-col items-center justify-center h-screen w-screen">
                            <h1 className="my-5">Что-то пошло не так.</h1>
                            <p>
                                Пожалуйста, обновите страницу или попробуйте
                                позже.
                            </p>
                        </main>
                    ) : (
                        <main className="flex flex-col items-center justify-center h-screen w-screen">
                            <h1 className="my-5">Что-то пошло не так.</h1>
                            <p className="bg-[#000] text-[#ff0000] py-7 px-2">
                                {this.state.error.stack}
                            </p>
                        </main>
                    )}
                </>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
