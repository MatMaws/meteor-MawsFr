import './description.html';

import { Meteor } from 'meteor/meteor';
import { Wallets } from '../../../../api/wallets/wallets';

Template.description.helpers({
  wallet() {
    return Wallets.findOne({
      $and: [{ owner: Meteor.userId() }, { code: FlowRouter.getParam('code') }],
    });
  }
});
