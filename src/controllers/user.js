const User = require("../mongoose/schemas/user");
const { hashPassword } = require("../utils/helpers");
const store = async (request, response) => {
  const { body } = request;
  try {
    body.password = hashPassword(body.password);
    const user = User(body);
    const savedUser = await user.save();
    return response.status(201).json(savedUser);
  } catch (err) {
    console.log(err);
    return response
      .status(500)
      .json({ message: "Oops something wrong happened" });
  }
};

module.exports = {
  store,
};
