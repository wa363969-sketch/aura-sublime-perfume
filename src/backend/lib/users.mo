import Map "mo:core/Map";
import Time "mo:core/Time";
import UserTypes "../types/users";

module {
  public func getOrCreateProfile(
    profiles : Map.Map<Principal, UserTypes.UserProfile>,
    userId : Principal,
    name : Text,
    email : Text,
  ) : UserTypes.UserProfile {
    switch (profiles.get(userId)) {
      case (?existing) { existing };
      case null {
        let profile : UserTypes.UserProfile = {
          name;
          email;
          joinDate = Time.now();
        };
        profiles.add(userId, profile);
        profile;
      };
    };
  };

  public func getProfile(
    profiles : Map.Map<Principal, UserTypes.UserProfile>,
    userId : Principal,
  ) : ?UserTypes.UserProfile {
    profiles.get(userId);
  };

  public func updateProfile(
    profiles : Map.Map<Principal, UserTypes.UserProfile>,
    userId : Principal,
    name : Text,
    email : Text,
  ) : ?UserTypes.UserProfile {
    switch (profiles.get(userId)) {
      case null { null };
      case (?existing) {
        let updated : UserTypes.UserProfile = {
          existing with
          name;
          email;
        };
        profiles.add(userId, updated);
        ?updated;
      };
    };
  };
};
