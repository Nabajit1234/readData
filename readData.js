/*
-- getDataFromURL function gets data from the url
-- dataToJson function parses the data received to JSON array
-- find function gets the required data
-- writeToCSV function writes the data received onto a CSV file
*/
function getDataFromURL(url) {
    // This function will return a Promise with the data from the url that is given in the argument
    return new Promise ((resolve, reject) => {
        const https = require('https');

        https.get(url, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            })

            res.on('end', () => {
                resolve(data)
            })

        }).on('error', (error) => {
            reject(error)
        })
    })
}


function dataToJson(data) {
    // This function will parse and store the data received into a JSON array
    let dataArr = data.split('\n');
    let headersArr = dataArr[0].split(';');
    dataArr.shift();
    let jsonArr = [];

    for (let elem of dataArr) {
        let values = elem.split(';');
        let dataObj = {};

        for (let i=0; i<headersArr.length; i++) {
            dataObj[headersArr[i]] = values[i]
        }

        jsonArr.push(dataObj);
    }
    return jsonArr;
}

// An object that contains the urls
const urls = {
    books: "https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/books.csv",
    authors: "https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/authors.csv",
    magazines: "https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/magazines.csv"
}

async function main(url){
    // This is the main function that needs to be called with the url
    let data = await getDataFromURL(url);
    let parsedData = dataToJson(data.trim());
    return parsedData;
}

// Calling the main function
main(urls.books)
    .then(data => {
        sortedData = data.sort(function(a,b) { // sorts the data by title
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
        })
        sortedData.forEach(elem => {
            console.log(elem.title); // printing the title of each element
        })
    })
    .catch(err => {
        console.log(err);
    })


//Function to find a book or magazine by its isbn
async function find(url, key, value) {
    // url => url from which data is to be taken
    // key => a property of books/authors/mags
    // value => value of the property
    const data = await getDataFromURL(url);
    const parsedData = dataToJson(data.trim());
    let result = parsedData.filter(e => e[key]===value)
    return result;
}


// Funtion to write onto a csv file
async function writeToCSV(url) {
    const data = await getDataFromURL(url);
    const parsedData = dataToJson(data.trim());

    const converter = require('json-2-csv');
    const fs = require('fs');

    converter.json2csv(parsedData, (err, csv) => {
        if(err) throw err;

        console.log(csv);
        fs.writeFileSync('data.csv', csv);
    })
}


writeToCSV(urls.books)







