// var SequelizeMock = require('sequelize-mock');
// //sequelize.$overrideImport('../../post/model.js', './post/mock.js');
// let Post=require('../../models/post')
// var dbMock = new SequelizeMock();
// var myModule = proxyquire('userController', {
//     '../models/user': UserMock
// });
// var UserMock = dbMock.define('post', {
//     pid: 'abc123',
//     uid: 'tester',
//     title: 'every story',
//     story: 'once upon a time..'
// }, {
//     instanceMethods: {
//         getFullName: function () {
//             return this.get('pid') + ' ' + this.get('uid');
//         },
//     },
// });
// describe('getpostbyid', function () {
//     test("one post", function (done) {
//         myModule.getUserEmail(1).then(function (email) {

//             // Given the defined Mock object above, the default values should be used for all the values
//             email.should.equal('Jane Doe <test@example.com>')

//             done();

//         }).catch(done);
//     });
// });