let http = require('http');
let fs = require('fs');
let fileArray = [];

fs.readdir('posts', function (err, files) {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }
  files.forEach(function (file) {
    fileArray.push(file);
  });
});

http.createServer(function (req, res) {

  if (req.url === '/api/post/names') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    let jsonObject = {};
    for (const fileName in fileArray) {
      jsonObject[fileName] = fileArray[fileName];
    }
    return res.end(JSON.stringify(jsonObject));
  }
  fileArray.forEach(function (file) {
    if (req.url === '/api/post/' + file) {
      console.log('/api/post/' + file);
      fs.readFile('./posts/' + file, function (err, data) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify({mddata: new TextDecoder("utf-8").decode(data)}));
        res.end();
      });
    }
  })

  // res.writeHead(404, {'Content-Type': 'text/html'});
  // return res.end();

}).listen(8080);
