
import React from 'react';
import { Status } from '../types';
import { STATUS_COLORS } from '../constants';

interface PulseDotProps {
  status: Status;
}

const PulseDot: React.FC<PulseDotProps> = ({ status }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1 group relative">
      <div className={`w-3 h-3 rounded-full ${STATUS_COLORS[status]}`} />
      <span className="absolute -bottom-6 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-slate-500 whitespace-nowrap bg-white border px-1.5 rounded shadow-sm z-10 pointer-events-none">
        {status}
      </span>
    </div>
  );
};

export default PulseDot;
