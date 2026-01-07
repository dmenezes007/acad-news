
import React from 'react';
import { SIDEBAR_ITEMS } from '../constants';
import { ModuleView } from '../types';

interface SidebarProps {
  currentView: ModuleView;
  onViewChange: (view: ModuleView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-16 bg-white border-r border-slate-200 flex flex-col items-center py-6 z-50 transition-all duration-300">
      <div className="mb-10 text-blue-600">
        <img 
          src="https://www.gov.br/inpi/pt-br/assuntos/fale-conosco/arquivos-de-logo-do-inpi/inpi_cor_positiva.png" 
          alt="INPI Logo" 
          className="w-10 h-auto grayscale brightness-50"
        />
      </div>
      
      <nav className="flex flex-col gap-4">
        {SIDEBAR_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.view as ModuleView)}
            title={item.label}
            className={`p-3 rounded-xl transition-all duration-200 group relative ${
              currentView === item.view 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
            }`}
          >
            {item.icon}
            
            {/* Tooltip for desktop */}
            <span className="absolute left-14 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
              {item.label}
            </span>
          </button>
        ))}
      </nav>
      
      <div className="mt-auto">
        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
          AC
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
