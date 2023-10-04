const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const CLIENT_ID = `${process.env.CLIENT_ID}`;
const CLIENT_SECRET = `${process.env.CLIENT_SECRET}`;
const REFRESH_TOKEN = `${process.env.DRIVE_REFRESH_TOKEN}`;

const uploadImage = async (filename, mimeType) => {
  const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    OAUTH_PLAYGROUND
  );

  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  const drive = google.drive({
    version: "v3",
    auth: oAuth2Client,
  });
  const filePath = path.join(__dirname, `/../public/${filename}`);
  try {
    const response = await drive.files.create({
      requestBody: {
        name: filename,
        mimeType: mimeType,
      },
      media: {
        mimeType: mimeType,
        body: fs.createReadStream(filePath),
      },
    });

    const fileId = response.data.id;
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });
    const result = await drive.files.get({
      fileId: fileId,
      fields: "webViewLink, webContentLink, thumbnailLink",
    });

    return result;
  } catch (err) {
    console.log(err);
  }
};

const deleteFile = async () => {
  try {
    const response = await drive.files.delete({
      fileId: "1XXGKehDtYyM3Tsw-Yf0sjTlP2B5T4VEs",
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

module.exports = uploadImage;
