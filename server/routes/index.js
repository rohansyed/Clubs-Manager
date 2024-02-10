/* eslint-disable linebreak-style */
/* eslint-disable prefer-destructuring */
var express = require('express');
const { connect } = require('.');
var router = express.Router();
const sanitizeHTML = require('sanitize-html');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/get_header', function(req, res, next) {

//   var header_text = `
//   <div class="home_button"><a href="/">HotSpots</a></div>
//   <div v-if="user==false" class="login_button"><a href="/login.html">Login</a></div>
//   <div v-else v-on:click="logout_function" class="login_button"><a>Logout</a></div>

//   <div class="search_field">
//       <div>
//       <input v-model="input" type="text" placeholder="search for your clubs...">
//       <div v-on:click="header_search" type="button"><span class="fa fa-search"></span></div>
//   </div>
//   </div>
// `;
//   res.send(header_text);


// });

router.get('/user_status', function (req, res, next) {
  const user_status = req.session.user;
  if (user_status === undefined) {
    res.send("false");
  } else {
    res.send("true");
  }
});

router.get('/sysadmin_status', function (req, res, next) {
  const sysadmin_status = req.session.sysadmin;
  if (sysadmin_status === undefined) {
    res.send("false");
  } else {
    res.send("true");
  }
});

router.get('/get_username', function (req, res, next) {
  const user_status = req.session.user;
  if (user_status !== undefined) {
    res.send(req.session.user.username);
  }
  else {
    res.sendStatus(500);
  }
});

router.post('/is_member', function (req, res, next) {
  const usr = req.session.user.username;
  // console.log(usr);
  let id = (req.body.club_id);

  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    var query = "SELECT * FROM memberships WHERE club_id=" + sanitizeHTML(id) + " AND username='" + usr + "'";

    connection.query(query, function (queryErr, rows, fields) {
      connection.release();
      if (queryErr) {
        console.log(queryErr);
        res.sendStatus(500);
        return;
      }
      // console.log("this", rows);
      res.json(rows);
    });
  });
});

router.post('/join_club', function (req, res, next) {
  const usr = (req.session.user.username);
  // console.log(usr);
  let id = req.body.club_id;

  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    var query = "INSERT INTO memberships (join_date, username, club_id, notification) VALUES ((SELECT CURRENT_TIMESTAMP),'" + usr + "'," + id + ", 1)";

    connection.query(query, function (queryErr, rows, fields) {
      connection.release();
      if (queryErr) {
        console.log(queryErr);
        res.sendStatus(500);
        return;
      }
      // console.log(rows);
      res.json(rows);
    });
  });
});

router.post('/leave_club', function (req, res, next) {
  const usr = (req.session.user.username);
  // console.log(usr);
  let id = req.body.club_id;

  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    var query = "DELETE FROM memberships WHERE username='" + usr + "' AND club_id=" + id;

    connection.query(query, function (queryErr, rows, fields) {
      connection.release();
      if (queryErr) {
        console.log(queryErr);
        res.sendStatus(500);
        return;
      }
      // console.log(rows);
      res.json(rows);
    });
  });
});

