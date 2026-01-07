# Guia de Atualização de Conteúdo - ACAD VIEW

## 📋 Visão Geral

Este guia explica como substituir os dados exemplificativos por informações reais na aplicação ACAD VIEW.

## 🗂️ Estrutura de Dados

### Arquivo Principal
- **Localização**: `data/documents.json`
- **Formato**: JSON Array
- **Função**: Armazena todos os documentos que serão exibidos na aplicação

### Campos de Cada Documento

```json
{
  "id": "string único (ex: '1', '2', 'doc001')",
  "category": "GERAL | POS_GRADUACAO | INOVACAO | EDUCACAO_CORPORATIVA | BIBLIOTECA",
  "title": "Título do documento",
  "description": "Descrição detalhada do conteúdo",
  "keywords": ["array", "de", "palavras-chave"],
  "status": "REALIZACAO | PONTO_ATENCAO | CASO_CRITICO",
  "date": "DD/MM/AAAA",
  "url": "caminho para o arquivo (ver seção abaixo)",
  "pages": número_de_páginas
}
```

## 📁 Gerenciamento de Arquivos PDF/Documentos

### Opção 1: Arquivos Locais (Desenvolvimento/Testes)

**Pasta**: `public/documentos/`

1. Criar a pasta `documentos` dentro de `public/`
2. Adicionar os arquivos PDF nesta pasta
3. Referenciar no JSON como: `"/documentos/nome-do-arquivo.pdf"`

**Exemplo**:
```bash
public/
└── documentos/
    ├── relatorio-gestao-2023.pdf
    ├── edital-mestrado-2024.pdf
    └── plano-extensao.pdf
```

```json
{
  "id": "1",
  "title": "Relatório de Gestão 2023",
  "url": "/documentos/relatorio-gestao-2023.pdf",
  ...
}
```

### Opção 2: URLs Externas (Produção Recomendada)

Hospedar documentos em serviço de armazenamento em nuvem:

**Serviços Recomendados**:
- **Google Drive** (público)
- **Vercel Blob Storage**
- **AWS S3**
- **Azure Blob Storage**
- **SharePoint** (se disponível no INPI)

**Exemplo com Google Drive**:
```json
{
  "id": "1",
  "url": "https://drive.google.com/file/d/ID_DO_ARQUIVO/view",
  ...
}
```

**Exemplo com Vercel Blob**:
```json
{
  "id": "1",
  "url": "https://seu-blob-url.vercel-storage.com/documento.pdf",
  ...
}
```

## 🔄 Processo de Atualização

### Passo 1: Preparar os Documentos
1. Reunir todos os PDFs/documentos reais
2. Renomear com nomes descritivos sem espaços (use hífens)
3. Fazer upload para o serviço escolhido OU colocar em `public/documentos/`

### Passo 2: Editar o JSON
1. Abrir `data/documents.json`
2. Substituir/adicionar entradas com dados reais
3. **Importante**: Manter os documentos ordenados por data (mais antigo primeiro)

**Exemplo de Ordenação**:
```json
[
  {
    "date": "10/12/2023",  // Mais antigo
    ...
  },
  {
    "date": "15/01/2024",  // Intermediário
    ...
  },
  {
    "date": "01/03/2024",  // Mais recente
    ...
  }
]
```

### Passo 3: Integrar com a Aplicação

Editar `constants.tsx`:

```typescript
import documentsData from './data/documents.json';

// Substituir MOCK_DOCUMENTS por:
export const MOCK_DOCUMENTS: Document[] = documentsData;
```

### Passo 4: Validar
1. Executar `npm run dev`
2. Verificar se todos os documentos aparecem
3. Testar clique em cada documento
4. Confirmar que os PDFs abrem corretamente

## 📊 Categorias Disponíveis

- **GERAL**: Informações administrativas e de gestão
- **POS_GRADUACAO**: Programas de mestrado e pós-graduação
- **INOVACAO**: Extensão, pesquisa e inovação
- **EDUCACAO_CORPORATIVA**: Capacitações e treinamentos internos
- **BIBLIOTECA**: Acervo, catalogação e publicações

## 🎯 Status dos Documentos

- **REALIZACAO**: ✅ Atividade concluída ou em bom andamento (verde)
- **PONTO_ATENCAO**: ⚠️ Requer atenção ou monitoramento (amarelo)
- **CASO_CRITICO**: 🔴 Situação crítica ou urgente (vermelho)

## 💡 Dicas e Boas Práticas

### IDs Únicos
Use padrão sequencial ou descritivo:
```json
"id": "1"           // Simples
"id": "doc001"      // Descritivo
"id": "geral-001"   // Com categoria
```

### URLs de Documentos
- **Locais**: Sempre iniciar com `/` (ex: `/documentos/arquivo.pdf`)
- **Google Drive**: `https://drive.google.com/file/d/ID/view`
- **Links Web**: Qualquer URL válida (ex: `https://portal.inpi.gov.br/docs/arquivo.pdf`)
- **SharePoint/OneDrive**: URLs de compartilhamento
- Testar cada link antes de adicionar ao JSON
- **A aplicação aceita qualquer URL válida**

### Datas
- Formato: `DD/MM/AAAA`
- Sempre com 2 dígitos para dia e mês
- Exemplos: `05/01/2024`, `20/12/2023`

### Keywords
- Use palavras relevantes para busca
- 3-5 palavras por documento
- Pense no que usuários buscariam

### Pages
- Informar número real de páginas
- Ajuda usuários a entenderem extensão do documento

## 🚀 Deploy em Produção

Após atualizar os dados:

```bash
git add .
git commit -m "Atualiza documentos com dados reais"
git push origin main
```

A aplicação será automaticamente implantada no Vercel com os novos dados.

## ⚠️ Atenção à Segurança

- Certificar que documentos podem ser públicos
- Para documentos sensíveis, considerar:
  - Sistema de autenticação mais robusto
  - Armazenamento com controle de acesso
  - Tokens de acesso temporários

## 📞 Suporte

Para dúvidas sobre atualização de conteúdo:
- Consultar este guia
- Verificar estrutura do `documents.json` de exemplo
- Testar em ambiente local antes do deploy
