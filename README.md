## Conversor dos arquivos de tradução

### Etapas

1. Pegue os arquivos originais de tradução, escritos nos portais, ou seja, pt.js, en.js, es.js, etc.
2. Cole-os na pasta locales
3. Edite o arquivo "files.js" com os nomes corretos dos arquivos das traduções na pasta locale (isso será usado para gerar as colunas automaticamente no arquivo excel)
4. Rode o programa com npm start

Uma pergunta vai aparecer, "Convert files to table?"

> > yes

Transforma os arquivos da pasta locales para uma tabela

> > no

Transforma a tabela na pasta input_table para arquivos de tradução na pasta output_files
