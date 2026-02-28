const { contactUsEmail } = require("../mail/templates/contactUsEmail")
const nodemamailSender = require("../utils/mailSender")

exports.contactUsController = async (req, res) => {
  const { email, firstname, lastname, Message } = req.body.data
  try {
    const emailRes = await nodemamailSender(
      email,
      "Your Data send successfully",
      contactUsEmail(email, firstname, lastname, Message)
    )
    console.log("Email Res ", emailRes)
    return res.json({
      success: true,
      message: "Email send successfully",
    })
  } catch (error) {
    console.log("Error", error)
    console.log("Error message :", error.message)
    return res.json({
      success: false,
      message: "Something went wrong...",
    })
  }
}