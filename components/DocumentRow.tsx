
import React from 'react';
import { Eye, FileText } from 'lucide-react';
import { Document } from '../types';
import PulseDot from './PulseDot';

interface DocumentRowProps {
  doc: Document;
  onClick: (doc: Document) => void;
}

const DocumentRow: React.FC<DocumentRowProps> = ({ doc, onClick, onDownload }) => {
  return (
    <div 
      onClick={() => onClick(doc)}
      className="group flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all cursor-pointer mb-3"
    >
      <div className="flex-shrink-0 w-10 flex justify-center">
        <PulseDot status={doc.status} />
      </div>

      <div className="flex-grow min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider">
            {doc.category}
          </span>
          {doc.date && <span className="text-xs text-slate-400">• {doc.date}</span>}
        </div>
        
        <h3 className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors truncate">
          {doc.title}
        </h3>
        
        {doc.description && (
          <p className="text-xs text-slate-500 line-clamp-1 mt-1">
            {doc.description}
          </p>
        )}

        {doc.keywords && doc.keywords.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {doc.keywords.map(kw => (
              <span key={kw} className="text-[9px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded italic">
                #{kw}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 pr-2">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onClick(doc);
          }}
          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          title="Visualizar"
        >
          <Eye size={18} />
        </button>
      </div>
    </div>
  );
};

export default DocumentRow;
