import './list_crypto.html';
import './list_crypto.css';

import { Crypto } from '../../../api/crytocurrency/crytocurrency.js';
import { Wallets } from '../../../api/wallets/wallets.js';

Template.list_crypto.onCreated(function() {
  this.autorun(() => {
    this.subscribe('crypto');
    this.subscribe('Wallets');
  });
});

Template.list_crypto.helpers({
  cryptos() {
    return Crypto.find();
  },
});

Template.crypto.helpers({
  inWallet() {
    return Wallets.findOne({
      $and: [{ code: this.code }, { owner: Meteor.userId() }],
    }).nbCoins;
  },
});
