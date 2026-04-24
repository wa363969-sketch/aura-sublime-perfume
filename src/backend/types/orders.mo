import Common "common";

module {
  public type OrderStatus = {
    #pending;
    #confirmed;
    #processing;
    #shipped;
    #delivered;
    #cancelled;
  };

  public type OrderItem = {
    productId : Common.ProductId;
    productName : Text;
    quantity : Nat;
    priceAtPurchase : Nat; // price in cents at time of order
  };

  public type Order = {
    id : Common.OrderId;
    userId : Principal;
    items : [OrderItem];
    totalAmount : Nat; // total in cents
    status : OrderStatus;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };
};
