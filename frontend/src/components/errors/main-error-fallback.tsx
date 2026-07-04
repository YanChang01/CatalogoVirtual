export default function MainErrorFallback() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-background"
      role="alert"
    >
      <h2 className="text-xl font-semibold mb-4">Parece que hubo un error</h2>
      <button
        className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-sm tracking-wide uppercase hover:bg-primary/90 transition-colors duration-200"
        onClick={() => window.location.assign(window.location.origin)}
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
