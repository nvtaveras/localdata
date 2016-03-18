'use strict';

import fs from 'fs';
import path from 'path';
import Database from './db';

class LocalData {
  constructor() {
    this._dir = '.LOCALDATA'; // Prefix use for directory
    // Initialize hidden directory that will hold the data
    try {
      fs.statSync(this._getPath());
    } catch (error) {
      // Folder doesn't exist, create it
      fs.mkdirSync(this._getPath());
    }
  }
  db(name) {
    const db = new Database(name, this._getPath());
    return db;
  }
  _getPath() {
    return path.resolve(__dirname, this._dir);
  }
}

export default LocalData;
