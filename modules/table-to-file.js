import xlsx from 'node-xlsx';
import fs from 'fs'

const createNestedObject = function( base, names, value ) {
    for (var i = 0; i < names.length ; i++) {
        if (i == names.length - 1)
            base = base[ names[i] ] = base[ names[i] ] || value;
        else base = base[ names[i] ] = base[ names[i] ] || {};
    }
};

const convertTableToFile = function (files) {

    const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`./input_table/input_table.xlsx`));
    const sheet_lines = workSheetsFromBuffer[0].data;
    
    let array_obj_translation = files.map((item) => ({ language: item, obj: {} }));

    sheet_lines.forEach((line, index) => {
        if (index != 0) {
            let parsed_path = line[0].split('/');
            parsed_path.splice(0, 1);

            array_obj_translation.forEach((element, index) => {
                createNestedObject(element.obj, parsed_path, line[index + 1])
            });
        }
    });

    const final_json_array = array_obj_translation.map(item => ({ language: item.language, json: JSON.stringify(item.obj, null, 2) }));

    final_json_array.forEach((item) => {
        fs.writeFile(`./output_files/${item.language}.js`, `// Portuguese \nconst messages = ${item.json}; \n\nexport default messages;`, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved! ", item.language);
        });
    });
}

export default convertTableToFile; 