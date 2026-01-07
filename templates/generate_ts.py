import json

# Ler o JSON
with open('documents-output.json', 'r', encoding='utf-8') as f:
    documents = json.load(f)

# Gerar código TypeScript
output = []
output.append("export const MOCK_DOCUMENTS: Document[] = [")

for doc in documents:
    # Filtrar campos vazios
    fields = []
    fields.append(f"    id: '{doc['id']}'")
    
    # Mapear categoria
    category_map = {
        'GERAL': 'Category.GERAL',
        'POS_GRADUACAO': 'Category.POS_GRADUACAO',
        'INOVACAO': 'Category.INOVACAO_E_EXTENSAO',
        'EXTENSAO': 'Category.INOVACAO_E_EXTENSAO',
        'EDUCACAO_CORPORATIVA': 'Category.EDUCACAO_CORPORATIVA',
        'BIBLIOTECA': 'Category.BIBLIOTECA'
    }
    fields.append(f"    category: {category_map.get(doc['category'], 'Category.GERAL')}")
    
    # Título (sempre presente)
    title = doc['title'].replace("'", "\\'")
    fields.append(f"    title: '{title}'")
    
    # Description (opcional)
    if doc.get('description'):
        desc = doc['description'].replace("'", "\\'")
        fields.append(f"    description: '{desc}'")
    
    # Keywords (opcional)
    if doc.get('keywords') and len(doc['keywords']) > 0:
        keywords_str = ', '.join([f"'{k}'" for k in doc['keywords']])
        fields.append(f"    keywords: [{keywords_str}]")
    
    # Status (sempre presente)
    status_map = {
        'REALIZACAO': 'Status.REALIZACAO',
        'PONTO_ATENCAO': 'Status.PONTO_ATENCAO',
        'CASO_CRITICO': 'Status.CASO_CRITICO'
    }
    fields.append(f"    status: {status_map.get(doc['status'], 'Status.REALIZACAO')}")
    
    # Date (opcional)
    if doc.get('date'):
        fields.append(f"    date: '{doc['date']}'")
    
    # URL (opcional)
    if doc.get('url'):
        fields.append(f"    url: '{doc['url']}'")
    
    # Pages (opcional)
    if doc.get('pages') and doc['pages'] > 0:
        fields.append(f"    pages: {doc['pages']}")
    
    output.append("  {")
    output.append(",\n".join(fields))
    output.append("  },")

# Remover última vírgula
output[-1] = output[-1].rstrip(',')
output.append("];")

# Salvar
result = "\n".join(output)
with open('documents-typescript.txt', 'w', encoding='utf-8') as f:
    f.write(result)

print(f"✅ Código TypeScript gerado com sucesso!")
print(f"📄 Total de documentos: {len(documents)}")
