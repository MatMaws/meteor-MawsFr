import './navbar.html';
import './navbar.css';

import { Template } from 'meteor/templating';

// TODO: Ajouter les helpers
Template.navbar.helpers({
  dollarWallet() {
    return 9876;
  },
  currency: 'dollars',
});
