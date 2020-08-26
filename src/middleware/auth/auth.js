


const checkAuth = (req, res) => {
  try {
    const accessToken = req.get("Authorization");
    const jwtToken = accessToken.split(" ")[1];
    return jwtToken;
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};

export { checkAuth };