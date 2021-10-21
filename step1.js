const fs = require('fs');
const argv = process.argv;

function cat(path) {
    fs.readFile(path, 'utf-8', function(err, data) {
        if (err) {
            console.log(`Error reading file ${path}`);
            console.log(err);
            process.exit(1);
        }
        console.log(data)
    })
}
console.log("Reading file")

if (argv.length >= 3) {
    cat(argv[2])
}