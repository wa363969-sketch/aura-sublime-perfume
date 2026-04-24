import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import OrderTypes "../types/orders";
import CartTypes "../types/cart";
import ProductTypes "../types/products";
import Common "../types/common";
import OrderLib "../lib/orders";
import CartLib "../lib/cart";
import ProductLib "../lib/products";

mixin (
  accessControlState : AccessControl.AccessControlState,
  orders : Map.Map<Common.OrderId, OrderTypes.Order>,
  products : Map.Map<Common.ProductId, ProductTypes.Product>,
  carts : Map.Map<Principal, CartTypes.Cart>,
) {
  public shared ({ caller }) func createOrder() : async OrderTypes.Order {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    let cart = CartLib.getCart(carts, caller);
    if (cart.items.size() == 0) {
      Runtime.trap("Cart is empty");
    };
    // Build order items and calculate total
    var orderItems : [OrderTypes.OrderItem] = [];
    var total : Nat = 0;
    for (cartItem in cart.items.values()) {
      switch (ProductLib.getProduct(products, cartItem.productId)) {
        case null {
          Runtime.trap("Product not found: " # debug_show(cartItem.productId));
        };
        case (?product) {
          if (product.stock < cartItem.quantity) {
            Runtime.trap("Insufficient stock for: " # product.name);
          };
          let orderItem : OrderTypes.OrderItem = {
            productId = cartItem.productId;
            productName = product.name;
            quantity = cartItem.quantity;
            priceAtPurchase = product.price;
          };
          orderItems := orderItems.concat([orderItem]);
          total += product.price * cartItem.quantity;
        };
      };
    };
    // Decrement stock for each item
    for (item in orderItems.values()) {
      ignore ProductLib.decrementStock(products, item.productId, item.quantity);
    };
    // Use map size + 1 as next order ID
    let orderId = orders.size() + 1;
    let order = OrderLib.createOrder(orders, orderId, caller, orderItems, total);
    // Clear the cart
    CartLib.clearCart(carts, caller);
    order;
  };

  public query ({ caller }) func getMyOrders() : async [OrderTypes.Order] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    OrderLib.getOrdersByUser(orders, caller);
  };

  public query ({ caller }) func getOrder(orderId : Common.OrderId) : async ?OrderTypes.Order {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    switch (OrderLib.getOrder(orders, orderId)) {
      case null { null };
      case (?order) {
        // Only owner or admin can view order
        if (order.userId != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Cannot view this order");
        };
        ?order;
      };
    };
  };

  public shared ({ caller }) func updateOrderStatus(orderId : Common.OrderId, status : OrderTypes.OrderStatus) : async ?OrderTypes.Order {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };
    OrderLib.updateOrderStatus(orders, orderId, status);
  };

  public query ({ caller }) func getAllOrders() : async [OrderTypes.Order] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view all orders");
    };
    OrderLib.getAllOrders(orders);
  };
};
