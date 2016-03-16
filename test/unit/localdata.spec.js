'use strict';

import LocalData from '../../src/localdata.js';
import chai from 'chai';

const expect = chai.expect;

describe('LocalData ( unit )', () => {
  describe('when instantiated', () => {
    const localdata = new LocalData();
    it('should return an Object', () => {
      expect(localdata).to.be.an('object');
    });
  });

  describe('#db', () => {
    const localdata = new LocalData();
    it('should be a function', () => {
      expect(localdata.db).to.be.a('function');
    });
  });

  describe('#collections', () => {
    const localdata = new LocalData();
    it('should be a function', () => {
      expect(localdata.collections).to.be.a('function');
    });
  });
});
