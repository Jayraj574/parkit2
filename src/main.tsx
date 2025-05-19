import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { connectDB } from './lib/db';

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log('MongoDB connected successfully');
    // Only render the app after successful DB connection
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  })
  .catch((error) => {
    console.error('Failed to start application:', error);
  });