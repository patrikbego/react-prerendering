const express = require('express');
const fs = require("fs");

const app = module.exports = express();

function error(status, msg) {
  const err = new Error(msg);
  err.status = status;
  return err;
}

function readFiles() {
  try {
    return fs.promises.readdir('posts');
  } catch (err) {
    console.error('Error occured while reading directory!', err);
  }
}

app.get('/api/post/names', function (req, res, next) {
  readFiles().then((fileArray) => {
    console.log(fileArray);

    let jsonObject = {};
    for (const fileName in fileArray) {
      jsonObject[fileName] = fileArray[fileName];
    }
    return res.end(JSON.stringify(jsonObject));
  });

});

// example: http://localhost:8080/api/post/java-introduction-to-blockchain.md
app.get('/api/post/:fileName', function (req, res, next) {
  let fileName = req.params.fileName;
  console.log('/api/post/' + fileName);
  fs.readFile('./posts/' + fileName, function (err, data) {
    // res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({mddata: new TextDecoder("utf-8").decode(data)}));
    res.end();
  });

});

app.use('/api', function (req, res, next) {
  let key = req.query['api-key'];

  if (!key) return next(error(400, 'api key required'));

  if (!~apiKeys.indexOf(key)) return next(error(401, 'invalid api key'));

  req.key = key;
  next();
});

let apiKeys = ['foo', 'bar', 'baz'];

// example: http://localhost:3000/api/user/patrikbego
app.get('/api/user/:username', function (req, res, next) {
  let name = req.params.username;
  //findByUsername
  let user = {name: 'Patrik', surname: 'Bego', about:'Philosopher|Entrepreneur|Code and Life hacker'};

  if (user) res.send(user);
  else next();
});

app.use(function (err, req, res, next) {
  // whatever you want here, feel free to populate
  // properties on `err` to treat it differently in here.
  res.status(err.status || 500);
  res.send({error: err.message});
});

app.use(function (req, res) {
  res.status(404);
  res.send({error: "Lame, can't find that"});
});

if (!module.parent) {
  app.listen(8080);
  console.log('Express started on port 3000');
}
