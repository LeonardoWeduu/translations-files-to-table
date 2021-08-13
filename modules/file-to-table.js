import xl from 'excel4node'

const list_all_fields = function (tree, path, array) {
    const fields = Object.keys(tree); 

    for(let i = 0; i < fields.length; i++) {
        if(typeof tree[fields[i]] == 'string') {
            array.push({ path: path + '/' + fields[i], value: tree[fields[i]]}); 
        } else {
            list_all_fields(tree[fields[i]], path + '/' + fields[i], array )
        }
    }

    return array; 
}

const listAllFields = function (file) {
    return list_all_fields(file, '', []); 
}

const convertFilesToTable = function (files) {
    const total_of_translations = files.length; 
    const lists_of_all_fields = files.map(item => listAllFields(item.file));
    const total_lines = lists_of_all_fields[0].length;

    // Configs do arquivo excel 
    var wb = new xl.Workbook();
    var ws = wb.addWorksheet('translation');

    ws.cell(1, 1).string('path'); 
    for (let i = 0; i < total_of_translations; i++) {
        ws.cell(1, i + 2).string(files[i].language); 
    }

    for (let i = 0; i < total_lines; i++) {
        ws.cell(i + 2, 1).string(lists_of_all_fields[0][i].path)
        for (let j = 0; j < total_of_translations; j++) {
            ws.cell(i + 2, j + 2).string(lists_of_all_fields[j][i].value)
        }
    }

    wb.write('./output_table/translation_pedmais.xlsx');
    console.log("Tabela gerada com sucesso!"); 
}

    

export default convertFilesToTable; 