// get a list of clubs available (used in search_clubs.html)
router.post('/get_club_list', function (req, res, next) {

  // console.log("TEST");
  const p = (req.body.param);
  console.log(p);

  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    var query = "SELECT * FROM club WHERE club_name LIKE '%" + sanitizeHTML(p) + "%'";

    connection.query(query, function (queryErr, rows, fields) {
      connection.release();
      if (queryErr) {
        console.log(queryErr);
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });

  // res.send(club_list);

});

router.post('/get_search_events', function (req, res, next) {

  const p = (req.body.param);
  console.log(p);

  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    var query = "SELECT * FROM event JOIN club ON event.club_id=club.club_id WHERE event_name LIKE '%" + sanitizeHTML(p) + "%'";

    connection.query(query, function (queryErr, rows, fields) {
      connection.release();
      if (queryErr) {
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });

  // res.send(event_list);
});

// router.post('/create_new_club', function (req, res, next) {

//   var n = (req.body.name);
//   var d = (req.body.description);
//   var b = (req.body.banner);
//   var u = (req.body.username);


//   req.pool.getConnection(function (err, connection) {
//     if (err) {
//       res.sendStatus(500);
//       return;
//     }

//     var query = "INSERT INTO club (club_name, club_desc, founded_date, username) VALUES ('" + sanitizeHTML(n) + "','" + sanitizeHTML(d) + "',(SELECT CURRENT_TIMESTAMP),'" + sanitizeHTML(u) + "')";

//     connection.query(query, function (queryErr, rows, fields) {
//       connection.release();
//       if (queryErr) {
//         // console.log(queryErr);
//         res.sendStatus(500);
//         return;
//       }
//       // console.log();
//       res.json(rows);
//     });

// var query2 = "SELECT username FROM club WHERE club='"+u+"'";
// connection.query(query, function (queryErr, rows, fields) {
//   connection.release();
//   if (queryErr) {
//     // console.log(queryErr);
//     res.sendStatus(500);
//     return;
//   }
//   // console.log(rows);
//   res.json(rows);
// });

//   });

// res.send(event_list);
// });

// get list of joined clubs for user (used in sidebar)
router.post('/get_joined_clubs', function (req, res, next) {

  const usr_id = (req.session.user.username);
  // console.log(usr_id);
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    var query = "SELECT club.club_name, club.club_id FROM memberships JOIN club ON memberships.club_id=club.club_id WHERE memberships.username='" + usr_id + "'";

    connection.query(query, function (queryErr, rows, fields) {
      connection.release();
      if (queryErr) {
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
  // console.log(usr_id);

});

//  get list of managed clubs for users (used in sidebar)
router.post('/get_managed_clubs', function (req, res, next) {

  const usr_id = (req.session.user.username);
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    var query = "SELECT * FROM club WHERE username='" + usr_id + "'";

    connection.query(query, function (queryErr, rows, fields) {
      connection.release();
      if (queryErr) {
        console.log(queryErr);
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});

// route to send list of current events when in dashboard
router.get('/get_dashboard_events', function (req, res, next) {

  const usr_id = (req.session.user.username);

  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    var query = "SELECT club.club_id, event_id, event_name, event_desc, time_start, time_end, location, club.club_banner FROM memberships JOIN club ON memberships.club_id=club.club_id JOIN event ON event.club_id=club.club_id WHERE memberships.username='" + usr_id + "';";

    connection.query(query, function (qErr, rows, fields) {
      connection.release();
      if (qErr) {
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });

});

// path for getting information on an individual club
router.post('/get_club', function (req, res, next) {
  var id = (req.body.club_id);
  console.log(id);

  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    var query = "SELECT * FROM club WHERE club_id=" + sanitizeHTML(id);

    console.log(query);

    connection.query(query, function (queryErr, rows, fields) {
      connection.release();
      if (queryErr) {
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });

});

// login path - FINISHED (DON'T TOUCH)
router.post('/login', function (req, res, next) {

  // if client-side already has an existing session
  if (req.session.user) {
    return res.redirect('/dashboard.html');
  }

  var username = (req.body.username);
  var password = (req.body.password);

  // Query to check whether login details are valid
  const query = 'SELECT * FROM user WHERE username = ? AND password = ?';

  req.pool.getConnection((err, connection) => {
    if (err) {
      console.log('error connecting to db');
      res.sendStatus(500);
      return;
    }

    connection.query(query, [username, password], (errorQuery, results) => {

      if (errorQuery) {
        console.log('error running query');
        res.sendStatus(500);
        return;
      }

      // If invalid login details
      if (results.length === 0) {
        res.status(401).json({ message: 'Username OR Password Entry INVALID' });
        return;
      }

      // successful login
      if (results.length > 0) {

        // storing details in session
        req.session.user = {
          username: results[0].username,
          password: results[0].password
        };

        // for page redirection
        res.sendStatus(200);
      }

    });
  });
});

// signup path - FINISHED (DON'T TOUCH)
router.post('/signup', function (req, res, next) {

  var username = (req.body.username);
  if (/^[^@]+@\w+(.\w+)+\w$/.test(req.body.email) === false) {
    res.sendStatus(422);
    return;
  }
  var email = (req.body.email);
  var password = (req.body.password);

  // Query to check for existing usernames
  const query = 'SELECT * FROM user WHERE username = ?';

  // Query for adding user info to database
  const queryNewInfo = 'INSERT INTO user (username, email, password) VALUES (?, ?, ?)';

  req.pool.getConnection((err, connection) => {
    if (err) {
      console.log(1);
      res.sendStatus(500);
      return;
    }

    connection.query(query, [username], (errorQuery, results) => {
      if (errorQuery) {
        connection.release();
        console.log(2);
        res.sendStatus(500);
        return;
      }

      // if more than 0, username already exists
      if (results.length > 0) {
        connection.release();
        res.status(409).json({ message: 'USERNAME NOT AVAILABLE' });
        return;
      }

      // New info insertion
      connection.query(queryNewInfo, [username, email, password], (errorQueryTwo, result) => {
        connection.release();

        if (errorQueryTwo) {
          console.log(errorQueryTwo);
          res.sendStatus(500);
          return;
        }

        // for page redirection
        res.sendStatus(200);
      });
    });
  });
});


// login_sysadmin path - FINISHED (DON'T TOUCH)
router.post('/login_sysadmin', function (req, res, next) {

  // if client-side already has an existing session
  if (req.session.sysadmin) {
    return res.redirect('/Logged_in_admin.html');
  }

  var username = (req.body.username);
  var password = (req.body.password);

  // Query to check whether login details are valid
  const query = 'SELECT * FROM sysadm WHERE username = ? AND password = ?';

  req.pool.getConnection((err, connection) => {
    if (err) {
      console.log('error connecting to db');
      res.sendStatus(500);
      return;
    }

    connection.query(query, [username, password], (errorQuery, results) => {

      if (errorQuery) {
        console.log('error running query');
        res.sendStatus(500);
        return;
      }

      // If invalid login details
      if (results.length === 0) {
        res.status(401).json({ message: 'Username OR Password Entry INVALID' });
        return;
      }

      // successful login
      if (results.length > 0) {

        // storing details in session (specific to sysadmins)
        req.session.sysadmin = {
          username: results[0].username,
          password: results[0].password
        };

        // for page redirection
        res.sendStatus(200);
      }

    });
  });
});

// signup_sysadmin path - FINISHED (DON'T TOUCH)
router.post('/signup_sysadmin', function (req, res, next) {

  var username = (req.body.username);
  var password = (req.body.password);
  var date = (req.body.date);

  // Query to check for existing usernames
  const query = 'SELECT * FROM sysadm WHERE username = ?';

  // Query for adding user info to database
  const queryNewInfo = 'INSERT INTO sysadm (username, password, created_date) VALUES (?, ?, ?)';

  req.pool.getConnection((err, connection) => {
    if (err) {
      console.log('Error connecting to database');
      res.sendStatus(403);
      return;
    }

    connection.query(query, [username], (errorQuery, results) => {
      if (errorQuery) {
        connection.release();
        console.log('Error running username check query');
        res.sendStatus(404);
        return;
      }

      // if more than 0, username already exists
      if (results.length > 0) {
        connection.release();
        console.log('USERNAME NOT AVAILABLE');
        res.sendStatus(409);
        return;
      }

      // New info insertion
      connection.query(queryNewInfo, [username, password, date], (errorQueryTwo, result) => {
        connection.release();

        if (errorQueryTwo) {
          console.log('Error inserting new info into db');
          res.sendStatus(500);
          return;
        }

        // for page redirection
        res.sendStatus(200);
      });
    });
  });
});


// account_details path - FINISHED (DON'T TOUCH)
router.post('/account_details', function (req, res, next) {

  var firstName = (req.body.firstName);
  var lastName = (req.body.lastName);
  var currentUsername = (req.body.username);
  var newUsername = (req.body.newUsername);
  var currentPassword = (req.body.password);
  var newPassword = (req.body.newPassword);

  var sessionUsername = req.session.user.username;
  var sessionPassword = req.session.user.password;

  // client error status code - no names given
  if (!firstName || !lastName) {
    res.sendStatus(400);
    return;
  }

  // conflict status - missing either field
  if ((currentUsername && !newUsername) || (newUsername && !currentUsername)) {
    res.sendStatus(409);
    return;
  }

  // length required - mising either field
  if ((currentPassword && !newPassword) || (newPassword && !currentPassword)) {
    res.sendStatus(411);
    return;
  }

  // checks if current input username matches original username
  if (currentUsername && newUsername) {
    if (currentUsername !== sessionUsername) {
      res.sendStatus(403); // using status 403 for incorrect current username
      return;
    }
  }

  // checks if current input password matches original password
  if (currentPassword && newPassword) {
    if (currentPassword !== sessionPassword) {
      res.sendStatus(406); // using status 406 for incorrect current password
      return;
    }
  }

  // case where both username fields are left blank
  if (!currentUsername && !newUsername) {
    newUsername = sessionUsername;
  }

  // case where both password fields are left blank
  if (!currentPassword && !newPassword) {
    newPassword = sessionPassword;
  }

  // Query to get current user's email
  const emailQuery = 'SELECT email FROM user WHERE username = ?';

  // Query for adding user info to database
  const queryNewInfo = `UPDATE user SET username = ?, password = ?, first_name = ?, last_name = ? WHERE email = ?`;

  req.pool.getConnection((err, connection) => {
    if (err) {
      console.log('account_details db connection failed');
      res.sendStatus(500);
      return;
    }

    // first query must be to get the email (only data not changable)
    connection.query(emailQuery, [sessionUsername], (errorQuery, results) => {
      if (errorQuery) {
        connection.release();
        console.log('failed to acquire user email');
        res.sendStatus(500);
        return;
      }

      // processing data output
      var rawData = JSON.stringify(results);
      var parsedEmail = JSON.parse(rawData);
      var email = parsedEmail[0].email;

      // TEMP - Used for tesing only
      // console.log(email);
      // console.log(newUsername);
      // console.log(newPassword);
      // console.log(firstName);
      // console.log(lastName);

      // New info insertion
      connection.query(queryNewInfo, [newUsername, newPassword, firstName, lastName, email], (errorQueryTwo, result) => {

        if (errorQueryTwo) {
          connection.release();
          console.log('could not insert new account information');
          res.sendStatus(500);
          return;
        }

        // storing latest details in session - This breaks the whole route for some reason
        // but functions perfectly fine without it.
        // req.session.user = {
        // username: results[0].newUsername,
        // password: results[0].newPassword
        // };

        // for page redirection
        res.sendStatus(200);
      });
    });
  });
});

// logout path - FINISHED
router.get('/logout', function (req, res, next) {

  if (req.session.user || req.session.sysadmin) {
    delete req.session.user; // removes both session cookies
    delete req.session.sysadmin;
    return res.redirect('/index.html');
  }

  // if someone is trying to log out while never being logged in
  console.log('Not Currently Logged In');
  res.sendStatus(500);
});


// ROHAN COMMENTS: MOVED TYSONS ROUTES HERE

/* getting posts */
router.post('/getting_post', function (req, res, next) {

  var id = (req.body.club_id);

  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    var query = "SELECT * FROM post WHERE club_id=" + sanitizeHTML(id);

    console.log(query);

    connection.query(query, function (queryErr, rows, fields) {
      connection.release();
      if (queryErr) {
        console.log(queryErr);
        res.sendStatus(500);
        return;
      }
      // console.log(rows);
      res.json(rows);
    });
  });
});


/* sending a post to the server */
router.post('/submit_post', function (req, res, next) {

  let post = (req.body.post_details);
  let u_id = (req.body.username);
  let c_id = (req.body.club_id);
  console.log(post[0], u_id, c_id);


  /* if post id, title, body, date, user id and club id, are correctly passed */
  if (((post[0].title).length <= 0) || ((post[0].description).length <= 0) || (c_id.length <= 0)) {
    res.sendStatus(401).json({ message: 'Incomplete form' });
  } else {
    req.pool.getConnection(function (err, connection) {
      if (err) {
        res.sendStatus(500);
        return;
      }

      var query = "INSERT INTO post (post_title, post_body, post_comments, post_date, username, club_id, visibility) VALUES ('" + sanitizeHTML(post[0].title) + "','" + sanitizeHTML(post[0].description) + "', NULL , (SELECT CURRENT_TIMESTAMP),'" + sanitizeHTML(u_id) + "'," + sanitizeHTML(c_id) + ",'" + sanitizeHTML(post[0].visibility) + "')";

      console.log(query);

      connection.query(query, function (queryErr, rows, fields) {
        connection.release();
        if (queryErr) {
          console.log(queryErr);
          res.sendStatus(500);
          return;
        }
        res.json(rows);
      });
    });
  }
});


/* adding a member to the club */
router.post('/add_member', function (req, res, next) {

  let post = (req.body);

  /* if post id, title, body, date, user id and club id, are correctly passed */
  if ('joined_date' in post && 'club_id' in post) {

    req.pool.getConnection(function (cerr, connection) {
      if (cerr) {
        // failed to connect
        console.log(cerr);
        console.log('failed to connect to post');
        res.sendStatus(500);
        return;
      }

      const time = new Date();
      let id_of_post = String(time.getDay() + time.getHours()
        + time.getMinutes() + time.getSeconds());

      let extra_info = `INSERT INTO post(
          memberships_id,
          user_id,
        ) VALUES(
          ?,
          ?
        );`;

      connection.query(
        extra_info,
        [req.body.joined_date, req.body.club_id],
        function (query_error, rows, fields) {

          connection.release();

          if (query_error) {
            console.log("failed to query database");
            res.sendStatus(500);
            return;
          }
          console.log("query successful");

          // res.end(); Why are u ending this?
          res.sendStatus(200);
        }
      );
    });
  }
});


// I don't know what these two GET routes are supposed to do
// but I dont think you need these (routes need a '/')
/* display members */
router.post('/get_members', function (req, res, next) {

  let id = (req.body.club_id);

  /* if post id, title, body, date, user id and club id, are correctly passed */
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    var query = "SELECT * FROM memberships JOIN user ON memberships.username=user.username WHERE club_id=" + sanitizeHTML(id);

    // console.log(query);

    connection.query(query, function (queryErr, rows, fields) {
      connection.release();
      if (queryErr) {
        console.log(queryErr);
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });


});


/* get_event_date */
// router.get('/get_event_date', function (req, res, next) {

//   req.pool.getConnection(function (cerr, connection) {
//     if (cerr) {
//       res.sendStatus(500);
//       alert(cerr);
//       return;
//     }
//     var membership_query = 'SELECT time_start FROM event';
//     connection.query(membership_query, function (qerr, rows, fields) {
//       connection.release();
//       if (qerr) {
//         res.sendStatus(500);
//         alert(qerr);
//         return;
//       }
//       res.json(rows);
//     });
//   });
// });

/* get general club infomation */
// router.get('/get_event_information', function (req, res, next) {

//   req.pool.getConnection(function (cerr, connection) {
//     if (cerr) {
//       res.sendStatus(500);
//       alert(cerr);
//       return;
//     }
//     var membership_query = 'SELECT event_desc FROM event';
//     connection.query(membership_query, function (qerr, rows, fields) {
//       connection.release();
//       if (qerr) {
//         res.sendStatus(500);
//         alert(qerr);
//         return;
//       }
//       res.json(rows);
//     });
//   });
// });

/* get_event_pic
no current picture
router.get('/get_event_pic', function (req, res, next) {

  req.pool.getConnection(function(cerr, connection){
    if (cerr){
      res.sendStatus(500);
      alert(cerr);
      return;
    }
    var membership_query = 'SELECT time_start FROM event';
    connection.query(membership_query, function(qerr, rows, fields){
      connection.release();
      if (qerr){
        res.sendStatus(500);
        alert(qerr);
        return;
      }
      res.json(rows);
    });
  });
});
*/

/* getting event list */
router.post('/getting_events', function (req, res, next) {

  var id = (req.body.club_id);

  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    var query = "SELECT * FROM event WHERE club_id=" + sanitizeHTML(id);

    console.log(query);

    connection.query(query, function (queryErr, rows, fields) {
      connection.release();
      if (queryErr) {
        console.log(queryErr);
        res.sendStatus(500);
        return;
      }
      // console.log(rows);
      res.json(rows);
    });
  });
});

router.post('/check_notif', function (req, res, next) {

  var id = (req.body.club_id);
  var usr_id = req.session.user.username;

  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    var query = "SELECT notification FROM memberships WHERE username='" + usr_id + "' AND club_id=" + sanitizeHTML(id);

    connection.query(query, function (queryErr, rows, fields) {
      connection.release();
      if (queryErr) {
        console.log(queryErr);
        res.sendStatus(500);
        return;
      }
      // console.log(rows);
      res.json(rows);
    });
  });
});

router.post('/change_notif', function (req, res, next) {

  var id = (req.body.club_id);
  var ntf = (req.body.notif);
  var usr_id = req.session.user.username;


  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    var query = "UPDATE memberships SET notification=" + sanitizeHTML(ntf) + " WHERE username='" + usr_id + "' AND club_id=" + sanitizeHTML(id);

    connection.query(query, function (queryErr, rows, fields) {
      connection.release();
      if (queryErr) {
        console.log(queryErr);
        res.sendStatus(500);
        return;
      }
      // console.log(rows);
      res.json(rows);
    });
  });
});



router.post('/submit_rsvp', function (req, res, next) {

  var id = (req.body.event_id);
  var usr = (req.session.user.username);

  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    var query = "INSERT INTO rsvps(username, event_id) VALUES('" + usr + "'," + sanitizeHTML(id) + ")";

    console.log(query);

    connection.query(query, function (queryErr, rows, fields) {
      connection.release();
      if (queryErr) {
        console.log(queryErr);
        res.sendStatus(500);
        return;
      }
      // console.log(rows);
      res.json(rows);
    });
  });
});

router.post('/remove_rsvp', function (req, res, next) {

  var id = (req.body.event_id);
  var usr = (req.session.user.username);

  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    var query = "DELETE FROM rsvps WHERE username='" + usr + "' AND event_id=" + sanitizeHTML(id);

    console.log(query);

    connection.query(query, function (queryErr, rows, fields) {
      connection.release();
      if (queryErr) {
        console.log(queryErr);
        res.sendStatus(500);
        return;
      }
      // console.log(rows);
      res.json(rows);
    });
  });
});

