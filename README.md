Twitter Stream Search
======================

This is a simple application which use a Twitter Streaming API.
You can search twitter public streams without a special authorization.

This repositry has both server-side and client-side applications. The server-side application is a Node.js application.
And the client-side application is a simple javascript application.

How to use
---
* You have to install dependent libraries and set up your twitter application key.

```
$ git pull https://github.com/jojonki/twitter-stream-search
$ cd twitter-stream-search
$ npm install
$ cd public/
$ bower install
$ cd ../
$ touch security.js
  module.exports = {
    consumer_key        : 'xxxxxxxx',
    consumer_secret     : 'xxxxxxxx',
    access_token_key    : 'xxxxxxxx',
    access_token_secret : 'xxxxxxxx'
  }
$ node server.js
```

Libraries
----
- frontend
  - see public/bower.json

- serverside
  - see package.json


Contact
------

- [twitter/jojonki](https://twitter.com/jojonki)

License
----------
Copyright (c) 2014 jojonki

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including w ithout limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to  the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. I N NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
