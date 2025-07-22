// a quick api route for loggin in user through nextjs api

import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

const jwtKey = process.env.JWT_KEY;

export default async function (req, res) {
  console.log("Hello World worlskdjflskjdf;akjdf;lkj!");
  const { username, password } = req.body;

  console.log(
    "api -> username: ( ",
    username,
    " ), password: ( ",
    password,
    " )"
  );
  // check if in advantage

  // create list of user subs

  if (username === "Admin" && password === "Admin") {
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days
        username,
      },
      jwtKey
    );

    // serialize jwt token for response header
    const serialized = serialize("AdminUser", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    // send serialized jwt token back as cookie
    res.setHeader("Set-Cookie", serialized);
    res.status(200).json({ message: "Success!" });
  } else {
    res.status(401).json({ message: "Invalid credentials!" });
  }
}
