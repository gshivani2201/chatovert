const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:4173",
    process.env.CLIENT_URL,
  ],
  credentials: true,
};

const APP_TOKEN = "app-token";

export { corsOptions, APP_TOKEN };
