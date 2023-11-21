import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import WelcomeView from './views/WelcomeView';
import DataValidationForm from './views/DataValidationForm';
import reportWebVitals from './components/reportWebVitals';
import DataValidationFace from './views/DataValidationFace';

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
