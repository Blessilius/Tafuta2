"use strict";

var bcrypt = require("bcrypt");

var collection = require("./config");

var _require = require('.'),
    app = _require.app;

app.post("/login", function _callee(req, res) {
  var check, isPasswordMatch;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(collection.findOne({
            name: req.body.username
          }));

        case 3:
          check = _context.sent;

          if (check) {
            _context.next = 8;
            break;
          }

          res.send("Username not found");
          _context.next = 12;
          break;

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.password, check.password));

        case 10:
          isPasswordMatch = _context.sent;

          if (isPasswordMatch) {
            req.session.user = check; // Add this line to store the user in the session

            res.render("home");
          } else {
            res.send("Wrong password");
          }

        case 12:
          try {} catch (error) {
            console.error(error);
            res.status(500).send("An error occurred during login.");
          }

        case 13:
          _context.prev = 13;
          return _context.finish(13);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0,, 13, 15]]);
});
//# sourceMappingURL=newFile.dev.js.map
