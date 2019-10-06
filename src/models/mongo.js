'use strict';

/** Class representing a generic mongo model. */
class Model {

  constructor(schema) {
    this.schema = schema;
  }

  get(_id) {
    // Call the appropriate mongoose method to get
    if(_id) {
      // If 1, return it as a plain object
      return this.schema.findOne({_id});
    } else {
      // If 2, return it as an object like this:
      return  this.schema.find({})
        .then((foundItems) => {
          // { count: ##, results: [{}, {}] }
          return { count: foundItems.length, results: foundItems};
        });
    }
  }

  create(record) {

    const newRecord = this.schema(record);
    return newRecord.save();
  }

  update(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record, {new: true});
  }

  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }
}

module.exports = Model;