import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import ReviewTypes "../types/reviews";
import ProductTypes "../types/products";
import Common "../types/common";
import ReviewLib "../lib/reviews";
import ProductLib "../lib/products";

mixin (
  accessControlState : AccessControl.AccessControlState,
  reviews : Map.Map<Common.ReviewId, ReviewTypes.Review>,
  products : Map.Map<Common.ProductId, ProductTypes.Product>,
) {
  public shared ({ caller }) func addReview(productId : Common.ProductId, rating : Nat, comment : Text) : async ReviewTypes.Review {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    if (rating < 1 or rating > 5) {
      Runtime.trap("Rating must be between 1 and 5");
    };
    if (ReviewLib.hasUserReviewed(reviews, caller, productId)) {
      Runtime.trap("You have already reviewed this product");
    };
    switch (ProductLib.getProduct(products, productId)) {
      case null { Runtime.trap("Product not found") };
      case (?_) {};
    };
    let reviewId = reviews.size() + 1;
    let review = ReviewLib.addReview(reviews, reviewId, caller, productId, rating, comment);
    // Update product rating
    ProductLib.updateRating(products, productId, rating);
    review;
  };

  public query func getReviewsByProduct(productId : Common.ProductId) : async [ReviewTypes.Review] {
    ReviewLib.getReviewsByProduct(reviews, productId);
  };
};
