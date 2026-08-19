import MainErrorFallback from "@/components/errors/main-error-fallback";
import { ErrorBoundary } from "react-error-boundary";
import * as React from "react";
import { AuthProvider } from "@/lib/auth-provider";

interface AppProviderProps {
  children: React.ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <p>Cargando página</p>
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
}
