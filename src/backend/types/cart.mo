import Common "common";

module {
  public type CartItem = {
    productId : Common.ProductId;
    quantity : Nat;
  };

  public type Cart = {
    userId : Principal;
    items : [CartItem];
  };
};
