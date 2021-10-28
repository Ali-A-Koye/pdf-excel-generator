# PDF & Excel Generator

fast, easy to use PDF and Excel generator package for [node](http://nodejs.org).

## What's this?

Have you ever asked to prepare some kind of report and the only part you are not worrying about
is fetching the rows ? this package helps you to convert your data to downloadable PDF and Excel only by calling one function.

## Demo

```js
const express = require("express");
const app = express();
const generator = require("pdf-excel-generator");
app.get("/", function (req, res) {
  let data = [
    { name: "john", age: 12 },
    { name: "john", age: 12 },
  ];
  generator(data, "pdf", res); //pdf
  generator(data, "excel", res); //excel
});

app.listen(3000);
```

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the [npm registry](https://www.npmjs.com/).

Before installing,

- this package built for node.js [download and install Node.js](https://nodejs.org/en/download/).
- this package works and uses Express Framework , you can install it at [Express.js on NPM](https://www.npmjs.com/package/express).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install pdf-excel-generator
```

## Features

- Convert your Array of Json to PDF or Excel with one function call
- The Package uses Streams to Directly download your File and End of the request
- pre defined styles for Excel and PDF
- You can Control your Table Headers and rename them
- Fastest to generate a styled table with pdf or Excel

## Start & Examples

after you have installed the package , You need to require it in your node js code

```js
const generator = require("pdf-excel-generator");
```

generator is a function that accepts 4 parameters , 3 to be required and 1 is optional

```js
generator(data, type, res, asOp);
```

- data : Required parameter , parameter expected to be array of Json with more than one element
- type: Required parameter , this is your request to download either pdf or excel version of your data .. you should specify it to be either pdf or excel
- res: required parameter , you should pass your Response object , the package is sending back the file for you as stream and end the Request-Response-Cycle
- asOp : this is Optional Parameter, you only use that when you want to change the headers of the tables that are generated

# How AsOp (As Operation) works ?

AsOp is array of objects , for which columns you want to have which field in your data and which header for it ..below is an example :

```js
   generator(data , type , res , [
   {
       field:"name" //field which points to a field in data array of object
       as:"Full Name of Employees"  //as is column header
   }
   ])
```

with above example, you will get a table which has "Full Name of Employee" as header and the whole column is filled with names

# How it works without AsOp (As Operation) ?

it will take first element of your data array of object , and get the keys to generate the columns for you

### Current Issues

this package is still new and going to have bugs , its not ready for production as its still not bug free

## who made this

package made by [Ali A Koye](https://github.com/Ali-A-Koye)

## License

[MIT](LICENSE)
