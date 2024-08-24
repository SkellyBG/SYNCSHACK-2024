import { getData, NewUser, User, Data } from '../../data/data';

// Create user
export function addUser(newUser: NewUser): void {
  let data: Data = getData() as Data;
  let newUsers: NewUser[] = data.newUsers;

  // Add the new user to the array
  newUsers.push(newUser);

  console.log('User added successfully!');
}

// Edit user

// View user

// Delete user