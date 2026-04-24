import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Stripe "mo:caffeineai-stripe/stripe";
import OutCall "mo:caffeineai-http-outcalls/outcall";

// NOTE: Stripe functions are declared directly in main.mo actor per platform requirements.
// This mixin file is kept as a reference but is NOT included in main.mo.
mixin (
  accessControlState : AccessControl.AccessControlState,
  stripeConfig : ?Stripe.StripeConfiguration,
) {
  public query func isStripeConfiguredMixin() : async Bool {
    stripeConfig != null;
  };
};
