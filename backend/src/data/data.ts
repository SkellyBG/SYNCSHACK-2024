export interface User {
  userId: string;
  name: string;
  email: string;
  password: string;
  role: TeamRole;
  targetGrade: Grade;
  bio: string;
  courses: Array<string>;
}

export interface NewUser {
  newUserId: number;
  name: string;
  email: string;
  password: string;
}

export enum TeamRole {
  Leader = "leader",
  Researcher = "researcher",
  Writer = "writer",
  Developer = "developer",
  Designer = "designer"
}

export enum Grade {
  HD = "HD",
  D = "D",
  CR = "CR",
  PS = "PS"
}

export interface Course {
  courseId: number;
  name: string;
  description: string;
}

export interface Group {
  groupId: string;
  name: string;
  members: Array<string>; // Array of user IDs
  leader: string; // user ID of the user who is the creator of the group
  courseId: number;
}

export interface Request {
  requestId: string;
  userId: string;
  groupId: string;
  status: string;
}

export enum RequestStatus {
  PENDING = "Pending",
  ACCEPTED = "Accepted",
  REJECTED = "Rejected",
  WITHDRAWN = "Withdrawn"
}

export interface Data {
  users: User[];
  newUsers: NewUser[];
  courses: Course[];
  groups: Group[];
  requests: Request[];
}

import * as fs from 'fs';

const filePath: string = 'backend/src/data/data.json';

export function getData(): Data | null {
  try {
    // Read the file content as a string
    const data = fs.readFileSync(filePath, 'utf-8');

    // Parse the JSON string into an object
    const jsonData = JSON.parse(data);

    // Map the parsed data into TypeScript structures
    const convertedData: Data = {
      users: jsonData.users.map((user: any) => ({
        userId: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        targetGrade: user.targetGrade,
        bio: user.bio,
        courses: user.courses
      })),
      newUsers: jsonData.newUsers.map((newUser: any) => ({
        newUserId: newUser.newUserId,
        name: newUser.name,
        email: newUser.email,
        password: newUser.password
      })),
      courses: jsonData.courses.map((course: any) => ({
        courseId: course.id,
        name: course.name,
        description: course.description
      })),
      groups: jsonData.groups.map((group: any) => ({
        groupId: group.id,
        name: group.name,
        members: group.members,
        courseId: group.courseId
      })),
      requests: jsonData.requests.map((request: any) => ({
        requestId: request.id,
        userId: request.userId,
        groupId: request.groupId,
        status: request.status
      }))
    };

    return convertedData;
  } catch (err) {
    console.error('Error reading or parsing the file:', err);
    return null;
  }
}

export function writeData(data: Data): void {
  try {
    // Convert the Data object to a JSON string with pretty formatting
    const jsonData = JSON.stringify(data, null, 2);

    // Write the JSON string to the specified file
    fs.writeFileSync(filePath, jsonData, 'utf-8');

    console.log('Data successfully written to file.');
  } catch (err) {
    console.error('Error writing data to file:', err);
  }
}

// // Example usage
// const loadedData = loadData();

// if (loadedData) {
//   console.log('Loaded Data:', loadedData);
// } else {
//   console.error('Failed to load data.');
// }