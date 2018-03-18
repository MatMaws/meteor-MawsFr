import { Meteor } from 'meteor/meteor';
import { History } from '../history.js';

Meteor.publish('History.code', ({ code }) => {
  return History.find({ code });
});
