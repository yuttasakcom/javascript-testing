let roles;
let user;

exports.setUser = inUser => {
  user = inUser;
};

exports.setRoles = role => {
  roles = role;
  user.roles = role;
};

exports.isAuthorized = neededRole => {
  if (user) {
    return user.isAuthorized(neededRole);
  }
};

exports.isAuthorizedAsysnc = (neededRole, cb) =>
  setTimeout(() => cb(roles.indexOf(neededRole) >= 0), 0);

exports.isAuthorizedPromise = neededRole =>
  new Promise((resolve, reject) =>
    setTimeout(() => resolve(roles.indexOf(neededRole) >= 0), 0)
  );

exports.getIndex = (req, res) => {
  try {
    if (req.user.isAuthorized("admin")) {
      return res.render("index");
    }
    res.render("noAuth");
  } catch (e) {
    res.render("error");
  }
};
