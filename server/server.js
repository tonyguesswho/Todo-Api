const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");

const { mongoose } = require("./db/mongoose");
const { User } = require("./models/users");
const { Todo } = require("./models/todos");

const app = express();
const port = process.env.PORT || 3000;
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
app.patch("/todos/:id", (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ["text", "completed"]);
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then(result => {
      res.send(result);
    })
    .catch(e => {
      res.status("400").send(e);
    });
});

module.exports = { app };

app.listen(port, () => {
  console.log(`app started at port ${port}`);
});
