import csv
import json

# Ler o CSV com encoding correto
documents = []
with open('documents-template2.csv', 'r', encoding='windows-1252') as f:
    reader = csv.DictReader(f, delimiter=';')
    
    for row in reader:
        # Pular linhas com campos obrigatórios vazios
        if not row['title'] or not row['status']:
            continue
            
        # Processar keywords
        keywords = []
        if row['keywords']:
            keywords = [k.strip() for k in row['keywords'].split(',')]
        
        # Criar documento
        doc = {
            'id': row['id'],
            'category': row['category'],
            'title': row['title'].replace('"', ''),
            'description': row['description'] if row['description'] else '',
            'keywords': keywords,
            'status': row['status'],
            'date': row['date'] if row['date'] else '',
            'url': row['url'] if row['url'] else '',
            'pages': int(row['pages']) if row.get('pages') and row['pages'].strip() else 0
        }
        
        documents.append(doc)

# Salvar como JSON
with open('documents-output.json', 'w', encoding='utf-8') as f:
    json.dump(documents, f, ensure_ascii=False, indent=2)

print(f"✅ Processados {len(documents)} documentos com sucesso!")
print(f"📄 Arquivo salvo: documents-output.json")
