import Users from "../Models/userModel.js";
import { hashString, compareString, createJWT } from "../Utils/index.js";
import { sendVerificationEmail } from "../Utils/sendEmail.js";

export const register = async(req, res, next)   => {

    const {firstName, lastName, email, password, profileUrl} = req.body;

    if(!firstName || !lastName || !email || !password || !profileUrl){
        next('Provide Required Fields');
        return;
    }

    try {

       const userExist = await Users.findOne({ email });

        if (userExist) {
        next("Email Address already exists");
        return;
        }

        const hashedPassword = await hashString(password);

        const user = await Users.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        profileUrl
        });

    sendVerificationEmail(user, res);
        
    } catch (error) {
        next(error);
    }
}


export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    //validation
    if (!email || !password) {
      next("Please Provide User Credentials");
      return;
    }

    // find user by email
    const user = await Users.findOne({ email }).select("+password").populate({
      path: "friends",
      select: "firstName lastName location profileUrl ",
    });

/* It fetches a user document from the Users collection based on the provided email, includes the password field in the result, and also populates the friends field, including only specific fields from the referenced documents (such as firstName, lastName, location, and profileUrl) while excluding the password field from the populated friends.*/

    if (!user) {
      next("Invalid email or password");
      return;
    }

    if (!user?.verified) {
      next(
        "User email is not verified. Check your email account and verify your email"
      );
      return;
    }

    // compare password
    const isMatch = await compareString(password, user?.password);

    if (!isMatch) {
      next("Invalid email or password");
      return;
    }

    delete(user.password);
    
    const token = createJWT(user?._id);

    res.status(201).json({
      success: true,
      message: "Login successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
