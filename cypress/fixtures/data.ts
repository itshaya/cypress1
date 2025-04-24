interface User {
  username: string,
  password: string
}
export const validUser: User = {
  username: Cypress.env('USERNAME'),
  password: Cypress.env('PASSWORD')
};

export const invalidUser: User = {
  username: 'mostafa',
  password: '1234'
}

export const emptyUserFields : User = {
 username : '',
 password: '' 
}
