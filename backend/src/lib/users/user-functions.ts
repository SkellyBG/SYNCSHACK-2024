import { v4 as uuidv4 } from 'uuid';
import { getData, NewUser, User, Data } from '../../data/data';

// Create user
export function addUser(newUser: Omit<NewUser, 'newUserId'>): NewUser {
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
  return newUserData;
}

// Complete user
export function completeUser(user: User): User {
  let data: Data = getData() as Data;
  let users: User[] = data.users;

  // Add the new user to the array
  users.push(user);

  console.log('User details completed successfully!');
  return user;
}

// Edit user

// View user
export function viewUser(targetUserId: string): User | string {
  let data: Data = getData() as Data;
  let users: User[] = data.users;
  let matchingUsers: User[] = users.filter(user => user.userId === targetUserId);
  if (matchingUsers.length == 0) {
    return "Error: target user id not found";
  } else {
    return matchingUsers[0];
  }
}

// Delete user