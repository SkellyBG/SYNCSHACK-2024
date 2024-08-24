import { getData, Data, Group, User} from "../../data/data"

export function getGroup(groupId: string) {
    let data: Data = getData() as Data;
    let groups: Group[] = data.groups;

    groups.forEach( (g) => {
        if (g.groupId === groupId) {
            return g;
        }
    });

    return null;
}

export function getUser(userId: string) {
    let data: Data = getData() as Data;
    let users: User[] = data.users;

    users.forEach( (u) => {
        if (u.userId === userId) {
            return u;
        }
    })

    return null;
}