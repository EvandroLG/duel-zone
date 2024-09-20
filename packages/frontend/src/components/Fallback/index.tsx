type ErrorFallbackProps = {
  error: Error;
};

export function ErrorFallback({ error }: ErrorFallbackProps) {
  return (
    <div>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
}
