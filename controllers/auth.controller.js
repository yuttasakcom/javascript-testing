exports.isAuthorized = (roles, neededRole) => roles.indexOf(neededRole) >= 0;

exports.isAuthorizedAsysnc = (roles, neededRole, cb) =>
  setTimeout(() => cb(roles.indexOf(neededRole) >= 0), 0);
