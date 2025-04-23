interface User {
  username: string,
  password: string
}
export const validUser: User = {
  username: 'admin',
  password: 'Admin2000'
};

export const invalidUser: User = {
  username: 'mostafa',
  password: '1234'
}

export const emptyUserFields : User = {
 username : '',
 password: '' 
}
