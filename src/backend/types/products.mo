import Storage "mo:caffeineai-object-storage/Storage";
import Common "common";

module {
  public type FragranceType = {
    #floral;
    #woody;
    #oriental;
    #fresh;
    #citrus;
    #gourmand;
    #chypre;
    #fougere;
  };

  public type Product = {
    id : Common.ProductId;
    name : Text;
    description : Text;
    price : Nat; // price in cents
    fragranceType : FragranceType;
    stock : Nat;
    image : Storage.ExternalBlob;
    rating : Float;
    reviewCount : Nat;
  };

  public type ProductInput = {
    name : Text;
    description : Text;
    price : Nat;
    fragranceType : FragranceType;
    stock : Nat;
    image : Storage.ExternalBlob;
  };
};
