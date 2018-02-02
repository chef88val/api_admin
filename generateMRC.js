//import { copyFile } from 'fs';

//import { copyFile } from 'fs';
var fs = require('fs')
var replaceStream = require('replacestream')
const through2 = require('through2');
const argv = require('yargs')
var Transform = require('stream').Transform;
/* .usage('$0 <cmd> [args]')
.command('hello [name]', 'welcome ter yargs!', {
  name: {
    default: 'default name',
    describe: 'the name to say hello to'
  }
}, function (argv) {
  console.log('hello', argv.name, 'welcome to yargs!')
})
.help()
.argv */

var uppercase = new Transform({decodeStrings: false});

  uppercase._transform = function(chunk, encoding, done) {
    done(null, chunk.toUpperCase());
  };
function replaceString(err,data){
    console.log('err',err)
    console.log('data',data)
}
console.log(process.argv[2],"params",   process.argv.length)
 if(process.argv.length<3) console.log("No esta definido")
 else copyroutes();
function copyroutes(){
    var newEl = process.argv[2]
var folders =["models","routes","controllers"]
folders.forEach(function(x,y){
    fs.readdir(x+"/",{}, function(err, data){
        var source= fs.createReadStream(x+'/categories.js')
        var target =fs.createWriteStream(x+'/'+newEl+'.js')
        //source.pipe(uppercase).pipe(target)
        source.pipe(replaceStream('Category','Test'))
        source.pipe(replaceStream('categories','test'))
        source.pipe(replaceStream('Category','Test'))
        source.pipe(replaceStream('Categories','Tests'))
        console.log('source',source)
        source.pipe(target);
    })
})
//copyFile("./routes.js","./")
}/*
if (process.argv[2] != undefined) readArgs()
if(argv.update) updateListComponent(argv.update)
function readArgs() {
     process.argv.forEach(function (val, index, array) {
        console.log(index + ': ' + val);
        if (index == 2)
            writeFile(val)
    });
}
function readHTML(params) {
    switch (params) {
        case 'd': writeFile
    }
    console.log("params", params)

}

function writeFile(params) {
    console.log("wr")
    let mkdir = false;
    try {
        fs.mkdirSync(params);
        process.chdir('./' + params)
    } catch (error) {
        if (error.code !== 'EEXIST') throw error
        process.chdir('./' + params)
    }
    let ext = ['html', 'js', 'less']
    ext.forEach(function (x) {
        console.log("x", x)
        fs.readFile('../test.component.' + x, 'utf8', function (err, data) {
            console.log(__dirname,"DDD")
            if (err) throw err;
            let result = data.replace(/test/g, params).replace(/vmTest/g, 'vm'+params.charAt(0).toUpperCase() + params.slice(1));
 
             fs.writeFileSync(params + '.component.' + x, result, 'utf8', function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
        });
    });

    console.log("End for each")

}
function checkDirectorySync(directory) {
    try {
        fs.statSync(directory);
    } catch (e) {
        fs.mkdirSync(directory);
    }
}

function updateListComponent(x){
   // fs.readFile(x,'utf8')
}*/