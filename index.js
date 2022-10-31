const fs = require("fs");
const inquirer = require("inquirer");

console.log("Running README Generator Application...");

const generateREADME = ({title, description, installation, usage, contribution, test}) => 
  `# ${title}
  
  ## Description
  ${description}
  
  ## Installation
  ${installation}
  
  ## Usage
  ${usage}
  
  ## Contributions
  ${contribution}

  ## Tests
  ${test}`;

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
      name: "contribution",
    },  
    {
      type: "input",
      message: "Enter the test instructions",
      name: "test",
    },  
  ])
  .then((answers) => {
    const output = generateREADME(answers);
    console.log(answers);

    fs.writeFile("README.md", output, (error) =>
      error ? console.log(error) : console.log ("README.md file generated!")
    );
  })