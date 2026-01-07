
import React, { useState } from 'react';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === 'ACAD_VIEW_DM') {
      setError(false);
      onLogin();
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Card de Login */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock size={32} />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'Roboto Mono, monospace', fontWeight: 300 }}>
              ACAD VIEW
            </h1>
            <p className="text-sm text-slate-600 font-medium">
              Acesso Restrito à Coordenação da Academia do INPI
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                Senha de Acesso
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  className={`w-full px-4 py-3 pr-12 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                    error 
                      ? 'border-red-300 focus:ring-red-200 bg-red-50' 
                      : 'border-slate-200 focus:ring-blue-200 focus:border-blue-400'
                  }`}
                  placeholder="Digite sua senha"
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              {error && (
                <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  <span>Senha incorreta. Tente novamente.</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Acessar Sistema
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <p className="text-xs text-slate-400 text-center">
              Sistema de gestão de informações acadêmicas
            </p>
          </div>
        </div>

        {/* Bottom text */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Davison Menezes © 2024 • ACAD VIEW
        </p>
      </div>
    </div>
  );
};

export default Login;
