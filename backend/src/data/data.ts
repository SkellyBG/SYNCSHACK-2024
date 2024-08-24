export interface User {
  userId: string;
  name: string;
  email: string;
  password: string;
  role: TeamRole | null;
  targetGrade: Grade | null;
  bio: string | null;
  uni: string | null;
  degree: string | null;
  courses: Array<string> | null;
}

export interface NewUser {
  newUserId: string;
  name: string;
  email: string;
  password: string;
}

export enum TeamRole {
  Leader = "leader",
  Researcher = "researcher",
  Writer = "writer",
  Developer = "developer",
  Designer = "designer",
}

export enum Grade {
  HD = "HD",
  D = "D",
  CR = "CR",
  PS = "PS",
}

export interface Course {
  courseId: number;
  name: string;
  description: string;
}

export interface Group {
  groupId: string;
  name: string;
  members: Array<User>; // Array of users
  leader: string;
  courseId: string;
  description: string;
  createdAt: string;
  score?: number;
}

export interface Request {
  requestId: number;
  userId: number;
  groupId: number;
  status: string;
}

export interface Data {
  users: User[];
  newUsers: NewUser[];
  courses: Course[];
  groups: Group[];
  requests: Request[];
  tokens: Token[];
}

export interface Token {
  userId: string;
  tokenId: string;
}

export interface LoginDetails {
  email: string;
  password: string;
}

import * as fs from "fs";

const filePath: string = "src/data/datastore.json";

const data = parseData() as Data;
export function getData(): Data {
  return data;
}

function parseData(): Data | null {
  try {
    // Read the file content as a string
    const data = fs.readFileSync(filePath, "utf-8");

    // Parse the JSON string into an object
    const jsonData = JSON.parse(data);

    // Map the parsed data into TypeScript structures
    const convertedData: Data = {
      users: jsonData.users.map((user: User) => ({
        userId: user.userId,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        targetGrade: user.targetGrade,
        bio: user.bio,
        courses: user.courses,
      })),
      newUsers: jsonData.newUsers.map((newUser: NewUser) => ({
        newUserId: newUser.newUserId,
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
      })),
      courses: jsonData.courses.map((course: Course) => ({
        courseId: course.courseId,
        name: course.name,
        description: course.description,
      })),
      groups: jsonData.groups.map((group: Group) => ({
        groupId: group.groupId,
        name: group.name,
        members: group.members,
        courseId: group.courseId,
      })),
      requests: jsonData.requests.map((request: Request) => ({
        requestId: request.requestId,
        userId: request.userId,
        groupId: request.groupId,
        status: request.status,
      })),
      tokens: jsonData.tokens.map((token: Token) => ({
        userId: token.userId,
        tokenId: token.tokenId,
      })),
    };

    return convertedData;
  } catch (err) {
    console.error("Error reading or parsing the file:", err);
    return null;
  }
}


export function writeData(data: Data): void {
  try {
    // Convert the Data object to a JSON string with pretty formatting
    const jsonData = JSON.stringify(data, null, 2);

    // Write the JSON string to the specified file
    fs.writeFileSync(filePath, jsonData, "utf-8");

    console.log("Data successfully written to file.");
  } catch (err) {
    console.error("Error writing data to file:", err);
  }
}

export function getUserFromToken(token: Token): User | string {
  let data: Data = getData() as Data;
  let users: User[] = data.users;
  let newUsers: NewUser[] = data.newUsers;
  let matchingUsers: User[] = users.filter(user => user.userId === token.userId);
  let matchingNewUsers: NewUser[] = newUsers.filter(u => u.newUserId === token.userId);

  if (matchingUsers.length == 0 && matchingNewUsers.length == 0) {
    return "Error: No user matching this token";
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

export function getTokenFromTokenId(tokenId: string): Token | string {
  // Match tokenId to token
  let data: Data = getData() as Data;
  let tokens: Token[] = data.tokens;
  let matchingTokens: Token[] = tokens.filter(t => t.tokenId === tokenId);
  if (matchingTokens.length == 0) {
    return "Error: Token invalid!";
  }
  let token: Token = matchingTokens[0];
  return token;
}

// // Example usage
// const loadedData = loadData();

// if (loadedData) {
//   console.log('Loaded Data:', loadedData);
// } else {
//   console.error('Failed to load data.');
// }
