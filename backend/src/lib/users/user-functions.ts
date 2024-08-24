import { getData, NewUser, User, Data } from '../../data/data';

// Create user
export function addUser(newUser: Omit<NewUser, 'newUserId'>): void {
  let data: Data = getData() as Data;
  let newUsers: NewUser[] = data.newUsers;
  let newUserData: NewUser = {
    newUserId: 1,
    name: newUser.name,
    email: newUser.email,
    password: newUser.password
  };

  // Add the new user to the array
  newUsers.push(newUserData);

  console.log('User added successfully!');
}

// Complete user

// Edit user

// View user

// Delete user