let express = require("express");
let morgan = require("morgan");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let { StudentList } = require("./model");

let app = express();
let jsonpParser = bodyParser.json();
mongoose.Promise = global.Promise;

app.use(express.static("public"));
//Say to my server were gonna user public directory
app.use(morgan("dev"));
let students = [
  {
    name: "Valentin",
    id: 1
  },
  {
    name: "Alexandro",
    id: 2
  }
];

//======== FUNCTIONS ===================================================================================================
function isRepeated(key) {
  console.log(key);
  for (let index = 0; index < students.length; index++) {
    if (students[0].id === key) return true;
  }
  return false;
}

function exist(key) {
  console.log(key);
  for (let index = 0; index < students.length; index++) {
    if (students[0].id == key) return true;
  }
  return false;
}

function getStudentId(key) {
  console.log(key);

  for (let index = 0; index < students.length; index++) {
    if (students[index].id == key) {
      console.log("MATCH!");
      return students[index];
    }
  }
  return null;
}

function deleteStudent(key) {
  console.log(key);
  for (let index = 0; index < students.length; index++) {
    if (students[index].id == key) {
      console.log("MATCH!");
      students.splice(index);
      return true;
    }
  }
  return false;
}

function updateSdutent(key, object) {
  for (let index = 0; index < students.length; index++) {
    if (students[index].id == key) {
      console.log("MATCH!");
      students[index] = object;
      return true;
    }
  }
  return false;
}

//======== END FUNCTIONS ==============================================================================================

const MESSAGE_406 = "Missing field in body!";
const MESSAGE_409 = "Repeated Identifier!";
const MESSAGE_201 = "Student added successfully!";
const MESSAGE_404 = "Student id is not found on the list";
const MESSAGE_202 = "Student found successfully!";
const MESSAGE_500 = "Something when wrong with the DB. Try later.";

app.get("/api/students", (req, res) => {
  StudentList.get()
    .then(students => {
      return res.status(200).json(students);
    })
    .catch(error => {
      res.statusMessage = MESSAGE_500;
      return res.status(500).json({
        status: 500,
        message: MESSAGE_500
      });
    });
});

app.post("/api/postStudent", jsonpParser, (req, res) => {
  let id = req.body.id;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;

  let newStudent = {
      firstName,
      lastName,
      id
  }
  StudentList.post(newStudent)
    .then ( student => {
        res.statusMesage = MESSAGE_201;
        return res.status(201).json({
          message: MESSAGE_201,
          status: 201
        });
    })
    .catch(error => {
        res.statusMessage = MESSAGE_500;
        return res.status(500).json({
            status: 500,
             message: MESSAGE_500
        });
    });

  /*
  if (!id || !name) {
    res.statusResponse = MESSAGE_406;
    return res.status().json({
      message: MESSAGE_406,
      status: 406
    });
  } else if (isRepeated(id)) {
    res.statusResponse = MESSAGE_409;
    return res.status().json({
      status: 409,
      message: MESSAGE_409
    });
  } else {
    students.push(req.body);
    res.statusMesage = MESSAGE_201;
    return res.status(201).json({
      message: MESSAGE_201,
      status: 201
    });
  }*/
});

app.get("/api/getStudentById/", (req, res) => {
  const id = req.query.id;
  if (!id) {
    res.statusMessage = MESSAGE_406;
    return res.status(406).json({
      message: MESSAGE_406,
      status: 406
    });
  } else {
    let obj = getStudentId(id);
    res.statusMesage = MESSAGE_202;
    return res.status(201).json({
      message: MESSAGE_202,
      student: obj,
      status: 201
    });
  }
});

app.delete("/api/deleteStudent/:id*?", (req, res) => {
  const id = req.query.id;
  let obj = deleteStudent(id);
  res.statusMesage = "Object Deleted";
  return res.status(201).json({
    message: "Object Deleted",
    success: obj,
    status: 201
  });
});

app.put("/api/updateStudent/:id*?", jsonpParser, (req, res) => {
  const id = req.query.id;
  const body = req.body;
  console.log(req.body);
  let data = updateSdutent(id, body);
  res.statusMesage = "Object Deleted";
  return res.status(201).json({
    message: "Student Updated",
    success: data,
    status: 201
  });
});

let server;
function runServer(port, databaseURL) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseURL, err => {
      if (err) {
        return reject(err);
      } else {
        server = app.listen(port, () => {
          console.log("App is running on port: " + port);
          resolve();
        }).on('error', err => {
            mongoose.disconnect();
            return reject(err);
        })
      }
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log("Closing the server");
      server.close(err => {
        if (err) {
          return reject(err);
        } else {
          resolve();
        }
      });
    });
  });
}

runServer(8080, "mongodb://localhost/studentsDB").catch(err => {
  console.log(err);
});

module.exports = {app, runServer, closeServer};