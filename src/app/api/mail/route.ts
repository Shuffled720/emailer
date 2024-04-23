import nodemailer from "nodemailer"

export async function POST(request: Request) {
  const body = await request.json()
  console.log(body)
  const { name, email, message } = body
  try {
    // console.log("fdsofhsdifhi")
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.NODEMAILER_USER, // host email address
        pass: process.env.NODEMAILER_APP_PASSWORD, // host app password(use app password, if don't have , got to google accout> enable two step verification>  go to app password and generate password)
      },
    })
    let info = await transporter.sendMail({
      from: '"Kaal Sheduler" <shuffled720@gmail.com>', // sender address
      to: `${email},kaalschedular@gmail.com`, // list of receivers email Id's
      subject: `Thanks for Contacting us,${name}`, // Subject line
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // plain text body
      html: `<b><h1>Hello ${name}</h1></b><h3>Your Query:</h3><p>${message}</p><p>reached to us</p><p>Thanks For Contacting Us</p><p>Regards Team KaalScheduler</p>`, // html body
    })
    console.log("Message sent: %s", info.messageId)

    // console.log(req.body)
    return new Response("OK", { status: 200 })
    // return res.status(200).json({ message: "Your message has been sent!" })
  } catch (error) {
    console.error("Error:", error)
    return new Response("Internal Server Error", { status: 500 })
    // return res.status(500).json({ error: "Internal Server Error" })
  }
  return new Response("OK", { status: 200 })
}
export async function GET(request: Request) {
  return new Response("OK", { status: 200 })
}
