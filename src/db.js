'use strict';

import fs from 'fs';
import Collection from './collection';

class Database {
  constructor(name = 'localdata', path = '/') {
    this._autoSave = true;
    this._name = name;
    this._path = path;
    this._encoding = 'utf8';
    this._data = null;

    const dbPath = this._getPath();

    try {
      this._data = JSON.parse(fs.readFileSync(dbPath, this._encoding));
    } catch (error) {
      // Initialize file for the first time
      const dataObj = {
        name: this._name,
        created: Date.now(),
        collections: {
        }
      };
      this._data = dataObj;
      this.save();
    }
  }
  collection(name) {
    if (!this._data.collections[name]) {
      this._data.collections[name] = [];
    }
    return new Collection(name, this._data.collections[name], this);
  }
  collectionNames() {
    return Object.keys(this._data.collections);
  }
  save(collection = null, destroy = false) {
    if (collection) {
      this._data.collections[collection._name] = collection._data;
    }
    if (destroy) {
      delete this._data.collections[collection._name];
    }
    let saved;
    try {
      const dbPath = this._getPath();
      fs.writeFileSync(dbPath, JSON.stringify(this._data), this._encoding);
      saved = true;
    } catch (error) {
      saved = false;
    }
    return saved;
  }
  _getPath() {
    return `${this._path}/${this._name}`;
  }
}

export default Database;
