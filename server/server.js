var express = require("express");
var bodyParser = require("body-parser");

var { mongoose } = require("./db/mongoose");
var { User } = require("./models/users");
var { Todo } = require("./models/todos");

var app = express();

app.use(bodyParser.json());
app.post("/todos", (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo
    .save()
    .then(doc => {
      res.send(doc);
    })
    .catch(() => {
      console.log("error");
    });
});

// app.post("/users", (req, res) => {
//   var newUser = new User({
//     email: req.body.email
//   });
//   newUser.save().then(
//     doc => {
//       res.send(doc);
//     },
//     e => {
//       res.send(e);
//     }
//   );
// });

app.get("/todos", (req, res) => {
  Todo.find().then(
    todos => {
      res.send({ todos });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

module.exports = { app };

app.listen(3000, () => {
  console.log("app started");
});
