import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Crypto } from '../../../api/crytocurrency/crytocurrency.js';

import './crypto_details.js';

//methods
import '../../../api/sales/methods.js';

Template.registerHelper('total', function(argument) {
  //ici this se réfère à l'objet qui a appelé cette fonction
  return this.nbCoins * this.dollarValue;
});

Template.registerHelper('infos', function(argument) {
  return Crypto.findOne({ code: FlowRouter.getParam('code') });
});
