import React from 'react';
import Header from './components/Header';
import { OfflineStatusBanner } from './components/OfflineStatusBanner';

export default function App() {
  return (
    <div>
      <Header />
      <OfflineStatusBanner />
      <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h1>Gabarita AI</h1>
        <p>Estrutura base no ar! Em breve com todos os módulos.</p>
      </div>
    </div>
  );
}
