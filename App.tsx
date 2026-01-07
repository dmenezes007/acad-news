
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ArrowRight, 
  ChevronRight, 
  GraduationCap, 
  Rocket, 
  BookOpen, 
  Library as LibraryIcon,
  LayoutGrid,
  Info
} from 'lucide-react';
import Sidebar from './components/Sidebar';
import DocumentRow from './components/DocumentRow';
import DocumentModal from './components/DocumentModal';
import Login from './components/Login';
import { Category, ModuleView, Document } from './types';
import { MOCK_DOCUMENTS } from './constants';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<ModuleView>('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  const handleNavigate = (view: ModuleView) => {
    setCurrentView(view);
    setSearchTerm('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredDocuments = useMemo(() => {
    return MOCK_DOCUMENTS.filter((doc) => {
      // Filter by category if not in "Geral" or "home"
      const categoryMatch = currentView === 'home' || currentView === Category.GERAL || doc.category === currentView;
      
      if (!categoryMatch) return false;

      // Search matching
      if (!searchTerm) return true;

      const term = searchTerm.toLowerCase();
      return (
        doc.title.toLowerCase().includes(term) ||
        doc.description.toLowerCase().includes(term) ||
        doc.category.toLowerCase().includes(term) ||
        doc.keywords.some(k => k.toLowerCase().includes(term))
      );
    });
  }, [currentView, searchTerm]);

  const renderHome = () => (
    <div className="space-y-12 max-w-7xl mx-auto">
      <header className="space-y-2">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: 'Fira Mono, monospace' }}>
          ACAD VIEW
        </h1>
        <p className="text-lg text-slate-500 font-medium leading-relaxed">
          Coletânea de dados, fatos, eventos e evidências gerenciais e de controle da Coordenação da Academia do INPI.
        </p>
      </header>

      {/* Featured/Geral Section */}
      <div 
        onClick={() => handleNavigate(Category.GERAL)}
        className="bg-slate-900 rounded-[2rem] p-10 text-white flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group cursor-pointer"
      >
        <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-700"></div>
        <div className="flex-grow z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500 text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
            Módulo Geral
          </div>
          <h2 className="text-4xl font-bold mb-4">Visão Consolidada</h2>
          <p className="text-slate-300 max-w-xl text-lg mb-8 leading-relaxed">
            Acesse as informações comuns e transversais a todos os módulos, incluindo relatórios anuais de gestão e planejamento estratégico.
          </p>
          <div className="flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-bold rounded-xl w-fit group-hover:scale-105 transition-transform">
            Entrar no Módulo Geral <ArrowRight size={20} />
          </div>
        </div>
        <div className="w-full md:w-1/3 flex justify-center z-10">
          <img src="https://img.icons8.com/3d-fluency/200/trophy.png" alt="" className="w-48 h-48 object-contain" />
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Quadrant 1: Pós-Graduação */}
        <div 
          onClick={() => handleNavigate(Category.POS_GRADUACAO)}
          className="group relative h-96 bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col"
          style={{
            backgroundImage: 'linear-gradient(rgba(148, 163, 184, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.05) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        >
          
          <div className="relative z-10 h-full flex flex-col">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-auto group-hover:rotate-12 transition-transform duration-300 overflow-hidden p-2">
              <img src="https://img.icons8.com/3d-fluency/94/graduation-cap.png" alt="" className="w-full h-full object-contain" />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Pós-Graduação e Pesquisa</h2>
              <p className="text-slate-500 text-sm mb-6 max-w-xs">Documentos acadêmicos, editais de mestrado, doutorado e relatórios científicos.</p>
              
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white w-fit rounded-full text-sm font-semibold group-hover:bg-blue-600 transition-colors">
                Ver Módulo <ArrowRight size={16} />
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 right-0 opacity-5 scale-150 group-hover:scale-[1.7] transition-transform duration-700 w-64 h-64">
             <img src="https://img.icons8.com/3d-fluency/94/graduation-cap.png" alt="" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Quadrant 2: Inovação */}
        <div 
          onClick={() => handleNavigate(Category.INOVACAO)}
          className="group relative h-96 bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:border-cyan-400 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col"
          style={{
            backgroundImage: 'linear-gradient(rgba(148, 163, 184, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.05) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/20 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10 h-full flex flex-col">
            <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-auto group-hover:rotate-12 transition-transform duration-300 overflow-hidden p-2">
              <img src="https://img.icons8.com/3d-fluency/94/rocket.png" alt="" className="w-full h-full object-contain" />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Inovação e Extensão</h2>
              <p className="text-slate-500 text-sm mb-6 max-w-xs">Parcerias estratégicas, transferência de tecnologia e novos projetos de mercado.</p>
              
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white w-fit rounded-full text-sm font-semibold group-hover:bg-cyan-600 transition-colors">
                Ver Módulo <ArrowRight size={16} />
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 right-0 opacity-5 scale-150 group-hover:scale-[1.7] transition-transform duration-700 w-64 h-64">
             <img src="https://img.icons8.com/3d-fluency/94/rocket.png" alt="" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Quadrant 3: Educação */}
        <div 
          onClick={() => handleNavigate(Category.EDUCACAO_CORPORATIVA)}
          className="group relative h-96 bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col"
          style={{
            backgroundImage: 'linear-gradient(rgba(148, 163, 184, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.05) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        >
          
          <div className="relative z-10 h-full flex flex-col">
            <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-auto group-hover:rotate-12 transition-transform duration-300 overflow-hidden p-2">
              <img src="https://img.icons8.com/3d-fluency/94/open-book.png" alt="" className="w-full h-full object-contain" />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Educação Corporativa</h2>
              <p className="text-slate-500 text-sm mb-6 max-w-xs">Treinamentos internos, capacitação técnica e desenvolvimento de talentos.</p>
              
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white w-fit rounded-full text-sm font-semibold group-hover:bg-amber-600 transition-colors">
                Ver Módulo <ArrowRight size={16} />
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 right-0 opacity-5 scale-150 group-hover:scale-[1.7] transition-transform duration-700 w-64 h-64">
             <img src="https://img.icons8.com/3d-fluency/94/open-book.png" alt="" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Quadrant 4: Biblioteca */}
        <div 
          onClick={() => handleNavigate(Category.BIBLIOTECA)}
          className="group relative h-96 bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:border-emerald-400 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col"
          style={{
            backgroundImage: 'linear-gradient(rgba(148, 163, 184, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.05) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        >
          
          <div className="relative z-10 h-full flex flex-col">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-auto group-hover:rotate-12 transition-transform duration-300 overflow-hidden p-2">
              <img src="https://img.icons8.com/3d-fluency/94/book.png" alt="" className="w-full h-full object-contain" />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Biblioteca</h2>
              <p className="text-slate-500 text-sm mb-6 max-w-xs">Acervo histórico, acesso a bases de dados e repositórios de conhecimento.</p>
              
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white w-fit rounded-full text-sm font-semibold group-hover:bg-emerald-600 transition-colors">
                Ver Módulo <ArrowRight size={16} />
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 right-0 opacity-5 scale-150 group-hover:scale-[1.7] transition-transform duration-700 w-64 h-64">
             <img src="https://img.icons8.com/3d-fluency/94/book.png" alt="" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderModule = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            <span className="cursor-pointer hover:text-blue-600" onClick={() => handleNavigate('home')}>Início</span>
            <ChevronRight size={12} />
            <span className="text-blue-600">{currentView}</span>
          </nav>
          <h1 className="text-4xl font-extrabold text-slate-900">{currentView}</h1>
          <p className="text-slate-500 mt-2 max-w-2xl leading-relaxed">
            Documentos e evidências específicos para a categoria de {currentView.toString().toLowerCase()}.
          </p>
        </div>
        
        <div className="relative group w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
          <input 
            type="text"
            placeholder="Pesquisar documentos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="bg-slate-100/50 rounded-3xl p-6 md:p-8 min-h-[60vh]">
        {filteredDocuments.length > 0 ? (
          <div className="grid grid-cols-1 gap-1">
            {filteredDocuments.map(doc => (
              <DocumentRow 
                key={doc.id} 
                doc={doc} 
                onClick={(d) => setSelectedDoc(d)}
                onDownload={(d) => alert(`Iniciando download de: ${d.title}`)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-20 text-slate-400">
            <Info size={48} className="mb-4 opacity-20" />
            <p className="text-lg font-medium">Nenhum documento encontrado.</p>
            <p className="text-sm">Tente ajustar seus filtros ou termos de pesquisa.</p>
          </div>
        )}
      </div>
    </div>
  );

  // Verificação de autenticação
  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar currentView={currentView} onViewChange={handleNavigate} />
      
      <main className="pl-16 md:pl-20 py-12 pr-6 md:pr-12 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          {currentView === 'home' ? renderHome() : renderModule()}
        </div>
      </main>

      <DocumentModal 
        document={selectedDoc} 
        onClose={() => setSelectedDoc(null)} 
      />

      {/* Footer Branding */}
      <footer className="pl-16 md:pl-20 py-12 flex justify-center text-slate-400">
        <div className="flex flex-col items-center gap-4">
          <img 
            src="https://www.gov.br/inpi/pt-br/assuntos/fale-conosco/arquivos-de-logo-do-inpi/inpi_cor_positiva.png" 
            alt="Logo INPI" 
            className="h-10 opacity-20 grayscale"
          />
          <p className="text-[10px] uppercase font-bold tracking-widest">
            Academia do INPI © 2024 • ACAD VIEW
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
