# listen.js

Listen.js is a function that helps abstract listening functionality for your
express-based apps. There's a good chance it'll work for other stuff as well,
but this has not been tested.

It supports listening on either a port or a unix socket and handles left behind
socket files and such by checking if they're still in use. If a socket file is
still in use, the process will exit. If not, it'll delete the socket file and
listen.

```bash
$ npm install --save listen.js
```

### Usage

```js
var app = require('express')(),
  listen = require('listen.js')

listen(app, 3000);
// or
listen(app, '/var/run/myapp.sock');
```
