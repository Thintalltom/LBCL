import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';
import { store } from './store';
import { ClubProvider } from './context/ClubContext';
import { PlayerProvider } from './context/PlayerContext';
import { CoachProvider } from './context/CoachContext';
import { Header } from './components/Header';
import { ClubListingPage } from './pages/ClubListingPage';
import { ClubRegistrationPage } from './pages/ClubRegistrationPage';
import { ClubDetailsPage } from './pages/ClubDetailsPage';
function App() {
  return <Provider store={store}>
      <ClubProvider>
        <PlayerProvider>
          <CoachProvider>
            <Router>
              <div className="min-h-screen bg-[#F9FAFB] font-sans text-gray-900">
                <Header />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <Routes>
                    <Route path="/" element={<ClubListingPage />} />
                    <Route path="/clubs/new" element={<ClubRegistrationPage />} />
                    <Route path="/clubs/:id" element={<ClubDetailsPage />} />
                  </Routes>
                </main>
                <Toaster position="top-right" richColors closeButton toastOptions={{
                style: {
                  background: 'white'
                },
                className: 'toast'
              }} />
              </div>
            </Router>
          </CoachProvider>
        </PlayerProvider>
      </ClubProvider>
    </Provider>;
}
export { App };