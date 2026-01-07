# Template: Planilha de Controle de Documentos

Use esta planilha para organizar as informações antes de preencher o JSON.

## Instruções de Preenchimento

1. Para cada documento PDF no Google Drive:
   - Obtenha o link compartilhável público
   - Extraia o ID (parte entre /d/ e /view)
   - Preencha todas as colunas abaixo

2. Ordene as linhas por data (mais antigo primeiro)

3. Use os dados para preencher o `documents.json`

---

## PLANILHA DE CONTROLE

| # | ID | Título | Categoria | Status | Data | URL Completa Google Drive | ID Extraído | Páginas | Keywords | Descrição |
|---|----|---------|-----------| -------|------|---------------------------|-------------|---------|----------|-----------|
| 1 | 1 | [Título do Doc 1] | GERAL | REALIZACAO | DD/MM/AAAA | https://drive.google.com/file/d/... | [ID extraído] | [nº] | palavra1, palavra2 | [Descrição] |
| 2 | 2 | [Título do Doc 2] | POS_GRADUACAO | PONTO_ATENCAO | DD/MM/AAAA | https://drive.google.com/file/d/... | [ID extraído] | [nº] | palavra1, palavra2 | [Descrição] |
| 3 | 3 | [Título do Doc 3] | INOVACAO | REALIZACAO | DD/MM/AAAA | https://drive.google.com/file/d/... | [ID extraído] | [nº] | palavra1, palavra2 | [Descrição] |
| 4 | 4 | [Título do Doc 4] | EDUCACAO_CORPORATIVA | CASO_CRITICO | DD/MM/AAAA | https://drive.google.com/file/d/... | [ID extraído] | [nº] | palavra1, palavra2 | [Descrição] |
| 5 | 5 | [Título do Doc 5] | BIBLIOTECA | REALIZACAO | DD/MM/AAAA | https://drive.google.com/file/d/... | [ID extraído] | [nº] | palavra1, palavra2 | [Descrição] |

---

## REFERÊNCIA RÁPIDA

### Categorias Válidas (copie exatamente):
- `GERAL`
- `POS_GRADUACAO`
- `INOVACAO`
- `EDUCACAO_CORPORATIVA`
- `BIBLIOTECA`

### Status Válidos (copie exatamente):
- `REALIZACAO` (verde - atividade concluída)
- `PONTO_ATENCAO` (amarelo - requer atenção)
- `CASO_CRITICO` (vermelho - situação crítica)

### Formato da Data:
- `DD/MM/AAAA`
- Exemplos: `05/01/2024`, `20/12/2023`

### Formato da URL:
- `https://drive.google.com/file/d/ID_DO_ARQUIVO/view`

---

## EXEMPLO PREENCHIDO

| # | ID | Título | Categoria | Status | Data | URL Completa | ID Extraído | Páginas | Keywords | Descrição |
|---|----|---------|-----------| -------|------|--------------|-------------|---------|----------|-----------|
| 1 | 1 | Plano de Extensão Tecnológica | INOVACAO | REALIZACAO | 10/12/2023 | https://drive.google.com/file/d/1AbC123XyZ/view | 1AbC123XyZ | 28 | Extensão, Inovação, Parceria | Iniciativas de aproximação com setor produtivo |
| 2 | 2 | Relatório de Gestão 2023 | GERAL | REALIZACAO | 15/01/2024 | https://drive.google.com/file/d/1DeF456UvW/view | 1DeF456UvW | 45 | Gestão, Relatório, Anual | Panorama consolidado das atividades |
| 3 | 3 | Edital Mestrado 2024 | POS_GRADUACAO | PONTO_ATENCAO | 02/02/2024 | https://drive.google.com/file/d/1GhI789OpQ/view | 1GhI789OpQ | 12 | Mestrado, Edital, Seleção | Normas e cronograma do processo seletivo |

---

## CONVERSÃO PARA JSON

Após preencher a planilha, converta cada linha para o formato JSON:

```json
{
  "id": "[coluna ID]",
  "category": "[coluna Categoria]",
  "title": "[coluna Título]",
  "description": "[coluna Descrição]",
  "keywords": ["[palavra1]", "[palavra2]", "[palavra3]"],
  "status": "[coluna Status]",
  "date": "[coluna Data]",
  "url": "https://drive.google.com/file/d/[ID Extraído]/view",
  "pages": [coluna Páginas - sem aspas]
}
```

---

## DICAS

✅ Mantenha esta planilha atualizada sempre que adicionar novos documentos
✅ Revise as datas para garantir ordem cronológica
✅ Teste cada URL antes de adicionar ao JSON
✅ Use keywords pensando em como usuários buscariam o documento
