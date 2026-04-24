import Map "mo:core/Map";
import Time "mo:core/Time";
import Int "mo:core/Int";
import ReviewTypes "../types/reviews";
import Common "../types/common";

module {
  public func addReview(
    reviews : Map.Map<Common.ReviewId, ReviewTypes.Review>,
    nextId : Nat,
    userId : Principal,
    productId : Common.ProductId,
    rating : Nat,
    comment : Text,
  ) : ReviewTypes.Review {
    let review : ReviewTypes.Review = {
      id = nextId;
      userId;
      productId;
      rating;
      comment;
      createdAt = Time.now();
    };
    reviews.add(nextId, review);
    review;
  };

  public func getReviewsByProduct(
    reviews : Map.Map<Common.ReviewId, ReviewTypes.Review>,
    productId : Common.ProductId,
  ) : [ReviewTypes.Review] {
    reviews.values().filter(func(r : ReviewTypes.Review) : Bool { r.productId == productId }).toArray();
  };

  public func hasUserReviewed(
    reviews : Map.Map<Common.ReviewId, ReviewTypes.Review>,
    userId : Principal,
    productId : Common.ProductId,
  ) : Bool {
    reviews.values().any(func(r : ReviewTypes.Review) : Bool { r.userId == userId and r.productId == productId });
  };

  public func calculateAverageRating(
    reviews : Map.Map<Common.ReviewId, ReviewTypes.Review>,
    productId : Common.ProductId,
  ) : Float {
    let productReviews = reviews.values().filter(func(r : ReviewTypes.Review) : Bool { r.productId == productId });
    var total : Nat = 0;
    var count : Nat = 0;
    productReviews.forEach(func(r : ReviewTypes.Review) {
      total += r.rating;
      count += 1;
    });
    if (count == 0) { 0.0 }
    else { total.toFloat() / count.toFloat() };
  };
};
