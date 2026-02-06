import React, { useState } from 'react';
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
import Chatbot from './pages/Chatbot';
function App() {
  const [showBot, setShowBot] = useState<boolean>(false)
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
              <div className='relative max-w-7xl mx-auto  px-6 sm:px-2 lg:px-6'>
              {showBot ? (
                <button onClick={() => setShowBot(false)} className="absolute bottom-2 right-0 bg-[#FF6B35] text-white p-4 rounded-full shadow-lg hover:bg-[#e55a2b] transition-colors z-50">
                  <svg xmlns="XXXXXXXXXXXXXXXXXXXXXXXXXX" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button> 
              ) : (
                <button onClick={() => setShowBot(true)} className="absolute bottom-2 right-0 bg-[#FF6B35] text-white p-4 rounded-full shadow-lg hover:bg-[#e55a2b] transition-colors z-50">
                  <svg xmlns="XXXXXXXXXXXXXXXXXXXXXXXXXX" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </button>
              )}
             {showBot && ( <Chatbot  />)}
              </div>
            </Router>
          </CoachProvider>
        </PlayerProvider>
      </ClubProvider>
    </Provider>;
}
export { App };