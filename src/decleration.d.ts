declare module "*.jpg" {
    const value: string;
    export default value;
  }
  declare module "*.png" {
    const value: string;
    export default value;
  }

  declare global {
    const FIREBASE_HOSTING_URL: string;
    const API_BASE_URL: string;
    const CHROME_ID: string;
  }