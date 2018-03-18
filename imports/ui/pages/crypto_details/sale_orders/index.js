import './sale_orders.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Sales } from '../../../../api/sales/sales.js';

// TODO : Faire la partie droite "Acheter"

Template.saleOrders.helpers({
    saleOrders() {
      return Sales.find({
        $and: [
          {
            code: FlowRouter.getParam('code'),
          },
          {
            buyerId: '',
          },
          {
            owner: {
              $ne: Meteor.userId(),
            },
          },
        ],
      });
    },
  });

  Template.saleOrders.events({
    'click .buyButton': function(event) {
      Meteor.call('Sales.buy', this, (err, res) => {
        if (err) {
          Materialize.toast(err.reason, 4000, 'rounded');
        } else {
          Materialize.toast(
            'Achat de ' + this.nbCoins + ' ' + this.code + ' validé !',
            4000,
            'rounded'
          );
        }
      });
    },
  });
  

