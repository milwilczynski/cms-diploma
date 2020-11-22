import applicationException from "../exceptions/applicationException";
import models from "../models/index";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

function create(context) {
  async function generateHash(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async function getAllUsers() {
    let users = await models.user.findAll({
      include: [
        {
          nested: false,
          model: models.user_passwords,
          attributes: ["password"],
        },
        {
          model: models.roles,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });
    users.forEach((element) => {
      //
    });
    return users;
  }

  async function createNew(userData) {
    userData.password = await generateHash(userData.password);
    const user = await User.createNew(userData);
    return user;
  }

  async function authenticate(email, password) {
    const user = await User.getByEmailOrLogin(email);
    if (!user) {
      throw applicationException.new(
        applicationException.UNAUTHORIZED,
        "User with that email does not exist"
      );
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new applicationException.new(
        applicationException.UNAUTHORIZED,
        "Incorrect Password"
      );
    }

    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
    return token;
  }

  return {
    createNew: createNew,
    authenticate: authenticate,
    getAllUsers: getAllUsers,
  };
}

export default {
  create: create,
};
