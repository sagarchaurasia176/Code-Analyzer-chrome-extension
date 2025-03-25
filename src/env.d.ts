// src/env.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
      readonly FIREBASE_HOSTING_URL: string;
      readonly API_BASE_URL: string;
      readonly CHROME_ID: string;
    }
  }
  