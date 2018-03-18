/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { Sales } from '../sales.js';

Meteor.publish('Sales.owner', () => {
  return Sales.find({ owner: Meteor.userId() });
});

Meteor.publish('Sales.withCode', ({ code }) => {
  return Sales.find({ code });
});

Meteor.publish('Sales.mySales', () => {
  return Sales.find({ owner: Meteor.userId() });
});
