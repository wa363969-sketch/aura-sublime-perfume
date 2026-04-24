import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import Stripe "mo:caffeineai-stripe/stripe";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import ProductTypes "types/products";
import CartTypes "types/cart";
import OrderTypes "types/orders";
import ReviewTypes "types/reviews";
import UserTypes "types/users";
import Common "types/common";
import ProductsMixin "mixins/products-api";
import CartMixin "mixins/cart-api";
import OrdersMixin "mixins/orders-api";
import ReviewsMixin "mixins/reviews-api";
import UsersMixin "mixins/users-api";
import AdminMixin "mixins/admin-api";
import ProductLib "lib/products";

actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Object storage infrastructure
  include MixinObjectStorage();

  // Product state
  let products = Map.empty<Common.ProductId, ProductTypes.Product>();
  var nextProductId : Nat = 1;

  // Cart state
  let carts = Map.empty<Principal, CartTypes.Cart>();

  // Order state
  let orders = Map.empty<Common.OrderId, OrderTypes.Order>();
  var nextOrderId : Nat = 1;

  // Review state
  let reviews = Map.empty<Common.ReviewId, ReviewTypes.Review>();
  var nextReviewId : Nat = 1;

  // User profile state
  let userProfiles = Map.empty<Principal, UserTypes.UserProfile>();

  // Stripe config state
  var stripeConfig : ?Stripe.StripeConfiguration = null;

  // Seed sample perfume products (only if no products exist yet)
  if (products.isEmpty()) {
    let emptyBlob : Blob = "";
    let seedProducts : [ProductTypes.ProductInput] = [
      {
        name = "Lumière Éternelle";
        description = "A captivating floral symphony with notes of Bulgarian rose, jasmine, and white peony, anchored by warm sandalwood and vanilla musk. An eternal classic for the modern woman.";
        price = 18500;
        fragranceType = #floral;
        stock = 50;
        image = emptyBlob;
      },
      {
        name = "Bois Mystérieux";
        description = "A sensuous woody fragrance opening with bergamot and cardamom, heart of cedar and vetiver, base of dark amber and oud. Evokes the mystery of ancient forests at dusk.";
        price = 22000;
        fragranceType = #woody;
        stock = 35;
        image = emptyBlob;
      },
      {
        name = "Soir d'Orient";
        description = "An opulent oriental blend of saffron, rose absolute, and smoky incense resting on a base of benzoin, musk, and aged patchouli. Intoxicating and unforgettable.";
        price = 24500;
        fragranceType = #oriental;
        stock = 30;
        image = emptyBlob;
      },
      {
        name = "Brise Marine";
        description = "An invigorating aquatic freshness: sea spray, white tea, and cool green mint meld with light driftwood and clean musks. The essence of coastal freedom.";
        price = 14500;
        fragranceType = #fresh;
        stock = 60;
        image = emptyBlob;
      },
      {
        name = "Soleil Citronné";
        description = "A radiant burst of Sicilian lemon, pink grapefruit, and neroli, softened by a heart of magnolia and a base of warm cedarwood. Pure Mediterranean sunshine in a bottle.";
        price = 12800;
        fragranceType = #citrus;
        stock = 45;
        image = emptyBlob;
      },
      {
        name = "Velours Gourmand";
        description = "A delectable gourmand experience: caramel praline and tonka bean intertwined with creamy vanilla, dark cocoa, and a whisper of smoked sandalwood. Irresistibly indulgent.";
        price = 16900;
        fragranceType = #gourmand;
        stock = 40;
        image = emptyBlob;
      },
      {
        name = "Chypre Élégant";
        description = "A timeless chypre accord of oakmoss, labdanum, and bergamot interlaced with iris and rose de mai, grounded by vetiver and white musk. Sophistication personified.";
        price = 19800;
        fragranceType = #chypre;
        stock = 25;
        image = emptyBlob;
      },
      {
        name = "Fougère Royale";
        description = "A noble fougère blending lavender, rosemary, and geranium with fresh coumarin and oakmoss, finishing with warm tonka and amber woods. The scent of refined distinction.";
        price = 17500;
        fragranceType = #fougere;
        stock = 20;
        image = emptyBlob;
      },
    ];
    for (input in seedProducts.values()) {
      ignore ProductLib.createProduct(products, nextProductId, input);
      nextProductId += 1;
    };
  };

  // Mixins
  include ProductsMixin(accessControlState, products);
  include CartMixin(accessControlState, carts);
  include OrdersMixin(accessControlState, orders, products, carts);
  include ReviewsMixin(accessControlState, reviews, products);
  include UsersMixin(accessControlState, userProfiles);
  include AdminMixin(accessControlState, orders, products, reviews, userProfiles, carts);

  // Stripe — must be declared directly in actor
  func getStripeConfiguration() : Stripe.StripeConfiguration {
    switch (stripeConfig) {
      case (null) { Runtime.trap("Stripe needs to be first configured") };
      case (?value) { value };
    };
  };

  public query func isStripeConfigured() : async Bool {
    stripeConfig != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    stripeConfig := ?config;
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConfiguration(), sessionId, transform);
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    await Stripe.createCheckoutSession(getStripeConfiguration(), caller, items, successUrl, cancelUrl, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };
};
