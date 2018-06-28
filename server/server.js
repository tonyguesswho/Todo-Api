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
    .catch(e => {
      console.log(e);
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

app.get("/todos/:id", (req, res) => {
  Todo.find({
    _id: req.params.id
  }).then(
    todo => {
      res.send({ todo });
    },
    e => {
      res.status(400).send(e);
    }
  );
  //res.send(req.params);
});

module.exports = { app };

app.listen(3000, () => {
  console.log("app started");
});
