const { readFile, writeFile } = require("./fileManager");

readFile("src/public/readMe.md");
writeFile("src/public/readMe.md", "Hello World teddy, how are you?");
