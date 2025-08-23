import { EntitySchema } from 'typeorm';

export const updateEntityFields = (fieldsToUpdate: object, entity: any) => {
  Object.keys(fieldsToUpdate).forEach((key) => {
    if (fieldsToUpdate[key] !== undefined) {
      entity[key] = fieldsToUpdate[key];
    }
  });
};
