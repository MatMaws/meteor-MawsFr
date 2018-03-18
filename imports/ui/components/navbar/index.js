import './navbar.html';
import './navbar.css';

import { Wallets } from '../../../api/wallets/wallets.js';
import { Sales } from '../../../api/sales/sales.js';

Template.navbar.onCreated(function() {
    this.autorun(() => { 
        this.subscribe('Wallets');
        this.subscribe('Sales.owner');
    });
})

Template.navbar.helpers({
    dollarWallet() {
        return Wallets.findOne({$and: [{owner: Meteor.userId()}, {code: 'usdt'}]}).nbCoins | 0;
    },
    salesCount() {
        return Sales.find({owner: Meteor.userId(), buyerId: ""}).count();
    }
});