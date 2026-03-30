import inquirer from "inquirer";

const getOptions = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      default: 'my-project'
    },
    {
      type: 'confirm',
      name: 'useDB',
      message: 'Include MySQL database (Docker Compose)?',
      default: false
    },
    {
      type: 'confirm',
      name: 'useJWT',
      message: 'Add JWT authentication boilerplate?',
      default: false
    }
  ]);

  return answers;
};

export default getOptions;