import MainErrorFallback from "@/components/errors/main-error-fallback";
import { ErrorBoundary } from "react-error-boundary";
import * as React from "react";
import { AuthProvider } from "@/features/auth/provider";
import { Toaster } from "@/components/ui/toast";

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
          <Toaster />
        </AuthProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
}
