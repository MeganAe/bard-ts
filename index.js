import Bard from "./src/bard.js";
import express from 'express';
import fetch from 'node-fetch'; // Import fetch module

const app = express();
const port = Math.floor(Math.random() * (3000 - 1024 + 1)) + 1024;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ intro: "Welcome to my API!" }); // Fixed typo in "welcome"
});

app.get('/google', async (req, res) => {
  try {
    let { question, cookie, image_url } = req.query; // Combine variable declarations
    if (!question) return res.status(500).send({ message: "Missing Parameter: question" });
    if (!cookie) return res.status(500).send({ message: "Missing Parameter: cookie\n\nPlease Provide your own cookie to use this API and never share it with anyone." });
 
    // Fixed parameter name

    let myBard = new Bard(`${cookie}`); // COOKIE HERE

    if (image_url) {
      const imageBuffer = await fetch(image_url).then(res => res.buffer()); // Use "buffer()" instead of "arrayBuffer()"
      let response = await myBard.ask(question, { image: imageBuffer }); // Use "question" instead of "message"
      console.log(response);
      return res.send(response);
    } else {
      let response = await myBard.ask(question); // Use "question" instead of "message"
      console.log(response);
      return res.send(response);
    }
  } catch (error) {
    console.error("Error:", error.message);
    return res.send({ message: "Server Busy! Please Try Again!" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
