let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let studentSchema = mongoose.Schema({
    firstName : {type : String},
    lastName : {type: String},
    id : {  type : Number,
            required : true }
});

let Student = mongoose.model('Student', studentSchema);
let StudentList = {
    get : function(){
        return Student.find()
                .then(students => {
                    return students;
                })
                .catch(err => {
                    throw Error(err);
                });

    },
    post :  function(newStudent){
        return Student.create(newStudent) //insert in terminal bun mongoose is create
            .then(student => {
                return student;
            })
            .catch(err => {
                throw Error(err);
            });
    }
}

module.exports = { StudentList };