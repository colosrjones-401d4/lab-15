'use strict';

const uuid = require('uuid/v4');

class Model {

  constructor() {
    //Just add schema.. not sure..Let see what happens
    this.schema = schema;
    this.database = [];
  }
 //It should work..this is for swagger to find this record..
    /**
   * @param  {} entry
   * @param  {} {letvalid=true;letrecord={};Object.keys(this.schema
   * @param  {} .forEach(field=>{if(this.schema[field].required
   * @param  {} {if(entry[field]
   * @param  {} {record[field]=entry[field];}else{valid=false;}}else{record[field]=entry[field];}}
   * @param  {}} ;returnvalid?record
   * @returns undefined
   */

  get(id) {
    let response = id ? this.database.filter((record) => record.id === id) : this.database;
    return Promise.resolve(response);
  }

  create(entry) {
    entry.id = uuid();
    let record = this.sanitize(entry);
    if (record.id) { this.database.push(record); }
    return Promise.resolve(record);
  }

  update(id, entry) {
    let record = this.sanitize(entry);
    if (record.id) { this.database = this.database.map((item) => (item.id === id) ? record : item); }
    return Promise.resolve(record);
  }

  delete(id) {
    this.database = this.database.filter((record) => record.id !== id);
    return Promise.resolve();
  }

  sanitize(entry) {

    let valid = true;
    let record = {};
    let schema = this.schema();

    Object.keys(schema).forEach(field => {
      if (schema[field].required) {
        if (entry[field]) {
          record[field] = entry[field];
        } else {
          valid = false;
        }
      }
      else {
        record[field] = entry[field];
      }
    });

    return valid ? record : undefined;
  }

}

module.exports = Model;
