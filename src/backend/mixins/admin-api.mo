import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import OrderTypes "../types/orders";
import ProductTypes "../types/products";
import ReviewTypes "../types/reviews";
import UserTypes "../types/users";
import CartTypes "../types/cart";
import Common "../types/common";
import OrderLib "../lib/orders";
import ProductLib "../lib/products";

mixin (
  accessControlState : AccessControl.AccessControlState,
  orders : Map.Map<Common.OrderId, OrderTypes.Order>,
  products : Map.Map<Common.ProductId, ProductTypes.Product>,
  reviews : Map.Map<Common.ReviewId, ReviewTypes.Review>,
  userProfiles : Map.Map<Principal, UserTypes.UserProfile>,
  carts : Map.Map<Principal, CartTypes.Cart>,
) {
  public type DashboardStats = {
    totalOrders : Nat;
    totalRevenue : Nat;
    lowStockAlerts : [ProductTypes.Product];
    totalProducts : Nat;
  };

  public type UserEntry = {
    principalId : Text;
    profile : UserTypes.UserProfile;
  };

  public type CartEntry = {
    principalId : Text;
    cart : CartTypes.Cart;
  };

  public query ({ caller }) func isAdmin() : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };

  public shared ({ caller }) func setAdminRole(user : Principal) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can assign roles");
    };
    AccessControl.assignRole(accessControlState, caller, user, #admin);
  };

  public shared ({ caller }) func removeAdminRole(user : Principal) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can remove roles");
    };
    AccessControl.assignRole(accessControlState, caller, user, #user);
  };

  public query ({ caller }) func getDashboardStats() : async DashboardStats {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view dashboard stats");
    };
    let allOrders = OrderLib.getAllOrders(orders);
    let allProducts = ProductLib.listProducts(products);
    let lowStock = ProductLib.getLowStockProducts(products, 5);
    let revenue = OrderLib.getTotalRevenue(orders);
    {
      totalOrders = allOrders.size();
      totalRevenue = revenue;
      lowStockAlerts = lowStock;
      totalProducts = allProducts.size();
    };
  };

  public query ({ caller }) func getAllUsers() : async [UserEntry] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view all users");
    };
    userProfiles.entries().map<(Principal, UserTypes.UserProfile), UserEntry>(
      func((principal, profile)) {
        { principalId = principal.toText(); profile }
      }
    ).toArray();
  };

  public query ({ caller }) func getAllReviews() : async [ReviewTypes.Review] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view all reviews");
    };
    reviews.values().toArray();
  };

  public query ({ caller }) func getAllCarts() : async [CartEntry] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view all carts");
    };
    carts.entries().map<(Principal, CartTypes.Cart), CartEntry>(
      func((principal, cart)) {
        { principalId = principal.toText(); cart }
      }
    ).toArray();
  };

  public shared ({ caller }) func deleteReview(reviewId : Common.ReviewId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete reviews");
    };
    switch (reviews.get(reviewId)) {
      case null { Runtime.trap("Review not found") };
      case (?review) {
        reviews.remove(reviewId);
        // Recalculate the product's rating aggregate from remaining reviews
        ProductLib.recalculateRating(products, reviews, review.productId);
      };
    };
  };

  public shared ({ caller }) func deleteUserProfile(principalText : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete user profiles");
    };
    let target = Principal.fromText(principalText);
    switch (userProfiles.get(target)) {
      case null { Runtime.trap("User profile not found") };
      case (?_) { userProfiles.remove(target) };
    };
  };
};
