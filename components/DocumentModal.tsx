
import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, FileText, Download, Share2 } from 'lucide-react';
import { Document } from '../types';

interface DocumentModalProps {
  document: Document | null;
  onClose: () => void;
}

const DocumentModal: React.FC<DocumentModalProps> = ({ document, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  if (!document) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="bg-white w-full max-w-5xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <FileText size={20} />
            </div>
            <div>
              <h2 className="font-bold text-slate-800 leading-tight">{document.title}</h2>
              <p className="text-xs text-slate-500">{document.category} • {document.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {document.url && document.url !== '#' && (
              <a 
                href={document.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Download size={16} /> Baixar
              </a>
            )}
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content Viewer */}
        <div className="flex-grow bg-slate-50 overflow-auto p-8 flex flex-col items-center">
          {/* Simulated PDF Page */}
          <div className="bg-white w-[700px] min-h-[900px] shadow-lg rounded-sm border border-slate-200 p-12 flex flex-col mb-8 relative">
            <div className="absolute top-4 right-4 text-[10px] text-slate-300 uppercase tracking-widest font-bold">
              ACAD VIEW - INPI
            </div>
            
            <div className="mb-12 border-b-2 border-slate-800 pb-4">
              <h1 className="text-3xl font-serif text-slate-800 mb-2">{document.title}</h1>
              <div className="flex justify-between items-center italic text-slate-500 text-sm font-serif">
                <span>Versão Oficial da Gestão</span>
                <span>Página {currentPage} de {document.pages}</span>
              </div>
            </div>

            <div className="flex-grow font-serif text-slate-700 leading-relaxed space-y-6">
              <p className="first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-slate-800">
                Este é um simulador de visualização de documentos para a aplicação ACAD VIEW. 
                Os documentos reais seriam carregados via PDF.js ou similar para garantir a experiência de folhear páginas.
              </p>
              <div className="h-4 w-3/4 bg-slate-100 rounded"></div>
              <div className="h-4 w-full bg-slate-100 rounded"></div>
              <div className="h-4 w-full bg-slate-100 rounded"></div>
              <div className="h-4 w-5/6 bg-slate-100 rounded"></div>
              <div className="h-4 w-2/3 bg-slate-100 rounded"></div>
              
              <div className="py-8">
                <h4 className="font-bold text-slate-800 mb-4 uppercase text-sm tracking-wide">Descrição do Documento</h4>
                <p>{document.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-8 py-4">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded">
                  <h5 className="font-bold text-[10px] uppercase text-slate-400 mb-2">Palavras-chave</h5>
                  <div className="flex flex-wrap gap-2">
                    {document.keywords.map(k => <span key={k} className="text-xs text-blue-600">#{k}</span>)}
                  </div>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded">
                  <h5 className="font-bold text-[10px] uppercase text-slate-400 mb-2">Metadata</h5>
                  <p className="text-xs text-slate-600">Status: {document.status}</p>
                  <p className="text-xs text-slate-600">Data de Coleta: {document.date}</p>
                </div>
              </div>

              <div className="h-64 w-full bg-slate-100 rounded flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-200">
                Área para Elementos Gráficos / Tabelas
              </div>
            </div>

            <div className="mt-auto pt-8 border-t border-slate-100 flex justify-center opacity-30 grayscale">
              <img 
                src="https://www.gov.br/inpi/pt-br/assuntos/fale-conosco/arquivos-de-logo-do-inpi/inpi_cor_positiva.png" 
                alt="INPI" 
                className="h-8"
              />
            </div>
          </div>
        </div>

        {/* Footer / Pagination */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-center gap-6 bg-white sticky bottom-0">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-slate-600 transition-colors"
          >
            <ChevronLeft size={20} /> Anterior
          </button>
          
          <div className="px-4 py-1.5 bg-slate-100 rounded-full text-xs font-bold text-slate-500">
            PÁGINA {currentPage} / {document.pages}
          </div>

          <button 
            disabled={currentPage === document.pages}
            onClick={() => setCurrentPage(prev => Math.min(document.pages, prev + 1))}
            className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-slate-600 transition-colors"
          >
            Próxima <ChevronRight size={20} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default DocumentModal;
