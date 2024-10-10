import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import App from './App/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './App/shared/components/layout/header';
import Footer from './App/shared/components/layout/footer';
import BackButtonLayout from './App/shared/components/layout/backButton';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <div className="flex-grow-1">
          <BackButtonLayout>
            <App />
          </BackButtonLayout>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
