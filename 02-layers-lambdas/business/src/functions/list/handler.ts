import 'source-map-support/register';
import { middyfy } from '@libs/lambda';
import { DB } from 'npm-curso/lib';

const list = async () => {
  const credentials = await DB.getCredencials('dev/rds');
  Object.assign(credentials, { database: 'db_citas' });
  console.log('credentials', credentials);

  const connection = await DB.getConnection(credentials);
  console.log('connection', connection);
  const result = await DB.executeStatement(
    connection,
    'select idMedico, nombreCompleto from medico'
  );

  console.log('result', result);

  connection.end();

  return result;
};

export const main = middyfy(list);
