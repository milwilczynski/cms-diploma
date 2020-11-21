import applicationException from "../exceptions/applicationException";
import User from "../models/User";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

function create(context) {
  async function generateHash(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
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
  };
}

export default {
  create: create,
};
