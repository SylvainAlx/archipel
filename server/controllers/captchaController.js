import axios from "axios";

export const verifyCaptcha = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "Token is required." });
  }

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: process.env.CAPTCHA_SECRET_KEY,
          response: token,
        },
      },
    );

    const { success } = response.data;

    if (success) {
      return res.json({
        success: true,
        message: "CAPTCHA verified successfully!",
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "CAPTCHA verification failed." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      infoType: "500",
      error,
    });
  }
};
