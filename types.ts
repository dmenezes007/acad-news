
export enum Category {
  GERAL = 'Geral',
  POS_GRADUACAO = 'Pós-Graduação e Pesquisa',
  INOVACAO_E_EXTENSAO = 'Inovação e Extensão',
  EDUCACAO_CORPORATIVA = 'Educação Corporativa',
  BIBLIOTECA = 'Biblioteca'
}

export enum Status {
  REALIZACAO = 'REALIZAÇÃO',
  PONTO_ATENCAO = 'PONTO DE ATENÇÃO',
  CASO_CRITICO = 'CASO CRÍTICO'
}

export interface Document {
  id: string;
  category: Category;
  title: string;
  description?: string;
  keywords?: string[];
  status: Status;
  date?: string;
  url?: string;
  pages?: number;
}

export type ModuleView = 'home' | Category;
