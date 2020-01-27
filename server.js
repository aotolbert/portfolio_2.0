// var deep = require('express-deep-link');
var deeplink = require('node-deeplink');
const express = require('express');
const fs = require('mz/fs');
var bodyParser = require("body-parser");
const port = process.env.PORT || 5000;



const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

var publicDir = require('path').join(__dirname,'/app');
// app.use('/node_modules', express.static('node_modules'));
app.use(express.static(publicDir));

var routes = require("./routes/routes.js");
app.use(routes);

function promiseAllP(items, block) {
    var promises = [];
    items.forEach(function(item,index) {
        promises.push( function(item,i) {
            return new Promise(function(resolve, reject) {
                return block.apply(this,[item,index,resolve,reject]);
            });
        }(item,index))
    });
    return Promise.all(promises);
} //promiseAll

/**
 * read files
 * @param dirname string
 * @return Promise
 * @author Loreto Parisi (loretoparisi at gmail dot com)
 * @see http://stackoverflow.com/questions/10049557/reading-all-files-in-a-directory-store-them-in-objects-and-send-the-object
 */

function readFiles(dirname) {
    return new Promise((resolve, reject) => {
        fs.readdir(dirname, function(err, filenames) {
            if (err) return reject(err);
            promiseAllP(filenames,
            (filename,index,resolve,reject) =>  {
                fs.readFile(path.resolve(dirname, filename), 'utf-8', function(err, content) {
                    if (err) return reject(err);
                    return resolve({filename: filename, contents: content});
                });
            })
            .then(results => {
                return resolve(results);
            })
            .catch(error => {
                return reject(error);
            });
        });
  });
}




app.listen(port, () => console.log(`Server up and running on port ${port} !`));