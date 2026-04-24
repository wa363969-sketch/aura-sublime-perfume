import Map "mo:core/Map";
import Int "mo:core/Int";
import ProductTypes "../types/products";
import ReviewTypes "../types/reviews";
import Common "../types/common";

module {
  public func createProduct(
    products : Map.Map<Common.ProductId, ProductTypes.Product>,
    nextId : Nat,
    input : ProductTypes.ProductInput,
  ) : ProductTypes.Product {
    let product : ProductTypes.Product = {
      id = nextId;
      name = input.name;
      description = input.description;
      price = input.price;
      fragranceType = input.fragranceType;
      stock = input.stock;
      image = input.image;
      rating = 0.0;
      reviewCount = 0;
    };
    products.add(nextId, product);
    product;
  };

  public func getProduct(
    products : Map.Map<Common.ProductId, ProductTypes.Product>,
    id : Common.ProductId,
  ) : ?ProductTypes.Product {
    products.get(id);
  };

  public func listProducts(
    products : Map.Map<Common.ProductId, ProductTypes.Product>,
  ) : [ProductTypes.Product] {
    products.values().toArray();
  };

  public func updateProduct(
    products : Map.Map<Common.ProductId, ProductTypes.Product>,
    id : Common.ProductId,
    input : ProductTypes.ProductInput,
  ) : ?ProductTypes.Product {
    switch (products.get(id)) {
      case null { null };
      case (?existing) {
        let updated : ProductTypes.Product = {
          existing with
          name = input.name;
          description = input.description;
          price = input.price;
          fragranceType = input.fragranceType;
          stock = input.stock;
          image = input.image;
        };
        products.add(id, updated);
        ?updated;
      };
    };
  };

  public func deleteProduct(
    products : Map.Map<Common.ProductId, ProductTypes.Product>,
    id : Common.ProductId,
  ) : Bool {
    switch (products.get(id)) {
      case null { false };
      case (?_) {
        products.remove(id);
        true;
      };
    };
  };

  public func updateRating(
    products : Map.Map<Common.ProductId, ProductTypes.Product>,
    productId : Common.ProductId,
    newRating : Nat,
  ) {
    switch (products.get(productId)) {
      case null {};
      case (?existing) {
        let totalRatingPoints = existing.rating * existing.reviewCount.toFloat() + newRating.toFloat();
        let newReviewCount = existing.reviewCount + 1;
        let newAvg = totalRatingPoints / newReviewCount.toFloat();
        let updated : ProductTypes.Product = {
          existing with
          rating = newAvg;
          reviewCount = newReviewCount;
        };
        products.add(productId, updated);
      };
    };
  };

  public func decrementStock(
    products : Map.Map<Common.ProductId, ProductTypes.Product>,
    productId : Common.ProductId,
    quantity : Nat,
  ) : Bool {
    switch (products.get(productId)) {
      case null { false };
      case (?existing) {
        if (existing.stock < quantity) {
          false;
        } else {
          let updated : ProductTypes.Product = {
            existing with
            stock = existing.stock - quantity;
          };
          products.add(productId, updated);
          true;
        };
      };
    };
  };

  public func recalculateRating(
    products : Map.Map<Common.ProductId, ProductTypes.Product>,
    reviews : Map.Map<Common.ReviewId, ReviewTypes.Review>,
    productId : Common.ProductId,
  ) {
    switch (products.get(productId)) {
      case null {};
      case (?existing) {
        var total : Float = 0.0;
        var count : Nat = 0;
        reviews.values().forEach(func(r : ReviewTypes.Review) {
          if (r.productId == productId) {
            total += r.rating.toFloat();
            count += 1;
          };
        });
        let newAvg : Float = if (count == 0) { 0.0 } else { total / count.toFloat() };
        let updated : ProductTypes.Product = {
          existing with
          rating = newAvg;
          reviewCount = count;
        };
        products.add(productId, updated);
      };
    };
  };

  public func getLowStockProducts(
    products : Map.Map<Common.ProductId, ProductTypes.Product>,
    threshold : Nat,
  ) : [ProductTypes.Product] {
    products.values().filter(func(p) { p.stock <= threshold }).toArray();
  };
};
