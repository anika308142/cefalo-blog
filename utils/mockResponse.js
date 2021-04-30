
    let response={
    statusCode: null,
  body: null,
  status: (code) => {
    response.statusCode = code;
  },
  cookie: (msg)=>{
    response.cookie = msg
  },
  json:(msg)=>{
    response.json = msg
  }
  }

  module.exports=response