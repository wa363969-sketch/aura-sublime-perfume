import Map "mo:core/Map";
import Time "mo:core/Time";
import OrderTypes "../types/orders";
import Common "../types/common";

module {
  public func createOrder(
    orders : Map.Map<Common.OrderId, OrderTypes.Order>,
    nextId : Nat,
    userId : Principal,
    items : [OrderTypes.OrderItem],
    totalAmount : Nat,
  ) : OrderTypes.Order {
    let now = Time.now();
    let order : OrderTypes.Order = {
      id = nextId;
      userId;
      items;
      totalAmount;
      status = #pending;
      createdAt = now;
      updatedAt = now;
    };
    orders.add(nextId, order);
    order;
  };

  public func getOrdersByUser(
    orders : Map.Map<Common.OrderId, OrderTypes.Order>,
    userId : Principal,
  ) : [OrderTypes.Order] {
    orders.values().filter(func(o : OrderTypes.Order) : Bool { o.userId == userId }).toArray();
  };

  public func getOrder(
    orders : Map.Map<Common.OrderId, OrderTypes.Order>,
    orderId : Common.OrderId,
  ) : ?OrderTypes.Order {
    orders.get(orderId);
  };

  public func updateOrderStatus(
    orders : Map.Map<Common.OrderId, OrderTypes.Order>,
    orderId : Common.OrderId,
    status : OrderTypes.OrderStatus,
  ) : ?OrderTypes.Order {
    switch (orders.get(orderId)) {
      case null { null };
      case (?existing) {
        let updated : OrderTypes.Order = {
          existing with
          status;
          updatedAt = Time.now();
        };
        orders.add(orderId, updated);
        ?updated;
      };
    };
  };

  public func getAllOrders(
    orders : Map.Map<Common.OrderId, OrderTypes.Order>,
  ) : [OrderTypes.Order] {
    orders.values().toArray();
  };

  public func getTotalRevenue(
    orders : Map.Map<Common.OrderId, OrderTypes.Order>,
  ) : Nat {
    orders.values().foldLeft(
      0,
      func(acc : Nat, o : OrderTypes.Order) : Nat {
        acc + o.totalAmount;
      },
    );
  };
};
