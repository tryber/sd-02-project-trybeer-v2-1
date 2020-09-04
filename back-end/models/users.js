const { users } = require("../mysql/models");

const find = async ({ key, value }) => {
  console.log(key, value);
  if (key === "id") {
    return users.findByPk(value);
  }

  return users.findAll({ where: { [key]: value } });
};

// const register = async ({ name, email, password, role }) =>
//   connection().then((db) =>
//     db
//       .getTable("users")
//       .insert(["name", "email", "password", "role"])
//       .values(name, email, password, role)
//       .execute()
//   );

// const update = async ({ name, email }) =>
//   connection().then((db) =>
//     db
//       .getTable("users")
//       .update()
//       .set("name", name)
//       .where("email = :email")
//       .bind("email", email)
//       .execute()
//   );

module.exports = {
  find,
  // register,
  // update,
};
