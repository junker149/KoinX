declare namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      MONGO_URI: string;
      API_KEY: string;
    }
  }
  