import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import UserTypes "../types/users";
import UserLib "../lib/users";

mixin (
  accessControlState : AccessControl.AccessControlState,
  userProfiles : Map.Map<Principal, UserTypes.UserProfile>,
) {
  public query ({ caller }) func getCallerUserProfile() : async ?UserTypes.UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    UserLib.getProfile(userProfiles, caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(name : Text, email : Text) : async UserTypes.UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    UserLib.getOrCreateProfile(userProfiles, caller, name, email);
  };

  public shared ({ caller }) func updateUserProfile(name : Text, email : Text) : async ?UserTypes.UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    UserLib.updateProfile(userProfiles, caller, name, email);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserTypes.UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    UserLib.getProfile(userProfiles, user);
  };
};
