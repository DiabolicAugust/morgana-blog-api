export enum NameEnum {
  User = 'User',
}

export const Strings = {
  invalidIdFormat: 'Invalid ID format: ',
  notFoundById: (name: NameEnum) => `${name} was not found by this id: `,
  notFoundByEmail: (name: NameEnum) => `${name} was not found by this email: `,

  //user
  userWithThisEmailExists: 'User with this email already exists!',

  //auth
  wrongPassword: 'Provided password is not correct for the user',

  //posts
  noPostByID: 'There is no post with this id',
};
