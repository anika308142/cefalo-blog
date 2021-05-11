let userController = require('../../controller/userController');
const sinon = require('sinon');
const db = require('../../models');
const User = db.User;
const clr = afterEach(function () {
  sinon.restore();
});
describe("Test Sequelize Mocking", () => {
  //-----register user------
  test("register user", async () => {
    let request = {
      body: {
        uid: 'xyz',
        name: 'anika',
        password: '1234'
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
    sinon.stub(User, 'findOrCreate').callsFake(() => {
      let requestObj = [
        false, true
      ]
      return requestObj;
    });
    await userController.createUser(request, response);
    expect(response.statusCode).toEqual(201);
  })
  clr;
  //-----registration failed------
  test("user exists", async () => {
    let request = {
      body: {
        uid: 'xyz',
        name: 'anika',
        password: '1234'
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

    sinon.stub(User, 'findOrCreate').callsFake(() => {
      let requestObj = [
        true, false
      ]
      return requestObj;

    });
    await userController.createUser(request, response);
    expect(response.statusCode).toEqual(409);
  }
  )
  clr;
  //-----user bad request-----
  test("user bad request", async () => {
    let request = {
      body: {
        uid: 'xyz',
        name: '',
        password: ''
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
    await userController.createUser(request, response);
    expect(response.statusCode).toEqual(400);
  });
  //------log in------
  test("log in user", async () => {
    let request = {
      body: {
        uid: 'xyz',
        password: '1234'
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
    sinon.stub(User, 'findOne').callsFake(() => {
      let requestObj = {

        uid: 'ok',
        password: '1234'
      }

      return requestObj;
    });
    await userController.loginUser(request, response);
    expect(response.statusCode).toEqual(200);
  })
  clr;
  //----- login bad request-----
  test(" login bad request ", async () => {
    let request = {
      body: {
        uid: 'xyz',
        password: ''
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
    await userController.loginUser(request, response);
    expect(response.statusCode).toEqual(400);
  });
  //------user or password incorrect------
  test("user not found", async () => {
    let request = {
      body: {
        uid: 'xyz',
        password: '1234'
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

    sinon.stub(User, 'findOne').callsFake(() => {
      let requestObj = null;
      return requestObj;
    });

    await userController.loginUser(request, response);
    expect(response.statusCode).toEqual(404);

  })
});

