// import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Trophy } from 'lucide-react';
// import { Button } from './ui/Button';
export function Header() {
  const location = useLocation();
  // const isListingPage = location.pathname === '/';
  return <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-[#FF6B35] p-2 rounded-lg group-hover:bg-[#e55a2b] transition-colors">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              LAGOS BASKETBALL COMMUNITY LEAGUE 
              {/* <span className="text-[#FF6B35]">League</span> */}
            </span>
          </Link>

          {/* {isListingPage && <Link to="/clubs/new">
              <Button>Add New Club</Button>
            </Link>} */}
        </div>
      </div>
    </header>;
}