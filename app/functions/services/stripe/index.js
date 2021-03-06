const stripeConstructor = require('stripe');
const Schema = require('../../utilities/schema');
const CancelSubscription = require('./cancel-subscription');
const CreateCustomer = require('./create-customer');
const RemovePaymentMethod = require('./remove-payment-method');
const SavePaymentMethod = require('./save-payment-method');
const Subscribe = require('./subscribe');
const ValidateWebhook = require('./validate-webhook');

module.exports = function Stripe(context) {
  const environment = context.environment;
  const schema = Schema(context);
  const stripe = stripeConstructor(context.environment.STRIPE.SK);

  return {
    stripe,
    cancelSubscription: CancelSubscription({ schema, stripe }),
    createCustomer: CreateCustomer({ stripe }),
    removePaymentMethod: RemovePaymentMethod({ schema }),
    savePaymentMethod: SavePaymentMethod({ schema }),
    subscribe: Subscribe({ stripe }),
    validateWebhook: ValidateWebhook({ environment, stripe }),
  };
};
