export enum NameEnum {
  User = 'User',
}

export const Strings = {
  invalidIdFormat: 'Invalid ID format: ',
  notFoundById: (name: NameEnum) => `${name} was not found by this id: `,

  //user
  userWithThisEmailExists: 'User with this email already exists!',
};
