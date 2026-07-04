const createEnv = () => {
  const envVars = {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  };
  return envVars;
};

export const localEnv = createEnv();
