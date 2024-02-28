const express = require("express");
const Parser = require("node-html-parser");

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  return res.send("Hello world");
});

app.get("/ping", (req, res) => {
  return res.send("pong");
});

app.get("/daily/:sign", async (req, res) => {
  const respond = await fetch(
    `https://www.astroyogi.com/horoscopes/daily/${req.params.sign}-free-horoscope.aspx`
  );

  const text = await respond.text();
  const dom = Parser.parse(text);
  const spans = dom.querySelectorAll("#myTabContent .tab span");

  let array = [];

  spans.forEach((span) => {
    // Clone the span to avoid altering the original parsed document
    const clone = Parser.parse(span.toString());

    // Remove all <a> tags from the clone
    clone.querySelectorAll("a").forEach((a) => a.remove());

    clone.querySelectorAll("br").forEach((a) => a.remove());

    // Now clone.textContent will have the text content without the <a> tags
    console.log(clone.textContent);
    const cleanText = clone.textContent.trim();

    array.push(cleanText);
  });

  return res.send({
    success: true,
    data: array,
  });
});

app.listen(port, () => {
  console.log("Listening on port: ", port);
});
