
// Environment configuration for different deployment scenarios
export const config = {
  apiUrl: process.env.NODE_ENV === 'production' 
    ? '' // Use relative URLs in production
    : 'http://localhost:5000',
  
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
} as const;
