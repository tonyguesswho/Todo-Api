var express = require("express");
var bodyParser = require("body-parser");

var { mongoose } = require("./db/mongoose");
var { User } = require("./models/users");
var { Todo } = require("./models/todos");

var app = express();
var port = process.env.PORT || 3000;
// app.get("/", (req, res) => {
//   res.send("welcome to the homepage");
// });

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
});
app.delete("/todos/:id", (req, res) => {
  var id = req.params.id;
  Todo.findByIdAndRemove(id)
    .then(result => {
      res.send(result);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

module.exports = { app };

app.listen(port, () => {
  console.log(`app started at port ${port}`);
});
