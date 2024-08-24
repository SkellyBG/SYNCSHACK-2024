import { v4 as uuidv4 } from 'uuid';
import { getData, User, Group, Data, writeData, Token, getTokenFromTokenId } from '../../data/data';

// Create group
export function addGroup(group: Omit<Group, 'groupId' | 'members' | 'courseId' | 'createdAt'>, tokenId: string, courseId: string): Group | string {
  let token: Token | string = getTokenFromTokenId(tokenId);

  if (typeof (token) == 'string') {
    return 'Error: Invalid token!';
  }
  
  let data: Data = getData() as Data;
  let targetUserId = token.userId;
  let users: User[] = data.users;
  // Check users
  let owner: User | undefined = users.find(user => user.userId === targetUserId);
    
  if (!owner) {
      return 'Error: Owner not found!';
  }

  let groups: Group[] = data.groups;

  const groupId: string = uuidv4();
  let groupMembers: User[] = [];
  groupMembers.push(owner);

  let groupData: Group = {
    groupId: groupId,
    name: group.name,
    members: groupMembers,
    leader: owner.userId,
    courseId: courseId,
    description: group.description,
    createdAt: new Date().toISOString(),
  };

  // Add the new group to the array
  groups.push(groupData);

  data.groups = groups;
  writeData(data);

  console.log('Group added successfully!');
  return groupData;
}

export function viewGroup(courseId: string, groupId: string): Group | string {
    let data: Data = getData() as Data;

    // find group by courseId and groupId
    let group: Group | undefined = data.groups.find(
        (g) => g.courseId === courseId && g.groupId === groupId
    );

    if (group) {
        return group;
    } else {
        return "Group not found";
    }
}