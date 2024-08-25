import { v4 as uuidv4 } from "uuid";
import {
  getData,
  NewUser,
  User,
  Data,
  writeData,
  LoginDetails,
  Token,
  getTokenFromTokenId,
} from "@/src/data/data";

// Create user
export function addUser(newUser: Omit<NewUser, "newUserId">): NewUser | string {
  let data: Data = getData() as Data;
  let newUsers: NewUser[] = data.newUsers;
  let users: User[] = data.users;

  // Error check if email already exists
  let matchingUsers: User[] = users.filter(
    (user) => user.email === newUser.email
  );
  let matchingNewUsers: NewUser[] = newUsers.filter(
    (user) => user.email === newUser.email
  );
  if (matchingUsers.length != 0 || matchingNewUsers.length != 0) {
    return "Error: email already exists!";
  }

  const newUserId: string = uuidv4(); // Generate a new UUID
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

// Login user
export function loginUser(login: LoginDetails): string {
  let data: Data = getData() as Data;
  let newUsers: NewUser[] = data.newUsers;
  let users: User[] = data.users;
  let tokens: Token[] = data.tokens;

  // Error check if login is correct
  let matchingNewUsers: NewUser[] = newUsers.filter(
    (user) => user.email === login.email
  );
  let matchingUsers: User[] = users.filter(
    (user) => user.email === login.email
  );
  let userId = "";
  if (matchingNewUsers.length != 0) {
    if (matchingNewUsers[0].password != login.password) {
      return "Error: Login details incorrect!";
    } else {
      userId = matchingNewUsers[0].newUserId;
    }
  } else if (matchingUsers.length != 0) {
    if (matchingUsers[0].password != login.password) {
      return "Error: Login details incorrect!";
    } else {
      userId = matchingUsers[0].userId;
    }
  } else {
    return "Error: No such email!";
  }
  // Create new token if login successful
  let tokenId: string = uuidv4(); // Generate a new UUID
  let token: Token = {
    userId: userId,
    tokenId: tokenId,
  };

  tokens.push(token);
  data.tokens = tokens;
  writeData(data);
  console.log(token);
  console.log("Token added successfully!");

  return tokenId;
}

// Complete user
export function completeUser(user: User, tokenId: string): User | string {
  let data: Data = getData() as Data;
  let users: User[] = data.users;
  let newUsers: NewUser[] = data.newUsers;

  // Match tokenId to token
  let token: Token | string = getTokenFromTokenId(tokenId);
  if (typeof token == "string") {
    return token;
  }

  // Check that user is not already completed
  let matchingUsers: User[] = users.filter((u) => u.userId === user.userId);
  if (matchingUsers.length != 0) {
    return "Error: User has already completed form!";
  }

  // Check that token userId matches userId of completing user
  if (token.userId != user.userId || token.userId == undefined) {
    return "Error: Login doesn't match current user!";
  }

  // Remove the new user from new users
  let index: number = newUsers.findIndex((u) => u.newUserId === user.userId);
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
export function editUser(user: User, tokenId: string): User | string {
  let data: Data = getData() as Data;
  let users: User[] = data.users;

  // Match tokenId to token
  let token: Token | string = getTokenFromTokenId(tokenId);
  if (typeof token == "string") {
    return token;
  }

  // Check that token userId matches userId of completing user
  if (token.userId != user.userId || token.userId == undefined) {
    return "Error: Login doesn't match current user!";
  }

  // Find the user to update
  let userIndex: number = users.findIndex((u) => u.userId === user.userId);
  if (userIndex === -1) {
    return "Error: User not found!";
  }

  // Update user details
  users[userIndex] = { ...users[userIndex], ...user };

  // Write the updated data
  data.users = users;
  writeData(data);

  console.log("User details updated successfully!");
  return users[userIndex];
}

// View other user
export function viewOtherUser(targetUserId: string): User | string {
  let data: Data = getData() as Data;
  let users: User[] = data.users;
  let newUsers: NewUser[] = data.newUsers;
  // Check users
  let matchingUsers: User[] = users.filter(
    (user) => user.userId === targetUserId
  );

  // Check newUsers
  let matchingNewUsers: NewUser[] = newUsers.filter(
    (user) => user.newUserId === targetUserId
  );

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
      courses: null,
    };
    return user;
  } else {
    return matchingUsers[0];
  }
}

// View cur user
export function viewCurUser(tokenId: string): User | string {
  let token: Token | string = getTokenFromTokenId(tokenId);
  if (typeof token == "string") {
    return "Error: Invalid token!";
  }
  console.log("viewing myself with userId:");
  console.log(token.userId);
  return viewOtherUser(token.userId);
}

// Delete user

export function updateUserCourses(userId: string, courses: string[]): string {
  let data = getData() as Data;
  let users: User[] = data.users;

  // Find the user by userId
  let userIndex = users.findIndex(user => user.userId === userId);
  if (userIndex === -1) {
    return "Error: User not found!";
  }

  // Update the user's courses
  users[userIndex].courses = courses;

  // Write the updated data
  data.users = users;
  writeData(data);

  return "User courses updated successfully!";
}