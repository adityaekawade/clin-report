#!/usr/bin/env node

const fs = require('fs');
const pdf = require('html-pdf');
const pdfTemplate = require('./documents');


const args = process.argv.slice(2)
var fileName = args[0];

fs.readFile(fileName, 'utf-8', (error, data) => {
  if (error) throw error;
  createPDF(JSON.parse(data));
});


// function createPDF(data){
//   pdf.create(pdfTemplate(data), {"orientation": "potrait", "border": {"top":"0.5in", "bottom": "0.5in"}}).toFile('result.pdf', (err) => {
//   });
// }


function createPDF(data){
  pdf.create(pdfTemplate(data), {
    "border": {"top":"0.4in", "bottom": "0.4in"}
  }).toStream(function(err, stream){
    if(err){
      console.error(err);
    }
    stream.pipe(process.stdout);
  });
}
