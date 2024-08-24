import { v4 as uuidv4 } from "uuid";
import { getData, NewUser, User, Data, writeData } from "@/src/data/data";

// Create user
export function addUser(newUser: Omit<NewUser, 'newUserId'>): NewUser | string {
  let data: Data = getData() as Data;
  let newUsers: NewUser[] = data.newUsers;

  // Error check if email already exists
  let matchingUsers: NewUser[] = newUsers.filter(user => user.email === newUser.email);
  if (matchingUsers.length != 0) {
    return "Error: email already exists!";
  }

  const newUserId: string = uuidv4();  // Generate a new UUID
  let newUserData: NewUser = {
    newUserId: newUserId,
    name: newUser.name,
    email: newUser.email,
    password: newUser.password,
  };

  // Add the new user to the array
  newUsers.push(newUserData);

  // Write the data
  data.newUsers = newUsers;
  writeData(data);

  console.log("User added successfully!");
  return newUserData;
}

// Complete user
export function completeUser(user: User): User {
  let data: Data = getData() as Data;
  let users: User[] = data.users;
  let newUsers: NewUser[] = data.newUsers;

  // Remove the new user from new users
  let index: number = newUsers.findIndex(u => u.newUserId === user.userId);
  if (index != -1) {
    newUsers.splice(index, 1);
    data.newUsers = newUsers;
  }

  // Add the new user to the array
  users.push(user);

  // Write the data
  data.users = users;
  writeData(data);

  console.log("User details completed successfully!");
  return user;
}

// Edit user

// View other user
export function viewOtherUser(targetUserId: string): User | string {
  let data: Data = getData() as Data;
  let users: User[] = data.users;
  let newUsers: NewUser[] = data.newUsers;
  let found = false;
  // Check users
  let matchingUsers: User[] = users.filter(user => user.userId === targetUserId);

  // Check newUsers
  let matchingNewUsers: NewUser[] = newUsers.filter(user => user.newUserId === targetUserId);

  if (matchingUsers.length == 0 && matchingNewUsers.length == 0) {
    return "Error: target user id not found";
  } else if (matchingNewUsers.length != 0) {
    let user: User = {
      userId: matchingNewUsers[0].newUserId,
      name: matchingNewUsers[0].name,
      email: matchingNewUsers[0].email,
      password: matchingNewUsers[0].password,
      role: null,
      targetGrade: null,
      bio: null,
      uni: null,
      degree: null,
      courses: null
    }
    return user;
  } else {
    return matchingUsers[0];
  }
}

// View cur user
export function viewCurUser(targetUserId: string): User | string {
  let data: Data = getData() as Data;
  let users: User[] = data.users;
  let newUsers: NewUser[] = data.newUsers;
  let found = false;
  // Check users
  let matchingUsers: User[] = users.filter(user => user.userId === targetUserId);

  // Check newUsers
  let matchingNewUsers: NewUser[] = newUsers.filter(user => user.newUserId === targetUserId);

  if (matchingUsers.length == 0 && matchingNewUsers.length == 0) {
    return "Error: target user id not found";
  } else if (matchingNewUsers.length != 0) {
    let user: User = {
      userId: matchingNewUsers[0].newUserId,
      name: matchingNewUsers[0].name,
      email: matchingNewUsers[0].email,
      password: matchingNewUsers[0].password,
      role: null,
      targetGrade: null,
      bio: null,
      uni: null,
      degree: null,
      courses: null
    }
    return user;
  } else {
    return matchingUsers[0];
  }
}

// Delete user
