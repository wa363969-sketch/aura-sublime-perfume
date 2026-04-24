import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CartTypes "../types/cart";
import CartLib "../lib/cart";

mixin (
  accessControlState : AccessControl.AccessControlState,
  carts : Map.Map<Principal, CartTypes.Cart>,
) {
  public query ({ caller }) func getCart() : async CartTypes.Cart {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    CartLib.getCart(carts, caller);
  };

  public shared ({ caller }) func addToCart(productId : Nat, quantity : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    CartLib.addItem(carts, caller, productId, quantity);
  };

  public shared ({ caller }) func removeFromCart(productId : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    CartLib.removeItem(carts, caller, productId);
  };

  public shared ({ caller }) func updateCartQuantity(productId : Nat, quantity : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    CartLib.updateQuantity(carts, caller, productId, quantity);
  };

  public shared ({ caller }) func clearCart() : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    CartLib.clearCart(carts, caller);
  };
};
