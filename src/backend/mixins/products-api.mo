import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import ProductTypes "../types/products";
import Common "../types/common";
import ProductLib "../lib/products";

mixin (
  accessControlState : AccessControl.AccessControlState,
  products : Map.Map<Common.ProductId, ProductTypes.Product>,
) {
  public query func getProducts() : async [ProductTypes.Product] {
    ProductLib.listProducts(products);
  };

  public query func getProduct(id : Common.ProductId) : async ?ProductTypes.Product {
    ProductLib.getProduct(products, id);
  };

  public shared ({ caller }) func createProduct(input : ProductTypes.ProductInput) : async ProductTypes.Product {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can create products");
    };
    let productId = products.size() + 1;
    ProductLib.createProduct(products, productId, input);
  };

  public shared ({ caller }) func updateProduct(id : Common.ProductId, input : ProductTypes.ProductInput) : async ?ProductTypes.Product {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    ProductLib.updateProduct(products, id, input);
  };

  public shared ({ caller }) func deleteProduct(id : Common.ProductId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    ProductLib.deleteProduct(products, id);
  };
};
