import Common "common";

module {
  public type Review = {
    id : Common.ReviewId;
    userId : Principal;
    productId : Common.ProductId;
    rating : Nat; // 1-5
    comment : Text;
    createdAt : Common.Timestamp;
  };
};
