//Builtin require function to include the fs and inquirer modules
const fs = require("fs");
const inquirer = require("inquirer");

console.log("Running README Generator Application...");//debug message 

//Function to generate README.md file using an object destructor and template literals
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

//Invokes the inquirer and prompt method to get user input from the command line interface
//inquirer.prompt passes in questions and returns a promise
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
  //for a resolved promise, use the generateREADME function and pass in the answers (object) given by prompt
  .then((answers) => {
    const output = generateREADME(answers);//declares output and stores string (template literal) from generateREADME function
    console.log(answers);//debug

    //Create/write to file "README.md" by passing in string (template literal) stored in output
    fs.writeFile("README.md", output, (error) =>
      error ? console.log(error) : console.log ("README.md file generated!")
    );
  })
  //for a rejected promise, output an error
  .catch((error) => {
    //add error
  })