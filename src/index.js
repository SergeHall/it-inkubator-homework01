const http = require('http');
let favicon = require('serve-favicon');
let finalhandler = require('finalhandler');
let path = require('path');

let _favicon = favicon(path.join(__dirname, 'public', 'favicon.ico'))

let requestCounter = 0;

const index = http.createServer((request, response) => {
  let done = finalhandler(request, response)

  _favicon(request, response, function onNext(err) {
    if (err) return done(err)

    switch (request.url) {
      case '/students':
        requestCounter++
        response.write('STUDENTS')
        break;
      case '/':
      case '/courses':
        requestCounter++
        response.write('FRONT + BACK')
        break;
      default:
        response.write('404 not found')
    }

    response.write(' IT Kamasutra ' + requestCounter)
    response.end()
  })
})

index.listen(5000)