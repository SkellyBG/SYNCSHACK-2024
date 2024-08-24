import { getData, Data, Group, User, Request, RequestStatus } from "../../data/data"

export function getGroup(groupId: string): Group | undefined {
    const data: Data = getData() as Data;
    const groups: Group[] = data.groups;

    return groups.find(group => group.groupId === groupId)
}

export function getUser(userId: string): User | undefined {
    const data: Data = getData() as Data;
    const users: User[] = data.users;

    return users.find(user => user.userId === userId);
}

export function getRequest(requestId: string): Request | undefined {
    const data: Data = getData() as Data;
    const requests: Request[] = data.requests;

    return requests.find(request => request.requestId === requestId);
}

// different from getRequest. this function check if a user has already sent
// a request to a particular group
export function checkIfRequestExists(userId: string, groupId: string): boolean {
    const data: Data = getData() as Data;
    const requests: Request[] = data.requests;

    for (let i = 0; i < requests.length; i ++) {
        if (requests[i].userId === userId && requests[i].groupId === groupId) {
            return true;
        }
    }

    return false;
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