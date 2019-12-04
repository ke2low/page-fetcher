const request = require('request');
const args = process.argv;
var fs = require('fs');
const readline = require('readline');
let destination = args[3];
let overwrite;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

request(args[2], (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
  if(fs.existsSync(destination))  {
    rl.question("The current file destination already exists, would you like to overwrite? \nPlease enter Y \n", (answer) => {
      // TODO: Log the answer in a database
      console.log(`Thank you for your valuable feedback: ${answer}`);
      if (answer === "Y") {
        fs.writeFile(destination, body, function (err) {
          if (err) throw err;
          const stats = fs.statSync(destination);
          const fileSize = stats.size;
          console.log(`Downloaded and saved ${fileSize} bytes to ${destination}`);
          console.log('Saved!');
        });
        rl.close();
      }
      else if (answer != "Y") {
        rl.close();
      }
    });
  }
  else if(!fs.existsSync(destination)) {
    fs.appendFile(destination, body, function (err) {
      if (err) throw err;
      const stats = fs.statSync(destination);
      const fileSize = stats.size;
      console.log(`Downloaded and saved ${fileSize} bytes to ${destination}`);
      console.log('Saved!');
    });
  }
});




