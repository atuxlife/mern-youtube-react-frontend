import React from 'react';
import reportWebVitals from './reportWebVitals';
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import VideoList from './components/Videos/VideoList';
import VideoForm from './components/Videos/VideoForm';
import Navbar from './components/Navbar/Navbar';

import 'react-toastify/dist/ReactToastify.min.css';
import 'bootswatch/dist/pulse/bootstrap.min.css';
import './index.css';

render(
  <React.StrictMode>
    <BrowserRouter>

      <Navbar />

      <div className="container p-4">
        <Routes>        
          <Route path="/" element={<VideoList />} />
          <Route path="/new-video" element={<VideoForm />} />
          <Route path="/update/:id" element={<VideoForm />} />
        </Routes>
        <ToastContainer />
      </div>

    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
