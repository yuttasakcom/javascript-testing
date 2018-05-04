let roles;

exports.setRoles = role => (roles = role);

exports.isAuthorized = neededRole => roles.indexOf(neededRole) >= 0;

exports.isAuthorizedAsysnc = (neededRole, cb) =>
  setTimeout(() => cb(roles.indexOf(neededRole) >= 0), 0);
