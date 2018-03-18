import './crypto_details.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Crypto } from '../../../api/crytocurrency/crytocurrency';
import { Wallets } from '../../../api/wallets/wallets';
import { Sales } from '../../../api/sales/sales';

import './description';
import './sell_panel';
import './sale_orders';
import './transactions';

Template.crypto_details.onCreated(function() {
  this.getListId = () => FlowRouter.getParam('code');

  // On redéfini autorun pour rafrachir les données dans la collections à partir du code de la monnaie (appelé à chaque fois que l'on change d'url de monnaie)
  this.autorun(() => {
    this.subscribe('crypto.code', { code: this.getListId() });
    this.subscribe('Wallets.code', { code: this.getListId() });
    this.subscribe('Sales.withCode', { code: this.getListId() });
  });
});
