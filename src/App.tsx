import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import PremamCV from './pages/PremamCV';
import Prediction from './pages/Prediction';

import './utils/floatingHearts';
import LoveQuiz from './pages/LoveQuiz';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const username = localStorage.getItem('username');
  if (!username) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/premam-cv"
              element={
                <PrivateRoute>
                  <PremamCV />
                </PrivateRoute>
              }
            />
            <Route
              path="/thatkudumbamkalaki"
              element={
                <PrivateRoute>
                  <Prediction />
                </PrivateRoute>
              }
            />
            <Route
              path="/premam-meter"
              element={
                <PrivateRoute>
                  <LoveQuiz />
                </PrivateRoute>
              }
            />
          </Routes>
        </AnimatePresence>
      </Layout>
    </Router>
  );
}

export default App;