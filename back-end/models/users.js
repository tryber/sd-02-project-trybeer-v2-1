const { users } = require("../mysql/models");

const find = async ({ key, value }) => {
  if (key === "id") {
    return users.findByPk(value);
  }

  return users.findAll({ where: { [key]: value } });
};

const register = async (data) => users.create(data);

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
  register,
  // update,
};
