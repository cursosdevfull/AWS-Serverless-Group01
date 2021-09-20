import 'source-map-support/register';
import { middyfy } from '@libs/lambda';

const list = async () => {
  const listMedics = [
    { id: 1, name: 'Medic 01' },
    { id: 2, name: 'Medic 02' },
    { id: 3, name: 'Medic 03' },
    { id: 4, name: 'Medic 04' },
  ];
  return {
    result: listMedics,
  };
};

export const main = middyfy(list);
