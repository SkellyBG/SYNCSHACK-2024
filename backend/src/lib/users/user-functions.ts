import { v4 as uuidv4 } from 'uuid';
import { getData, NewUser, User, Data } from '../../data/data';

// Create user
export function addUser(newUser: Omit<NewUser, 'newUserId'>): void {
  let data: Data = getData() as Data;
  let newUsers: NewUser[] = data.newUsers;
  const newUserId: string = uuidv4();  // Generate a new UUID
  let newUserData: NewUser = {
    newUserId: newUserId,
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