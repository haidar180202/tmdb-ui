import './index.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Film } from 'lucide-react';
import { HomePage } from './pages/Home/Home.page';
import { DetailPage } from './pages/Detail/Detail.page';

function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <Film className="w-6 h-6 text-amber-500 group-hover:scale-110 transition-transform" />
          <span className="text-lg font-bold text-white tracking-tight">CineStream</span>
        </Link>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<DetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
