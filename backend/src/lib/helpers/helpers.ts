import { getData, Data, Group, User, Request, RequestStatus } from "../../data/data"

export function getGroup(groupId: string): Group | null {
    let data: Data = getData() as Data;
    let groups: Group[] = data.groups;

    groups.forEach( (g) => {
        if (g.groupId === groupId) {
            return g;
        }
    });

    return null;
}

export function getUser(userId: string): User | null {
    let data: Data = getData() as Data;
    let users: User[] = data.users;

    users.forEach( (u) => {
        if (u.userId === userId) {
            return u;
        }
    })

    return null;
}

export function getRequest(requestId: string): Request | null {
    let data: Data = getData() as Data;
    let requests: Request[] = data.requests;

    requests.forEach( (r) => {
        if (r.requestId === requestId) {
            return r;
        }
    })

    return null;
}

export function getRequestsForGroup(groupId: string, requestStatus?: RequestStatus): Request[] {
    let data: Data = getData() as Data;
    let requests: Request[] = data.requests;

    let requestsForGroup: Request[] = [];
    requests.forEach( (r) => {
        if (r.groupId === groupId) {
            // if no request status specified, push request into array
            if (!requestStatus) {
                requestsForGroup.push(r);
                return;
            // if request status specified, check if matches before pushing
            } else if (r.status === requestStatus) {
                requestsForGroup.push(r);
                return;
            }
        }
    });

    return requestsForGroup;
}

export function getRequestsSentByUser(userId: string, requestStatus?: RequestStatus): Request[] {
    let data: Data = getData() as Data;
    let requests: Request[] = data.requests;

    let requestsSentByUser: Request[] = [];
    requests.forEach( (r) => {
        if (r.userId === userId) {
            // if no request status specified, push request into array
            if (!requestStatus) {
                requestsSentByUser.push(r);
                return;
            // if request status specified, check if matches before pushing
            } else if (r.status === requestStatus) {
                requestsSentByUser.push(r);
                return;
            }
        }
    });

    return requestsSentByUser;
}