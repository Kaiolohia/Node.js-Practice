const fs = require('fs');
const argv = process.argv;
const axios = require('axios')

function cat(path) {
    console.log("Reading file")
    let data = ''
    try {
        return fs.readFileSync(path, 'utf-8')
    } catch (err) {
        console.log("Error reading file");
        console.log(err);
        process.exit(1);
    }
}


async function webCat(url) {
    console.log("Getting webpage")
    try {
        res = await axios.get(url)
        return res
    }
    catch(err) {
        console.log("Error: URL Not found")
        process.exit(1);
    }
}

function writeCat(writeTo, read) {
    write(writeTo, cat(read))
    return
}

function writeWebCat(writeTo, read) {
    webCat(read).then(res => {
        write(writeTo, res.data)
    })
    return 
}

function write(writeTo, content) {
    fs.writeFile(writeTo, content, 'utf-8', err => {
        if (err) {
            console.log("Error writing to file");
            console.log(err);
            process.exit(1);
        }
        console.log(`Finished writing to ${writeTo}`)
    })
    return
}

if (argv.length >= 3) {
    if (argv[2].slice(0,4) == "http") {
        webCat(argv[2]).then(res => {
            console.log(res)
        })
    }
    else if (argv[2] == "--out") {
        if (argv[4].slice(0,4) == "http") {
            writeWebCat(argv[3], argv[4])
        }
        else {
            writeCat(argv[3], argv[4])
        }
    }
    else {
        console.log(cat(argv[2]))
    }
}