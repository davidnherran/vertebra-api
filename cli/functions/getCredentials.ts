import { prompt } from 'inquirer';

export const getCredentials = async () => {
  const dataConnection = await prompt([
    {
      type: 'input',
      message: 'Username',
      name: 'username',
    },
    {
      type: 'password',
      message: 'Password',
      name: 'password',
    },
  ]);
  return dataConnection;
};
