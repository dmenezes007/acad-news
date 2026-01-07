# Guia Prático: Integração com Google Drive

## 📋 Passo a Passo Completo

### 1️⃣ PREPARAR OS DOCUMENTOS NO GOOGLE DRIVE

#### 1.1 Organizar a Pasta
1. Acesse [Google Drive](https://drive.google.com)
2. Crie uma pasta chamada `ACAD-VIEW-Documentos`
3. Organize em subpastas (opcional, mas recomendado):
   ```
   ACAD-VIEW-Documentos/
   ├── Geral/
   ├── Pos-Graduacao/
   ├── Inovacao/
   ├── Educacao-Corporativa/
   └── Biblioteca/
   ```

#### 1.2 Fazer Upload dos PDFs
- Arraste os arquivos para as respectivas pastas
- Aguarde o upload completo de todos os documentos

---

### 2️⃣ CONFIGURAR COMPARTILHAMENTO PÚBLICO

Para cada documento PDF:

1. **Clique com botão direito** no arquivo
2. Selecione **"Compartilhar"** ou **"Obter link"**
3. Em "Acesso geral", altere para:
   - ☑️ **"Qualquer pessoa com o link"**
   - 📖 **"Leitor"** (apenas visualização)
4. Clique em **"Copiar link"**
5. Cole o link em um arquivo de texto temporário

**Formato do link copiado**:
```
https://drive.google.com/file/d/1ABC123xyz_ID_DO_ARQUIVO_xyz789/view?usp=sharing
```

---

### 3️⃣ EXTRAIR O ID DO ARQUIVO

De cada URL, você precisa extrair apenas o **ID do arquivo**.

**Exemplo**:
```
URL completa:
https://drive.google.com/file/d/1ABC123xyz_ID_DO_ARQUIVO_xyz789/view?usp=sharing

ID do arquivo (parte entre /d/ e /view):
1ABC123xyz_ID_DO_ARQUIVO_xyz789
```

**Dica**: O ID é a parte entre `/d/` e `/view`

---

### 4️⃣ CRIAR A PLANILHA DE CONTROLE

Crie uma planilha para organizar as informações (pode ser no Excel, Google Sheets ou mesmo um bloco de notas):

| ID | Título | Categoria | Status | Data | URL Google Drive | ID Extraído | Páginas |
|----|--------|-----------|--------|------|------------------|-------------|---------|
| 1 | Relatório Gestão 2023 | GERAL | REALIZACAO | 15/01/2024 | https://drive... | 1ABC123... | 45 |
| 2 | Edital Mestrado 2024 | POS_GRADUACAO | PONTO_ATENCAO | 02/02/2024 | https://drive... | 1XYZ789... | 12 |

---

### 5️⃣ PREENCHER O JSON

Abra o arquivo `data/documents.json` e preencha com seus dados reais:

```json
[
  {
    "id": "1",
    "category": "GERAL",
    "title": "Relatório de Gestão 2023",
    "description": "Panorama consolidado das atividades da Academia no último exercício.",
    "keywords": ["Gestão", "Relatório", "Anual", "Metas"],
    "status": "REALIZACAO",
    "date": "15/01/2024",
    "url": "https://drive.google.com/file/d/1ABC123xyz_ID_DO_ARQUIVO_xyz789/view",
    "pages": 45
  },
  {
    "id": "2",
    "category": "POS_GRADUACAO",
    "title": "Edital Mestrado Profissional 2024",
    "description": "Regras e cronograma para o processo seletivo do Mestrado Profissional em PI e Inovação.",
    "keywords": ["Mestrado", "Edital", "Pós-Graduação", "Seleção"],
    "status": "PONTO_ATENCAO",
    "date": "02/02/2024",
    "url": "https://drive.google.com/file/d/1XYZ789def_OUTRO_ID_def456/view",
    "pages": 12
  }
]
```

---

### 6️⃣ CAMPOS OBRIGATÓRIOS E FORMATOS

#### **id** (string)
- Único para cada documento
- Exemplos: `"1"`, `"2"`, `"doc001"`

#### **category** (string) - EXATAMENTE um destes valores:
- `"GERAL"`
- `"POS_GRADUACAO"`
- `"INOVACAO"`
- `"EDUCACAO_CORPORATIVA"`
- `"BIBLIOTECA"`

#### **title** (string)
- Título descritivo do documento
- Exemplo: `"Relatório de Gestão 2023"`

#### **description** (string)
- Descrição detalhada do conteúdo
- 1-2 frases explicando o documento

#### **keywords** (array de strings)
- Lista de palavras-chave para busca
- 3-5 palavras relevantes
- Exemplo: `["Gestão", "Relatório", "Anual"]`

#### **status** (string) - EXATAMENTE um destes valores:
- `"REALIZACAO"` → Status verde (atividade concluída)
- `"PONTO_ATENCAO"` → Status amarelo (requer atenção)
- `"CASO_CRITICO"` → Status vermelho (situação crítica)

#### **date** (string)
- Formato: `"DD/MM/AAAA"`
- Sempre 2 dígitos para dia e mês
- Exemplos: `"05/01/2024"`, `"20/12/2023"`

#### **url** (string)
- URL completa do Google Drive
- Formato: `"https://drive.google.com/file/d/SEU_ID_AQUI/view"`

#### **pages** (number)
- Número de páginas do documento
- Sem aspas (é um número, não texto)
- Exemplo: `45` (não `"45"`)

---

### 7️⃣ EXEMPLO COMPLETO COM 3 DOCUMENTOS

```json
[
  {
    "id": "1",
    "category": "INOVACAO",
    "title": "Plano de Extensão Tecnológica 2023",
    "description": "Iniciativas de aproximação com o setor produtivo e transferência de tecnologia para empresas parceiras.",
    "keywords": ["Extensão", "Inovação", "Parceria", "Indústria", "Tecnologia"],
    "status": "REALIZACAO",
    "date": "10/12/2023",
    "url": "https://drive.google.com/file/d/1AbC123XyZ_exemplo_inovacao/view",
    "pages": 28
  },
  {
    "id": "2",
    "category": "GERAL",
    "title": "Relatório de Gestão Anual 2023",
    "description": "Panorama consolidado das atividades, metas atingidas e desafios enfrentados pela Academia do INPI durante o exercício de 2023.",
    "keywords": ["Gestão", "Relatório", "Anual", "Metas", "Resultados"],
    "status": "REALIZACAO",
    "date": "15/01/2024",
    "url": "https://drive.google.com/file/d/1DeF456UvW_exemplo_gestao/view",
    "pages": 45
  },
  {
    "id": "3",
    "category": "POS_GRADUACAO",
    "title": "Edital de Seleção - Mestrado Profissional 2024",
    "description": "Normas, cronograma e requisitos para o processo seletivo do Mestrado Profissional em Propriedade Intelectual e Inovação.",
    "keywords": ["Mestrado", "Edital", "Pós-Graduação", "Seleção", "Processo Seletivo"],
    "status": "PONTO_ATENCAO",
    "date": "02/02/2024",
    "url": "https://drive.google.com/file/d/1GhI789OpQ_exemplo_mestrado/view",
    "pages": 12
  }
]
```

---

### 8️⃣ INTEGRAR COM A APLICAÇÃO

#### Opção A: Substituir MOCK_DOCUMENTS diretamente

Edite `constants.tsx`:

```typescript
import { Category, Status, Document } from './types';
import documentsData from './data/documents.json';

// Substituir o array MOCK_DOCUMENTS por:
export const MOCK_DOCUMENTS: Document[] = documentsData;
```

#### Opção B: Manter dados no constants.tsx

Se preferir manter tudo em TypeScript, substitua o array `MOCK_DOCUMENTS` em `constants.tsx` pelos seus dados:

```typescript
export const MOCK_DOCUMENTS: Document[] = [
  {
    id: '1',
    category: Category.INOVACAO,
    title: 'Plano de Extensão Tecnológica 2023',
    description: 'Iniciativas de aproximação...',
    keywords: ['Extensão', 'Inovação', 'Parceria'],
    status: Status.REALIZACAO,
    date: '10/12/2023',
    url: 'https://drive.google.com/file/d/SEU_ID/view',
    pages: 28
  },
  // ... demais documentos
];
```

---

### 9️⃣ VALIDAR E TESTAR

1. **Salvar alterações**
2. **Testar localmente**:
   ```bash
   npm run dev
   ```
3. **Verificar**:
   - ✅ Todos os documentos aparecem na lista
   - ✅ As datas estão ordenadas (mais antigo primeiro)
   - ✅ Ao clicar em um documento, o link abre corretamente
   - ✅ O PDF é exibido no Google Drive

4. **Corrigir problemas comuns**:
   - **Link não abre**: Verificar se o compartilhamento está público
   - **Documento não aparece**: Verificar sintaxe JSON (vírgulas, aspas)
   - **Categoria errada**: Usar EXATAMENTE os valores listados acima

---

### 🔟 FAZER DEPLOY

Após validar localmente:

```bash
git add .
git commit -m "Adiciona documentos reais via Google Drive"
git push origin main
```

O Vercel irá automaticamente fazer deploy com os novos dados.

---

## ✅ CHECKLIST FINAL

Antes de fazer o commit, verifique:

- [ ] Todos os PDFs estão no Google Drive
- [ ] Compartilhamento público configurado (qualquer pessoa com o link)
- [ ] URLs copiadas e IDs extraídos corretamente
- [ ] JSON válido (sem erros de sintaxe)
- [ ] Datas no formato DD/MM/AAAA
- [ ] Documentos ordenados por data (mais antigo primeiro)
- [ ] Status usando valores corretos (REALIZACAO, PONTO_ATENCAO, CASO_CRITICO)
- [ ] Categorias usando valores corretos
- [ ] Testado localmente com sucesso
- [ ] Links abrindo corretamente

---

## 🆘 SOLUÇÃO DE PROBLEMAS

### Erro: "Cannot read property 'map' of undefined"
- **Causa**: JSON inválido ou arquivo não encontrado
- **Solução**: Verificar sintaxe do documents.json

### Links não abrem
- **Causa**: Documento não está público
- **Solução**: Verificar compartilhamento no Google Drive

### Documento não aparece na categoria
- **Causa**: Valor de category incorreto
- **Solução**: Usar EXATAMENTE: GERAL, POS_GRADUACAO, INOVACAO, EDUCACAO_CORPORATIVA, BIBLIOTECA

### Datas fora de ordem
- **Causa**: Documentos não ordenados cronologicamente
- **Solução**: Reordenar do mais antigo (topo) para o mais recente (fundo)

---

## 📞 DÚVIDAS FREQUENTES

**P: Posso usar pastas privadas?**
R: Não. Os documentos precisam ter acesso público com link compartilhável.

**P: E se eu adicionar novos documentos depois?**
R: Basta editar o documents.json, adicionar o novo documento respeitando a ordem cronológica, e fazer commit.

**P: Preciso manter o arquivo documents.json?**
R: Pode usar JSON ou editar diretamente o constants.tsx. Escolha o que for mais prático.

**P: Quantos documentos posso adicionar?**
R: Sem limite. A aplicação suporta qualquer quantidade.

**P: Posso misturar Google Drive com arquivos locais?**
R: Tecnicamente sim, mas não é recomendado. Escolha uma abordagem e mantenha consistência.
