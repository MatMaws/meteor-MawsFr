import { Meteor } from 'meteor/meteor';
import { Crypto } from '../crytocurrency.js';

Meteor.publish('crypto', () => {
  return Crypto.find({});
});

Meteor.publish('crypto.code', ({ code }) => {
  return Crypto.find({ code });
});
