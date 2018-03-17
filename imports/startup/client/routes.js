import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import to load these templates
import '../../ui/layouts/app.js';
import '../../ui/components/content';
import '../../ui/pages/list_cryptos';
import '../../ui/pages/crypto_details';
import '../../ui/pages/list_sales';

// Page d'accueil
FlowRouter.route('/', {
  name: 'Crypto.showAll',
  action(params, queryParams) {
    console.log('Cryptomonnaies !!');
    BlazeLayout.render('app', { main: 'list_crypto' });
  },
});

// TODO : créer les routes