const fs = require('fs');
const argv = process.argv;
const axios = require('axios')

function cat(path) {
    console.log("Reading file")
    fs.readFile(path, 'utf-8', function(err, data) {
        if (err) {
            console.log(`Error reading file ${path}`);
            console.log(err);
            process.exit(1);
        }
        console.log(data)
    })
}


async function webCat(url) {
    console.log("Getting webpage")
    try {
        res = await axios.get(url)
        console.log(res)
    }
    catch(err) {
        console.log("Error: URL Not found")
        process.exit(1);
    }
}

if (argv.length >= 3) {
    if (argv[2].slice(0,4) == "http") {
        webCat(argv[2])
    }
    else {
        cat(argv[2])
    }
}