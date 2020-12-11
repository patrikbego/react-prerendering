const express = require('express');
const fs = require("fs");
const path = require("path");

const app = module.exports = express();

function error(status, msg) {
  const err = new Error(msg);
  err.status = status;
  return err;
}

function readFiles() {
  try {
    return fs.promises.readdir(path.resolve(__dirname, 'posts'));
  } catch (err) {
    console.error('Error occurred while reading directory!', err);
  }
}

// example: http://localhost:8080/api/post/names
app.get('/api/post/names', (req, res, next) => {
  readFiles().then((fileArray) => {
    console.log('fileArray: ' + fileArray);
    console.log('process.env.MY_VARIABLE: ' + process.env.MY_VARIABLE);

    let jsonObject = {};
    for (const fileName in fileArray) {
      jsonObject[fileName] = fileArray[fileName];
    }
    return res.end(JSON.stringify(jsonObject));
  }).catch((err) => {
    console.log(err.message)
    console.log(err.stack)
  });

});

// example: http://localhost:8080/api/post/java-introduction-to-blockchain.md
app.get('/api/post/:fileName', function (req, res, next) {
  let fileName = req.params.fileName;
  console.log('/api/post/' + fileName);

  fs.readFile('./posts/' + fileName, function (err, data) {
    // res.writeHead(200, {'Content-Type': 'application/json'});
    let meta = {
      title: fileName,
      description: "Desc " + fileName,
      keywords: "NI for now " + fileName,
      image: "/images/profile.jpg",
      // <meta
      //   property="og:image"
      //   content={`https://og-image.now.sh/${encodeURI(
      //     blogger.siteTitle
      //   )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
      // />
    }

    res.write(JSON.stringify({mddata: new TextDecoder("utf-8").decode(data), meta: meta}));
    res.end();
  });

});

app.use('/api', function (req, res, next) {
  // let key = req.query['api-key'];
  //
  // if (!key) return next(error(400, 'api key required'));
  //
  // if (!~apiKeys.indexOf(key)) return next(error(401, 'invalid api key'));
  //
  // req.key = key;
  next();
});

let apiKeys = ['foo', 'bar', 'baz'];

// example: http://localhost:8080/api/user/patrikbego
app.get('/api/user/:username', function (req, res, next) {
  let name = req.params.username;
  //findByUsername TODO implement
  let user = {
    name: 'Patrik',
    surname: 'Bego',
    about: 'Philosopher|Entrepreneur|Code and Life hacker',
    siteTitle: 'My shiny blog',
  };

  if (user) res.send(user);
  else next();
});

// example: http://localhost:8080/api/user/patrikbego
app.get('/api/user/:username/posts', function (req, res, next) {
  readFiles().then((fileArray) => {
    console.log('fileArray: ' + fileArray);
    console.log('process.env.MY_VARIABLE: ' + process.env.MY_VARIABLE);

    let jsonObject = {};
    for (const fileName in fileArray) {
      jsonObject[fileName] = fileArray[fileName];
    }
    return res.end(JSON.stringify(jsonObject));
  }).catch((err) => {
    console.log(err.message)
    console.log(err.stack)
  });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({error: err.message});
});

app.use(function (req, res) {
  res.status(404);
  res.send({error: "I find your lack of navigation disturbing!"});
});

if (!module.parent) {
  app.listen(8080);
  console.log('Express started on port 8080');
}
