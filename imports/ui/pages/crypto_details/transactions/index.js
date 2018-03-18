import './transactions.html';
import { Sales } from '../../../../api/sales/sales';

Template.transactions.helpers({
  transactions() {
    return Sales.find({
      $and: [{ code: FlowRouter.getParam('code') }, { buyerId: { $ne: '' } }],
    });
  },
});
