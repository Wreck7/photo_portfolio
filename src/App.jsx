import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Snowfall from 'react-snowfall';
import HomePage from '@/pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      {/* Snowfall overlay */}
      <Snowfall
        color="#ffffff7a"
        snowflakeCount={120}
        speed={[0.5, 1]}
        wind={[-0.5, 0.5]}
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;