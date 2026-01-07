
import React from 'react';
import { 
  Home, 
  LayoutGrid, 
  GraduationCap, 
  Rocket, 
  BookOpen, 
  Library,
  FileText,
  AlertCircle,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { Category, Status, Document } from './types';

export const MOCK_DOCUMENTS: Document[] = [
  {
    id: '1',
    category: Category.GERAL,
    title: 'Relatório de Gestão 2023',
    description: 'Panorama consolidado das atividades da Academia no último exercício.',
    keywords: ['Gestão', 'Relatório', 'Anual', 'Metas'],
    status: Status.REALIZACAO,
    date: '15/01/2024',
    url: '#',
    pages: 45
  },
  {
    id: '2',
    category: Category.POS_GRADUACAO,
    title: 'Edital Mestrado Profissional 2024',
    description: 'Regras e cronograma para o processo seletivo do Mestrado Profissional em PI e Inovação.',
    keywords: ['Mestrado', 'Edital', 'Pós-Graduação', 'Seleção'],
    status: Status.PONTO_ATENCAO,
    date: '02/02/2024',
    url: '#',
    pages: 12
  },
  {
    id: '3',
    category: Category.INOVACAO,
    title: 'Plano de Extensão Tecnológica',
    description: 'Iniciativas de aproximação com o setor produtivo e transferência de tecnologia.',
    keywords: ['Extensão', 'Inovação', 'Parceria', 'Indústria'],
    status: Status.REALIZACAO,
    date: '10/12/2023',
    url: '#',
    pages: 28
  },
  {
    id: '4',
    category: Category.EDUCACAO_CORPORATIVA,
    title: 'Capacitação Interna: Inteligência Artificial',
    description: 'Programa de treinamento para examinadores sobre ferramentas de IA generativa.',
    keywords: ['IA', 'Treinamento', 'Servidores', 'Capacitação'],
    status: Status.CASO_CRITICO,
    date: '20/02/2024',
    url: '#',
    pages: 8
  },
  {
    id: '5',
    category: Category.BIBLIOTECA,
    title: 'Acervo Digital: Teses de Patentes',
    description: 'Catalogação das novas teses defendidas no período 2020-2023.',
    keywords: ['Acervo', 'Biblioteca', 'Teses', 'Pesquisa'],
    status: Status.REALIZACAO,
    date: '05/01/2024',
    url: '#',
    pages: 150
  },
  {
    id: '6',
    category: Category.POS_GRADUACAO,
    title: 'Relatório de Pesquisas em Biotecnologia',
    description: 'Levantamento de evidências sobre o avanço das patentes biotecnológicas no Brasil.',
    keywords: ['Biotecnologia', 'Pesquisa', 'Evidência'],
    status: Status.REALIZACAO,
    date: '11/11/2023',
    url: '#',
    pages: 34
  },
  {
    id: '7',
    category: Category.GERAL,
    title: 'Planejamento Estratégico 2024-2027',
    description: 'Documento base com os objetivos estratégicos da Academia para o próximo quadriênio.',
    keywords: ['Estratégia', 'Futuro', 'Planejamento'],
    status: Status.PONTO_ATENCAO,
    date: '01/03/2024',
    url: '#',
    pages: 60
  }
];

export const SIDEBAR_ITEMS = [
  { id: 'home', label: 'Início', icon: <Home size={20} />, view: 'home' },
  { id: 'geral', label: 'Geral', icon: <LayoutGrid size={20} />, view: Category.GERAL },
  { id: 'pos', label: 'Pós-Graduação', icon: <GraduationCap size={20} />, view: Category.POS_GRADUACAO },
  { id: 'inov', label: 'Inovação', icon: <Rocket size={20} />, view: Category.INOVACAO },
  { id: 'edu', label: 'Educação', icon: <BookOpen size={20} />, view: Category.EDUCACAO_CORPORATIVA },
  { id: 'bib', label: 'Biblioteca', icon: <Library size={20} />, view: Category.BIBLIOTECA },
];

export const STATUS_COLORS = {
  [Status.REALIZACAO]: 'bg-green-500 pulse-green',
  [Status.PONTO_ATENCAO]: 'bg-yellow-500 pulse-yellow',
  [Status.CASO_CRITICO]: 'bg-red-500 pulse-red',
};