router.post('/check_rsvp', function (req, res, next) {

  var id = (req.body.event_id);
  var usr = (req.session.user.username);

  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    var query = "SELECT * FROM rsvps WHERE username='" + usr + "' AND event_id=" + sanitizeHTML(id);

    console.log(query);

    connection.query(query, function (queryErr, rows, fields) {
      connection.release();
      if (queryErr) {
        console.log(queryErr);
        res.sendStatus(500);
        return;
      }
      // console.log(rows);
      res.json(rows);
    });
  });
});


/* getting rsvp list */
router.post('/getting_rsvp', function (req, res, next) {

  var id = req.body.event_id;

  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    var query = "SELECT * FROM rsvps WHERE event_id=" + id;

    console.log(query);

    connection.query(query, function (queryErr, rows, fields) {
      connection.release();
      if (queryErr) {
        console.log(queryErr);
        res.sendStatus(500);
        return;
      }
      // console.log(rows);
      res.json(rows);
    });
  });
});

/* post new event */
router.post('/submit_event', function (req, res, next) {
  var new_event_name = (req.body.name);
  var new_event_description = (req.body.description);
  var new_event_start_date = (req.body.start_date);
  var new_event_start_date2 = (new Date(new_event_start_date));
  console.log(new_event_start_date2);
  var new_event_start_date3 = (new_event_start_date2.toISOString().slice(0, 19).replace('T', ' '));
  var new_event_end_date = (req.body.end_date);
  var new_event_end_date2 = (new Date(new_event_end_date));
  var new_event_end_date3 = (new_event_end_date2.toISOString().slice(0, 19).replace('T', ' '));
  var id = (req.body.club_id);

  // console.log(new_event_end_date, "-------------------");
  // console.log(new_event_end_date2, "-------------------");
  // console.log(new_event_end_date3, "-------------------");

  var new_event_location = req.body.location;

  // client error status code - form details lacking given
  if (!new_event_name || !new_event_description || !new_event_start_date
    || !new_event_start_date2 || !new_event_start_date3 || !new_event_end_date
    || !new_event_end_date2 || !new_event_end_date3 || !id) {
    res.sendStatus(400);
    return;
  }

  req.pool.getConnection(function (cerr, connection) {
    if (cerr) {
      res.sendStatus(500);
      return;
    }

    var query = "INSERT INTO event (event_name, event_desc, time_start, time_end, location, club_id, event_banner) VALUES ('" + sanitizeHTML(new_event_name) + "','" + sanitizeHTML(new_event_description) + "', CAST('" + sanitizeHTML(new_event_start_date3) + "' AS DATETIME), CAST('" + sanitizeHTML(new_event_end_date3) + "' AS DATETIME),'" + sanitizeHTML(new_event_location) + "','" + sanitizeHTML(id) + "', NULL)";

    connection.query(query, function (qerr, rows, fields) {
      connection.release();
      if (qerr) {
        // console.log(qerr);
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});

/* getting rsvp list */
router.post('/getting_rsvp_list', function (req, res, next) {
  // console.log('inside getting_rsvp_list');
  // console.log('inside getting_rsvp_list');
  // console.log('inside getting_rsvp_list');
  // console.log('inside getting_rsvp_list');

  var id = req.body.club_id;
  // console.log(req.body);

  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    // change 1 to ? in query
    var query = "SELECT * FROM rsvps JOIN event ON event.event_id=rsvps.event_id WHERE club_id="+id;

    console.log(query);

    connection.query(query, function (queryErr, rows, fields) {
      connection.release();
      if (queryErr) {
        console.log(queryErr);
        res.sendStatus(500);
        return;
      }
      // console.log(rows);
      res.json(rows);
    });
  });
});


// END OF TYSON ROUTES

module.exports = router;

// Database query example

// router.get('/get_actors', function(req, res) {
//   req.pool.getConnection(function(err, connection) {
//     if(err) {
//       res.sendStatus(500);
//       return;
//     }

//     var query = "SELECT first_name, last_name FROM actor";
//     connection.query(query, function(err, rows, fields){
//       connection.release();
//       if(err) {
//         res.sendStatus(500);
//         return;
//       }
//       res.json(rows);
//     });
//   });
// });
