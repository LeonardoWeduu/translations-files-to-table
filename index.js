import convertFilesToTable from './modules/file-to-table.js'
import convertTableToFile from './modules/table-to-file.js'
import prompt from 'prompt';
import which_files from './files.js';

const properties = [
    {
        name: 'action',
        message: 'Convert files to table?', 
        validator: /^[a-zA-Z\s\-]+$/,
        warning: 'Please type yes or no',
        required: true
    },
];

prompt.start();

prompt.get(properties, async function (err, result) {

    if(result.action.toLocaleLowerCase() != 'yes' && result.action.toLocaleLowerCase() != 'no') { return onErr('text not recognized') }
    if (err) { return onErr(err); }
    if (result.action == 'yes') {
        const imported_files_array = which_files.map(item => { return import(`./locales/${item}.js`) });
        const files = await Promise.all(imported_files_array);
        var array_translations = which_files.map((item, index) => ({ language: item, file: files[index].default }))
        convertFilesToTable(array_translations)
    } else {
        //convert table to files 
        convertTableToFile(which_files);

    }
});

function onErr(err) {
    console.log(err);
    return 1;
}