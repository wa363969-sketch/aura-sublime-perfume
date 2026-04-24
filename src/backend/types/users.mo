import Common "common";

module {
  public type UserProfile = {
    name : Text;
    email : Text;
    joinDate : Common.Timestamp;
  };
};
