const { URL } = require('url');
const { uuid } = require("uuidv4");
const pokemon = require("pokemon");
const fs = require('fs');
const path = require('path');
const express = require("express");
const app = express();
const PORT = 5578;
const os = require('os');

app.use(express.json());

app.post("/download", (req, res) => {
  const response = {
    error: null,
    msg: null,
  };
  try {
    const urlString = req.body.url;
    if (!urlString) {
      throw new Error("Please provide a valid m3u8 url");
    }
    const nestedDirectoryPath = '~/Downloads/therapy2';
    ensureDirectoryExists(nestedDirectoryPath);

    const filename = `~/Downloads/therapy2/${pokemon.random()}_${uuid()}.mp4`;
    const command = `npx node-hls-downloader -q best -c 5 -o "${filename}" "${urlString}"`; // Command passed as argument

    executeCommand(urlString, command);
    response.msg = "success";
  } catch (error) {
    console.error('Error in downloading hls video', error.message);
    response.error = error.message;
  }
  res.json(response);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});


// helpers

const { spawn } = require('child_process');

function executeCommand(urlString, command) {
  try {
    const myURL = new URL(urlString);
    const domain = myURL.hostname;

    if (!domain) {
      console.log("Invalid URL.");
      return;
    }

    if (!/^https?:\/\//.test(urlString)) {
      console.log(
        "Invalid URL format. Please include 'http://' or 'https://'."
      );
      return;
    }

    // Spawn a new terminal process and execute the command
    const childProcess = spawn('gnome-terminal', ['-e', `bash -c "${command}; sleep 5; exit"`]);

  } catch (error) {
    console.error("ERROR:", error.message);
  }
}



function ensureDirectoryExists(directoryPath) {
    const expandedPath = directoryPath.replace(/^~(?=$|\/|\\)/, os.homedir());

    const absolutePath = path.resolve(expandedPath);

    try {
        fs.mkdirSync(absolutePath, { recursive: true });
        console.log(`Directory created (if it didn't exist): ${absolutePath}`);
    } catch (error) {
        console.error(`Error creating directory: ${error.message}`);
    }
}