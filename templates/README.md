# 📊 Como Usar os Templates de Planilha

## Arquivos Disponíveis

Na pasta `templates/` você encontrará:

### 1. **documents-template.csv**
- Formato CSV (separado por vírgulas)
- Abre no Excel, Google Sheets, LibreOffice
- **Recomendado para a maioria dos usuários**

### 2. **documents-template.tsv**
- Formato TSV (separado por tabs)
- Útil se houver vírgulas nas descrições

### 3. **converter.py**
- Script Python para conversão automática CSV/TSV → JSON

---

## 📝 Passo a Passo

### 1. Abrir o Template

**No Excel:**
1. Abra o arquivo `documents-template.csv`
2. Se as colunas não aparecerem separadas:
   - Selecione a coluna A
   - Vá em Dados → Texto para Colunas
   - Escolha "Delimitado" → Vírgula

**No Google Sheets:**
1. Vá em Arquivo → Importar
2. Selecione `documents-template.csv`
3. Configure: Separador = Vírgula

### 2. Preencher os Dados

Substitua as linhas de exemplo pelos seus dados reais:

| Coluna | Descrição | Exemplo |
|--------|-----------|---------|
| **id** | Identificador único | `1`, `2`, `doc001` |
| **category** | Categoria do documento | `GERAL`, `POS_GRADUACAO`, etc. |
| **title** | Título do documento | `Relatório de Gestão 2023` |
| **description** | Descrição detalhada | `Panorama consolidado das atividades...` |
| **keywords** | Palavras-chave separadas por vírgula | `Gestão,Relatório,Anual` |
| **status** | Status do documento | `REALIZACAO`, `PONTO_ATENCAO`, `CASO_CRITICO` |
| **date** | Data no formato DD/MM/AAAA | `15/01/2024` |
| **url** | Link do documento | URL completa (ver seção abaixo) |
| **pages** | Número de páginas | `45` |

### 3. Formatos de URL Aceitos

A aplicação aceita **qualquer URL válida**:

#### Google Drive:
```
https://drive.google.com/file/d/1AbC123XyZ/view
```

#### Links Web Diretos:
```
https://exemplo.inpi.gov.br/documentos/relatorio.pdf
https://portal.inpi.gov.br/editais/edital-2024.pdf
```

#### SharePoint/OneDrive:
```
https://orgname.sharepoint.com/:b:/s/site/arquivo.pdf
```

#### Qualquer servidor web:
```
https://seu-servidor.com.br/pasta/documento.pdf
```

**Dica**: Links web diretos funcionam melhor se apontarem diretamente para arquivos PDF.

### 4. Validações Importantes

Antes de converter para JSON, verifique:

- [ ] **IDs únicos**: Cada linha tem um ID diferente
- [ ] **Categorias válidas**: Apenas os 5 valores permitidos
- [ ] **Status válidos**: Apenas os 3 valores permitidos
- [ ] **Datas corretas**: Formato DD/MM/AAAA
- [ ] **URLs testadas**: Todos os links abrem corretamente
- [ ] **Ordem cronológica**: Linhas ordenadas por data (mais antiga primeiro)

---

## 🔄 Conversão para JSON

### Opção 1: Script Python Automático (Recomendado)

```bash
# Na pasta do projeto
cd templates
python converter.py
```

Isso irá gerar automaticamente o arquivo `data/documents.json`.

### Opção 2: Conversão Manual

