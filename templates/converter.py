#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script de Conversão: CSV/TSV para JSON
Converte planilha de documentos para o formato JSON da aplicação ACAD VIEW
"""

import csv
import json
import sys
from datetime import datetime
from pathlib import Path

# Categorias e status válidos
VALID_CATEGORIES = ['GERAL', 'POS_GRADUACAO', 'INOVACAO', 'EDUCACAO_CORPORATIVA', 'BIBLIOTECA']
VALID_STATUS = ['REALIZACAO', 'PONTO_ATENCAO', 'CASO_CRITICO']

def validate_date(date_str):
    """Valida formato de data DD/MM/AAAA"""
    try:
        datetime.strptime(date_str, '%d/%m/%Y')
        return True
    except ValueError:
        return False

def date_to_sortable(date_str):
    """Converte DD/MM/AAAA para formato ordenável"""
    try:
        dt = datetime.strptime(date_str, '%d/%m/%Y')
        return dt.strftime('%Y%m%d')
    except ValueError:
        return '99999999'  # Coloca datas inválidas no final

def convert_csv_to_json(csv_file, output_file='../data/documents.json'):
    """
    Converte arquivo CSV/TSV para JSON
    
    Args:
        csv_file: Caminho do arquivo CSV ou TSV
        output_file: Caminho do arquivo JSON de saída
    """
    documents = []
    errors = []
    
    # Detectar delimitador
    with open(csv_file, 'r', encoding='utf-8') as f:
        sample = f.read(1024)
        delimiter = '\t' if '\t' in sample else ','
    
    print(f"📂 Lendo arquivo: {csv_file}")
    print(f"🔍 Delimitador detectado: {'TAB' if delimiter == chr(9) else 'VÍRGULA'}\n")
    
    # Ler CSV
    with open(csv_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f, delimiter=delimiter)
        
        for idx, row in enumerate(reader, start=2):  # Linha 2 (linha 1 é cabeçalho)
            # Validações
            line_errors = []
            
            # Validar categoria
            if row['category'] not in VALID_CATEGORIES:
                line_errors.append(f"Categoria inválida: '{row['category']}' (use: {', '.join(VALID_CATEGORIES)})")
            
            # Validar status
            if row['status'] not in VALID_STATUS:
                line_errors.append(f"Status inválido: '{row['status']}' (use: {', '.join(VALID_STATUS)})")
            
            # Validar data
            if not validate_date(row['date']):
                line_errors.append(f"Data inválida: '{row['date']}' (use formato DD/MM/AAAA)")
            
            # Validar URL
            if not row['url'].startswith('http'):
                line_errors.append(f"URL inválida: '{row['url']}' (deve começar com http:// ou https://)")
            
            # Validar páginas
            try:
                pages = int(row['pages'])
                if pages <= 0:
                    line_errors.append(f"Número de páginas inválido: {pages}")
            except ValueError:
                line_errors.append(f"Páginas deve ser um número: '{row['pages']}'")
                pages = 0
            
            # Se houver erros, registrar
            if line_errors:
                errors.append(f"❌ Linha {idx} (ID: {row['id']}): " + "; ".join(line_errors))
                continue
            
            # Converter keywords de string para array
            keywords = [k.strip() for k in row['keywords'].split(',') if k.strip()]
            
            # Criar documento
            doc = {
                'id': row['id'],
                'category': row['category'],
                'title': row['title'],
                'description': row['description'],
                'keywords': keywords,
                'status': row['status'],
                'date': row['date'],
                'url': row['url'],
                'pages': pages
            }
            
            documents.append(doc)
            print(f"✅ Linha {idx}: {row['title']}")
    
    # Ordenar por data (mais antigo primeiro)
    print("\n📅 Ordenando documentos por data (mais antigo → mais recente)...")
    documents.sort(key=lambda x: date_to_sortable(x['date']))
    
    # Exibir ordem final
    print("\n📋 Ordem cronológica final:")
    for i, doc in enumerate(documents, 1):
        print(f"   {i}. {doc['date']} - {doc['title']}")
    
    # Exibir erros, se houver
    if errors:
        print("\n⚠️  ERROS ENCONTRADOS:")
        for error in errors:
            print(f"   {error}")
        print(f"\n❌ {len(errors)} linha(s) com erro(s) não foram incluídas no JSON.")
    
    # Salvar JSON
    output_path = Path(__file__).parent / output_file
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(documents, f, ensure_ascii=False, indent=2)
    
    print(f"\n✅ JSON gerado com sucesso: {output_path}")
    print(f"📊 Total de documentos: {len(documents)}")
    
    if not errors:
        print("\n🎉 Conversão concluída sem erros!")
        print("\n🚀 Próximos passos:")
        print("   1. Verifique o arquivo data/documents.json")
        print("   2. Teste localmente: npm run dev")
        print("   3. Faça commit e deploy")
    else:
        print("\n⚠️  Conversão concluída com erros. Corrija as linhas indicadas acima.")
    
    return len(documents), len(errors)

def main():
    """Função principal"""
    print("=" * 70)
    print("🔄 CONVERSOR CSV/TSV → JSON - ACAD VIEW")
    print("=" * 70 + "\n")
    
    # Determinar arquivo de entrada
    csv_files = list(Path(__file__).parent.glob('*.csv')) + list(Path(__file__).parent.glob('*.tsv'))
    csv_files = [f for f in csv_files if 'template' not in f.name.lower()]
    
    if len(sys.argv) > 1:
        # Arquivo especificado na linha de comando
        input_file = sys.argv[1]
    elif csv_files:
        # Usar primeiro arquivo CSV/TSV encontrado (exceto templates)
        input_file = csv_files[0]
        print(f"📌 Usando arquivo: {input_file.name}\n")
    else:
        print("❌ Nenhum arquivo CSV/TSV encontrado!")
        print("\nUso:")
        print("   python converter.py [arquivo.csv]")
        print("\nOu coloque um arquivo .csv ou .tsv na pasta templates/")
        return
    
    try:
        total, errors = convert_csv_to_json(input_file)
        
        if total > 0:
            print("\n" + "=" * 70)
            print("✅ CONVERSÃO FINALIZADA")
            print("=" * 70)
        
    except FileNotFoundError:
        print(f"❌ Erro: Arquivo '{input_file}' não encontrado!")
    except Exception as e:
        print(f"❌ Erro inesperado: {str(e)}")
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    main()
