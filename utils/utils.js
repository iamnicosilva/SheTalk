const nodemailer = require("nodemailer");
const geolib = require("geolib");
const fs = require("fs");
const path = require("path");

// Función para enviar correos electrónicos de notificación
const sendNotificationEmail = async (to, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    html: message,
  };

  await transporter.sendMail(mailOptions);
};

// Función para capturar la ubicación del usuario y almacenarla en la base de datos
const saveLocation = (lat, lon, userId) => {
  // Aquí iría el código para almacenar la ubicación en la base de datos
  // Se podría utilizar una librería para bases de datos como Mongoose o Sequelize
};

// Función para cargar la captura de pantalla y almacenarla en la base de datos
const saveScreenshot = (file, userId) => {
  // Aquí iría el código para almacenar la captura de pantalla en la base de datos
  // Se podría utilizar una librería para bases de datos como Mongoose o Sequelize
  const fileName = `screenshot_${Date.now()}.png`;
  const filePath = path.join(__dirname, "../screenshots", fileName);
  const fileStream = fs.createWriteStream(filePath);
  fileStream.write(file);
};

// Función para enviar la información del usuario por correo electrónico a su círculo de confianza
const shareUserInfo = async (to, subject, message, attachmentPath) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    html: message,
    attachments: [
      {
        filename: "user_info.txt",
        path: attachmentPath,
      },
    ],
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendNotificationEmail,
  saveLocation,
  saveScreenshot,
  shareUserInfo,
};
