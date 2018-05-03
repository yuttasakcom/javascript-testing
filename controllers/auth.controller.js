exports.isAuthorized = (roles, neededRole) => {
  return roles.indexOf(neededRole) >= 0;
};
