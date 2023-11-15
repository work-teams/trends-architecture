import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import WelcomeView from './WelcomeView';
import DataValidationForm from './DataValidationForm';
import reportWebVitals from './reportWebVitals';
import DataValidationFace from './DataValidationFace';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeView />} />
        <Route path="/data-validation-form" element={<DataValidationForm />} />
        <Route path="/data-validation-face" element={<DataValidationFace />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);

reportWebVitals();