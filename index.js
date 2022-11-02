//Builtin require function to include the fs and inquirer modules
const fs = require("fs");
const inquirer = require("inquirer");

console.log("Running README Generator Application...");//debug message 

//Function to generate README.md file using an object destructor and template literals
const generateREADME = ({title, description, installation, usage, contributions, tests, license, github, email} , badge) =>
  `# ${title}
  ${badge}
  
  ## Description
  ${description}

  ## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Contributions](#contributions)
- [Tests](#tests)
- [Questions](#questions)
  
  ## Installation
  ${installation}
  
  ## Usage
  ${usage}
  
  ## Credits

  ## License
  ${license}

  ## Contributions
  ${contributions}

  ## Tests
  ${tests}
  
  ## Questions
  GitHub URL: https://github.com/${github}
  Reach me with additional questions at ${email}`;

//Invokes the inquirer and prompt method to get user input from the command line interface
//inquirer.prompt passes in questions (in the form of an array of objects) and returns a promise
inquirer
  .prompt([
    {
      type: "input",
      message: "What is your project title?",
      name: "title",
    },    
    {
      type: "input",
      message: "Enter a short description of your project",
      name: "description",
    },  
    {
      type: "input",
      message: "Enter the installation instructions",
      name: "installation",
    },     
    {
      type: "input",
      message: "Enter the usage information",
      name: "usage",
    }, 
    {
      type: "input",
      message: "Enter the contribution guidelines",
      name: "contributions",
    },  
    {
      type: "input",
      message: "Enter the test instructions",
      name: "tests",
    },  
    {
      type: "list",
      message: "Choose a license",
      name: "license",
      choices: ["MIT", "GPLv2", "Apache", "Mozilla"],
    },
    {
      type: "input",
      message: "Enter GitHub username",
      name: "github",
    },
    {
      type: "input",
      message: "Enter email",
      name: "email",
    },
  ])
  //for a resolved promise, use the generateREADME function and pass in the answers (object) given by prompt
  .then((answers) => {

    //nested if statements to assign a badge to the selceted license
    var badge = "";
    if(answers.license=="MIT") {
      badge = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
    } else if (answers.license=="GPLv2") {
      badge = "[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)";
    } else if (answers.license=="Apache") {
      badge = "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
    } else if (answers.license=="Mozilla") {
      badge = "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
    }
    
    const output = generateREADME(answers, badge);//declares output and stores string (template literal) from generateREADME function

    //Create/write to file "README.md" by passing in string (template literal) stored in output
    fs.writeFile("README.md", output, (error) =>
      error ? console.log(error) : console.log ("README.md file generated!")
    );
  })
  //for a rejected promise, output an error
  .catch((error) => {
    //add error
  })