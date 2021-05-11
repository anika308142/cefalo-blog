let postController = require('../../controller/postController');
const sinon = require('sinon');
const db = require('../../models');
const Post = db.Post;
const clr = afterEach(function () {
  sinon.restore();
});
describe("Post Test", () => {
  //-----post bad request-----
  test("post bad request", async () => {
    let request = {
      body: {
       title:'hi',
       story:''
      }
    }
    let response = {
      statusCode: null,
      body: null,
      status: (code) => {
        response.statusCode = code;
      },
      cookie: (msg) => {
        response.cookie = msg
      },
      json: (msg) => {
        response.json = msg
      }
    }
   
    await postController.createPost(request, response);
    expect(response.statusCode).toEqual(400);
  })
  //------create post-----
  test("create post", async () => {
    let request = {
      body: {
       title:'hi',
       story:'bye'
      },
      user:{
        uid:'abc'
      }
    }
    let response = {
      statusCode: null,
      body: null,
      status: (code) => {
        response.statusCode = code;
      },
      cookie: (msg) => {
        response.cookie = msg
      },
      json: (msg) => {
        response.json = msg
      }
    }
    sinon.stub(Post, 'create').callsFake(() => {
      let requestObj = 
       {
        title:'hi',
        story:'bye'
       }
      return requestObj;
    });
    await postController.createPost(request, response);
    expect(response.statusCode).toEqual(201);
  })

  //-----read all post-----
  test("read all post", async () => {
    let request;
    let response = {
      statusCode: null,
      body: null,
      status: (code) => {
        response.statusCode = code;
      },
      cookie: (msg) => {
        response.cookie = msg
      },
      json: (msg) => {
        response.json = msg
      },
      format:(msg) => {
        response.format = msg
      }
    }
    sinon.stub(Post, 'findAll').callsFake(() => {
      let requestObj = 
       {
        title:'hi',
        story:'bye'
       }
      return requestObj;
    });
    await postController.readPost(request, response);
    expect(response.statusCode).toEqual(200);
  })
  clr;
  //-----no posts----
  test("no posts", async () => {
    let request;
    let response = {
      statusCode: null,
      body: null,
      status: (code) => {
        response.statusCode = code;
      },
      cookie: (msg) => {
        response.cookie = msg
      },
      json: (msg) => {
        response.json = msg
      },
      format:(msg) => {
        response.format = msg
      }
    }
    sinon.stub(Post, 'findAll').callsFake(() => {
      let requestObj = 0;
      return requestObj;
    });
    await postController.readPost(request, response);
    expect(response.statusCode).toEqual(404);
  })
  clr;
  //-----read post by id----
  test("read post by id", async () => {
    let request = {
      params: {
        pid:'123'
      }
    }
    let response = {
      statusCode: null,
      body: null,
      status: (code) => {
        response.statusCode = code;
      },
      cookie: (msg) => {
        response.cookie = msg
      },
      json: (msg) => {
        response.json = msg
      },
      format:(msg) => {
        response.format = msg
      }
    }
    sinon.stub(Post, 'findOne').callsFake(() => {
      let requestObj = 
       {
        pid:'123',
       title:'hi',
       story:'bye'
       }
      return requestObj;
    });
    await postController.readPostbyPid(request, response);
    expect(response.statusCode).toEqual(200);
  })
  //-----post by id 404-----
  test("read post by id", async () => {
    let request = {
      params: {
        pid:'123'
      }
    }
    let response = {
      statusCode: null,
      body: null,
      status: (code) => {
        response.statusCode = code;
      },
      cookie: (msg) => {
        response.cookie = msg
      },
      json: (msg) => {
        response.json = msg
      },
      format:(msg) => {
        response.format = msg
      }
    }
    sinon.stub(Post, 'findOne').callsFake(() => {
      let requestObj = 0;
      return requestObj;
    });
    await postController.readPostbyPid(request, response);
    expect(response.statusCode).toEqual(404);
  })
  //-----update post----
  test("update post", async () => {
    let request = {
      params: {
        pid:'123'
      },
      user:{
        uid:'abc'
      },
      body:{
        title:'hi',
        story:'bye'
      }
    }
    let response = {
      statusCode: null,
      body: null,
      status: (code) => {
        response.statusCode = code;
      },
      cookie: (msg) => {
        response.cookie = msg
      },
      json: (msg) => {
        response.json = msg
      },
      format:(msg) => {
        response.format = msg
      }
    }
    sinon.stub(Post, 'update').callsFake(() => {
      let requestObj = 1;
      return requestObj;
    });
    await postController.updatePost(request, response);
    expect(response.statusCode).toEqual(200);
  })
  clr;
  //-----update failed------
  test("update failed", async () => {
    let request = {
      params: {
        pid:'123'
      },
      user:{
        uid:'abc'
      },
      body:{
        title:'hi',
        story:'bye'
      }
    }
    let response = {
      statusCode: null,
      body: null,
      status: (code) => {
        response.statusCode = code;
      },
      cookie: (msg) => {
        response.cookie = msg
      },
      json: (msg) => {
        response.json = msg
      },
      format:(msg) => {
        response.format = msg
      }
    }
    sinon.stub(Post, 'update').callsFake(() => {
      let requestObj = 0;
      return requestObj;
    });
    await postController.updatePost(request, response);
    expect(response.statusCode).toEqual(403);
  })
  clr;
  //-----delete post-----
  test("delete post", async () => {
    let request = {
      params: {
        pid:'123'
      },
      user:{
        uid:'abc'
      }
    }
    let response = {
      statusCode: null,
      body: null,
      status: (code) => {
        response.statusCode = code;
      },
      cookie: (msg) => {
        response.cookie = msg
      },
      json: (msg) => {
        response.json = msg
      },
      format:(msg) => {
        response.format = msg
      }
    }
    sinon.stub(Post, 'destroy').callsFake(() => {
      let requestObj = 1;
      return requestObj;
    });
    await postController.deletePost(request, response);
    expect(response.statusCode).toEqual(200);
  })
  clr;
  //------delete fail-------
  test("delete fail", async () => {
    let request = {
      params: {
        pid:'123'
      },
      user:{
        uid:'abc'
      }
    }
    let response = {
      statusCode: null,
      body: null,
      status: (code) => {
        response.statusCode = code;
      },
      cookie: (msg) => {
        response.cookie = msg
      },
      json: (msg) => {
        response.json = msg
      },
      format:(msg) => {
        response.format = msg
      }
    }
    sinon.stub(Post, 'destroy').callsFake(() => {
      let requestObj = 0;
      return requestObj;
    });
    await postController.deletePost(request, response);
    expect(response.statusCode).toEqual(403);
  })
  clr;
})