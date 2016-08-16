var bcrypt = require('bcryptjs');
var HASH_ROUNDS = 10;
var secureRandom = require('secure-random');

// var mysql = require('mysql');

// // create a connection to our Cloud9 server
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'takanarisasaki',
//   password : '',
//   database: 'mentalHelp'
// });


// module.exports = function mentalHelpAPI(conn) {
//     return {
//         createUser: function(userObj, callback) {
            
//             bcrypt.hash(userObj.password, HASH_ROUNDS, function(err, hashedPassword) {
//                 //console.log("hashedPassword", hashedPassword);
//                 if (err) {
//                     callback(err);
//                 }
//                 else {
//                     conn.query(
//                         `INSERT INTO users (username, password, createdAt, updatedAt) VALUES (?, ?, ?, ?)`,
//                         [userObj.username, hashedPassword, new Date(), new Date()],
//                         function(err, result) {
                            
//                             if (err) {
//                                 if (err.code === 'ER_DUP_ENTRY') {
//                                     callback(new Error('A user with this username already exists'));
//                                 }
//                                 else {
//                                     callback(err);
//                                 }
//                             }
//                             else {
//                                 conn.query(
//                                     `SELECT * FROM users WHERE id = ?`, [result.insertId],
//                                     function(err, userInfo) {
//                                         if (err) {
//                                             callback(err);
//                                         }
//                                         else {
//                                             callback(null, userInfo);
//                                         }
//                                     }
                                    
//                                 )
                                
//                             }
//                         }
                        
                        
                        
//                     )
//                 }
                
//             });
//         }
        
    
//         // createSession: function(userId, callback) {
//         //     // this createSessionToken function creates a big random string
//         //     function createSessionToken() {
//         //         return secureRandom.randomArray(100).map(code => code.toString(36)).join('');
//         //     }
//         //     var token = createSessionToken();
        
//         //     //console.log("HELLO TOKEN", token);
//         //     conn.query('INSERT INTO sessions SET userId = ?, token = ?', [userId, token], function(err, result) {
//         //         //console.log("PRINT TOKEN", token);
//         //         //console.log(result);
//         //         if (err) {
//         //             callback(err);
//         //         }
//         //         else {
        
//         //             callback(null, token); // this is the secret session token :)
//         //         }
//         //     })
//         // },
        
        
//         // getUserFromSession: function(sessionCookie, callback) {
//         //     //sessionCookie is the long-complicated-string (cookie) that each user is assigned to when logging in.
//         //     //console.log("PRINT SESSION COOKIE", sessionCookie);
//         //     conn.query(`
//         //         SELECT * FROM sessions WHERE token = ?`, [sessionCookie],
//         //             function(err, userInfo) {
//         //                 //userInfo is an array that contains an object with userId and token
//         //                 //console.log(userInfo);
//         //                 if (err) {
//         //                     callback(err);
//         //                 }
//         //                 else {
//         //                     //console.log("RESPONSE", userInfo[0]);
//         //                     //return the object inside the array
//         //                     callback(null, userInfo[0]);
//         //                 }
//         //             }
//         //     );
//         // },


//         // removeCookieFromSession: function(sessionCookie, callback) {
//         //     conn.query(`
//         //         DELETE FROM sessions WHERE token = ?`, [sessionCookie], function(err, response) {
//         //             if (err) {
//         //                 callback(err);
//         //             }
//         //             else {
//         //                 //console.log("RESPONSE", response);
//         //                 callback(null, response);
//         //             }
//         //         }
//         //     );
//         // }
        
        
        
//     }
// }(connection);