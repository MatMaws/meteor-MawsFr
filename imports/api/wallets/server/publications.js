import { Meteor } from 'meteor/meteor';
import { Wallets } from '../wallets.js';

Meteor.publish('Wallets.dollar', () => {
  return Wallets.find({ $and: [{ owner: Meteor.userId() }, { code: 'usdt' }] });
});

Meteor.publish('Wallets', () => {
  return Wallets.find({ owner: Meteor.userId() });
});

Meteor.publish('Wallets.code', ({ code }) => {
  return Wallets.find({ $and: [{ owner: Meteor.userId() }, { code }] });
});
