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
    },
    {
      type: 'confirm',
      name: 'useUsersDomain',
      message: 'Include User(Register/Login) API boilerplate?',
      when: (answers) => answers.useDB && answers.useJWT,
      default: true 
    },
    {
      type: 'confirm',
      name: 'useSwagger',
      message: 'Include Swagger API documentation setup?',
      default: false
    },
    {
      type: 'confirm',
      name: 'useMonitoring',
      message: 'Include swagger-stats real-time monitoring?',
      when: (answers) => answers.useSwagger,
      default: true
    }
  ]);

  return answers;
};

export default getOptions;