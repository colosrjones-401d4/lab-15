'use strict';

// Hope it will work... let see what happens...
/**
 * @param  {} '../memory-model.js'
 * @param  {{required:true}} ;constschema={_id
 * @param  {{required:true}} name
 * @param  {} };classCategoriesextendsModel{}module.exports=newCategories(schema
 */

const Model = require('../mongo.js');

const schema = require('./categories-schema.js');

class Categories extends Model {
  constructor() { super(schema); }
}

module.exports = Categories;
