import React from 'react';
import ReactDOM from 'react-dom/client';
import { ethers } from 'ethers';
import './index.css';
import App from './App';

declare global {
  interface Window {
    ethereum: ethers.providers.ExternalProvider & {
      request: ((request: {
        method: string
        params: any[]
    }) => Promise<any>)
    }
  }
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
