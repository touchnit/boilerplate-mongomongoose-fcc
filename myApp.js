require('dotenv').config();
let mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [{ type: String }]
});

let Person = mongoose.model('Person', PersonSchema);

const createAndSavePerson = (done) => {
  let johnValjohn = new Person({ name: "John Valjohn", age: 42, favoriteFoods: ["burgers", "pastas"] })
  johnValjohn.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, null, null, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, null, null, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, null, null, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, null, null, function(err, personData) {
    if (err) return console.error(err);
    personData.favoriteFoods.push(foodToAdd);
    personData.save(function(err, personUpdated) {
      if (err) return console.error(err);
      done(null, personUpdated);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true, useFindAndModify: false }, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, { useFindAndModify: false }, function(err, removed) {
    if (err) return console.error(err);
    done(null, removed);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, function(err, confirmation) {
    if (err) return console.error(err);
    done(null, confirmation)
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch }).sort({n ame: 'asc'} ).limit(2).select('name favoriteFoods').exec((err,d ata) => {
    if (err) return console.error(err);
    done(null, data);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
