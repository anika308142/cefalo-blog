const { request } = require('express');
let userController = require('../../controller/userController');
//const User = require('../../models/user');
//let User=require('../../models/user')
//let response =require('../../utils/mockResponse');
const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();
jest.mock('../../models/user', () => () => {
  const SequelizeMock = require("sequelize-mock");
  const dbMock = new SequelizeMock();
  return dbMock.define('User',  {
   uid: 'xyz',
    password: '1234',
    name :'xyz'
  })

});

describe("Test Sequelize Mocking", () => { 
  
  //------log in------
  test("log in user", async() => {
    let request={
       body:{
      uid:'xyz',
      password:'1234'}
    }
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
     await userController.loginUser(request,response) ;
    console.log(response);
    expect(response.statusCode).toEqual(200);
  })

//-----bad request-----
test("bad request", async() => {
  let request={
     body:{
    uid:'xyz',
    password:''}
  }
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
   await userController.loginUser(request,response) ;
  console.log(response);
  expect(response.statusCode).toEqual(400);});

  //-----password incorrect-----
  test("password incorrect", async() => {
    let request={
       body:{
      uid:'xyz',
      password:'12345'}
    }
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
       
     await userController.loginUser(request,response) ;
     //await User.findOne();
    console.log(response);
    expect(response.statusCode).toEqual(403);
  });

  //------user not found------
  test("user not found", async() => {
    let request={
       body:{
      uid:'xy',
      password:'1234'}
    }
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
     await  userController.loginUser(request,response) ;
    console.log(response);
    expect(response.statusCode).toEqual(404);
    
  })
  });