Use uma ferramenta online como:
- [CSV to JSON Converter](https://www.convertcsv.com/csv-to-json.htm)
- [CSV JSON](https://csvjson.com/csv2json)

**Passos**:
1. Copie todo o conteúdo do CSV
2. Cole na ferramenta
3. Configure para gerar array de objetos
4. Copie o resultado para `data/documents.json`

### Opção 3: Conversão Manual no Excel/Sheets

Se preferir fazer manualmente:

1. **Salve a planilha preenchida**
2. **Abra** `data/documents.json`
3. **Copie** a estrutura do template
4. **Preencha** linha por linha convertendo cada coluna para o formato JSON

**Exemplo de conversão**:

**Linha no CSV:**
```
1,GERAL,Relatório 2023,Descrição do relatório,Gestão|Relatório,REALIZACAO,15/01/2024,https://exemplo.com/doc.pdf,45
```

**Resultado em JSON:**
```json
{
  "id": "1",
  "category": "GERAL",
  "title": "Relatório 2023",
  "description": "Descrição do relatório",
  "keywords": ["Gestão", "Relatório"],
  "status": "REALIZACAO",
  "date": "15/01/2024",
  "url": "https://exemplo.com/doc.pdf",
  "pages": 45
}
```

---

## 🐍 Script de Conversão Python

### Instalação

Certifique-se de ter Python instalado:

```bash
python --version
```

### Como Usar

1. **Preencha** o CSV completamente
2. **Execute**:
   ```bash
   python templates/converter.py
   ```
3. **Verifique** o arquivo gerado em `data/documents.json`
4. **Teste** a aplicação:
   ```bash
   npm run dev
   ```

### Recursos do Script

- ✅ Valida categorias e status
- ✅ Verifica formato de datas
- ✅ Converte keywords automaticamente para array
- ✅ Ordena por data automaticamente
- ✅ Gera relatório de erros se houver problemas

---

## 📋 Exemplo Completo

### Planilha Preenchida:

| id | category | title | description | keywords | status | date | url | pages |
|----|----------|-------|-------------|----------|--------|------|-----|-------|
| 1 | INOVACAO | Plano de Extensão 2023 | Iniciativas de parceria | Extensão,Inovação | REALIZACAO | 10/12/2023 | https://drive.google.com/file/d/ABC123/view | 28 |
| 2 | GERAL | Relatório Gestão 2023 | Panorama anual | Gestão,Relatório | REALIZACAO | 15/01/2024 | https://inpi.gov.br/docs/relatorio.pdf | 45 |
| 3 | POS_GRADUACAO | Edital Mestrado 2024 | Processo seletivo | Mestrado,Edital | PONTO_ATENCAO | 02/02/2024 | https://portal.inpi.gov.br/edital.pdf | 12 |

### JSON Gerado:

```json
[
  {
    "id": "1",
    "category": "INOVACAO",
    "title": "Plano de Extensão 2023",
    "description": "Iniciativas de parceria",
    "keywords": ["Extensão", "Inovação"],
    "status": "REALIZACAO",
    "date": "10/12/2023",
    "url": "https://drive.google.com/file/d/ABC123/view",
    "pages": 28
  },
  {
    "id": "2",
    "category": "GERAL",
    "title": "Relatório Gestão 2023",
    "description": "Panorama anual",
    "keywords": ["Gestão", "Relatório"],
    "status": "REALIZACAO",
    "date": "15/01/2024",
    "url": "https://inpi.gov.br/docs/relatorio.pdf",
    "pages": 45
  },
  {
    "id": "3",
    "category": "POS_GRADUACAO",
    "title": "Edital Mestrado 2024",
    "description": "Processo seletivo",
    "keywords": ["Mestrado", "Edital"],
    "status": "PONTO_ATENCAO",
    "date": "02/02/2024",
    "url": "https://portal.inpi.gov.br/edital.pdf",
    "pages": 12
  }
]
```

---

## ✅ Checklist Final

Antes de integrar o JSON à aplicação:

- [ ] Todos os campos obrigatórios preenchidos
- [ ] Categorias e status com valores corretos
- [ ] Datas no formato DD/MM/AAAA
- [ ] Documentos ordenados por data (mais antigo primeiro)
- [ ] Todas as URLs testadas e funcionando
- [ ] Keywords separadas corretamente
- [ ] IDs únicos para cada documento
- [ ] JSON validado (sem erros de sintaxe)
- [ ] Testado localmente com sucesso

---

## 💡 Dicas

### Para Keywords
Separe por vírgula sem espaços:
- ✅ `Gestão,Relatório,Anual`
- ❌ `Gestão, Relatório, Anual` (espaços causam problemas)

### Para Descrições com Vírgulas
Se a descrição tiver vírgulas, use TSV em vez de CSV:
- CSV: Pode causar problemas
- TSV: Funciona perfeitamente

### Para URLs Longas
Se a URL for muito longa, você pode usar serviços de encurtamento:
- Bitly
- TinyURL
- Encurtadores personalizados

Mas prefira URLs diretas sempre que possível.

---

## 🆘 Solução de Problemas

### Excel não separa as colunas
**Solução**: Dados → Texto para Colunas → Delimitado → Vírgula

### Keywords aparecem juntas no JSON
**Solução**: Use o script Python que converte automaticamente

### JSON inválido após conversão manual
**Solução**: Use um validador JSON online (https://jsonlint.com)

### Caracteres especiais aparecem errados
**Solução**: Salve o CSV com codificação UTF-8

---

## 📞 Próximos Passos

Após gerar o `documents.json`:

1. Verifique o arquivo em `data/documents.json`
2. Teste localmente: `npm run dev`
3. Confirme que todos os documentos aparecem
4. Faça commit e deploy:
   ```bash
   git add .
   git commit -m "Adiciona documentos reais"
   git push origin main
   ```
