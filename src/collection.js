'use strict';

class Collection {
  constructor(name, data, dbInstance) {
    this._name = name;
    this._data = data;
    this._db = dbInstance;
  }
  insert(collectionObj) {
    // Insert a new object into the collection
    this._data = [...this._data, collectionObj];
    if (this._db._autoSave) {
      this._db.save(this);
    }
    return collectionObj;
  }
  find(params) {
    // Find all objects that _matches with params
    return this._data.filter((obj) => this._matches(obj, params));
  }
  update(old, updated) {
    let collection = [];
    let updatedCount = 0;
    this._data.forEach(obj => {
      let collectionObj = obj;
      if (this._matches(obj, old)) {
        collectionObj = Object.assign({}, obj, updated);
        updatedCount = updatedCount + 1;
      }
      collection = [...collection, collectionObj];
    });
    this._data = collection;
    if (this._db._autoSave) {
      this._db.save(this);
    }
    return updatedCount;
  }
  delete(params) {
    // Delete all objects that _matches with params
    let collection = [];
    this._data.forEach((obj) => {
      if (!this._matches(obj, params)) {
        collection = [...collection, obj];
      }
    });
    const currLen = this._data.length;
    const newLen = collection.length;
    this._data = collection;
    if (this._db._autoSave) {
      this._db.save(this);
    }
    return currLen - newLen;
  }
  destroy() {
    // Destroy the whole collection
    this._data = [];
    if (this._db._autoSave) {
      this._db.save(this, true);
    }
  }
  _matches(obj, params) {
    // Check if the passed obj has all the key -> value combinations in params
    let match = true;
    Object.keys(params).forEach((k) => {
      if (!obj[k] || (obj[k] !== params[k])) {
        match = false;
      }
    });
    return match;
  }
}

export default Collection;
