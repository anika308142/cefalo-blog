const json2html = require('json2html');
var json2xml = require('json2xml');
function contentNegotiation(res, body) {
  res.format({
    "text/plain": function () {
      res.send(body);
    },
    "text/html": function () {
      let template = {
        '<>': 'li', 'html': [
          { "<>": "span", 'text': 'pid: ${pid} ' },
          { "<>": "span", 'text': 'uid: ${uid} ' },
          { "<>": "span", 'text': 'title: ${title} ' },
          { "<>": "span", 'text': 'story: ${story} ' }
        ]
      };
      body = json2html.render(body, template);
      res.send(body);
    },
    "application/json": function () {
      res.json(body);
    },
    'application/xml': () => {

      body = JSON.stringify(body);
      body = JSON.parse(body);
      body = json2xml(body);
      res.send(body);
    },
    default: function () {
      res.json(body);
    },
  });
}

module.exports = contentNegotiation;