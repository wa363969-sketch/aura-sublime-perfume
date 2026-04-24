import Map "mo:core/Map";
import CartTypes "../types/cart";

module {
  public func getCart(
    carts : Map.Map<Principal, CartTypes.Cart>,
    userId : Principal,
  ) : CartTypes.Cart {
    switch (carts.get(userId)) {
      case (?cart) { cart };
      case null {
        let empty : CartTypes.Cart = { userId; items = [] };
        empty;
      };
    };
  };

  public func addItem(
    carts : Map.Map<Principal, CartTypes.Cart>,
    userId : Principal,
    productId : Nat,
    quantity : Nat,
  ) {
    let cart = getCart(carts, userId);
    // Check if item already exists — if so, increment quantity
    let existing = cart.items.find(func(item : CartTypes.CartItem) : Bool { item.productId == productId });
    let newItems = switch (existing) {
      case (?_item) {
        cart.items.map(func(i : CartTypes.CartItem) : CartTypes.CartItem {
          if (i.productId == productId) { { i with quantity = i.quantity + quantity } }
          else { i };
        });
      };
      case null {
        let newItem : CartTypes.CartItem = { productId; quantity };
        cart.items.concat([newItem]);
      };
    };
    carts.add(userId, { cart with items = newItems });
  };

  public func removeItem(
    carts : Map.Map<Principal, CartTypes.Cart>,
    userId : Principal,
    productId : Nat,
  ) {
    let cart = getCart(carts, userId);
    let newItems = cart.items.filter(func(item : CartTypes.CartItem) : Bool { item.productId != productId });
    carts.add(userId, { cart with items = newItems });
  };

  public func updateQuantity(
    carts : Map.Map<Principal, CartTypes.Cart>,
    userId : Principal,
    productId : Nat,
    quantity : Nat,
  ) {
    let cart = getCart(carts, userId);
    if (quantity == 0) {
      removeItem(carts, userId, productId);
    } else {
      let newItems = cart.items.map(func(item : CartTypes.CartItem) : CartTypes.CartItem {
        if (item.productId == productId) { { item with quantity } }
        else { item };
      });
      carts.add(userId, { cart with items = newItems });
    };
  };

  public func clearCart(
    carts : Map.Map<Principal, CartTypes.Cart>,
    userId : Principal,
  ) {
    carts.add(userId, { userId; items = [] });
  };
};
