import { getData, User, Group, Request, Data, RequestStatus } from "../../data/data";
import { getUser, getGroup, getRequestsForGroup, getRequestsSentByUser, getRequest } from "../helpers/helpers";

export function createRequest(newRequest: Omit<Request, "requestId">): Request | null {
    let data: Data = getData() as Data;

    // find the group from the group ID given in newRequest
    let groupResult: Group | null = getGroup(newRequest.groupId);
    if (!groupResult) {
        return null;
    } 
    // else
    let requestedGroup: Group = groupResult as Group;

    // find the user from the user ID given in newRequest
    let userResult: User | null = getUser(newRequest.userId);
    if (!userResult) {
        return null;
    }
    // else
    let user: User = userResult as User;

    // create request object
    let request: Request = {
        requestId: `${data.requests.length}`,
        userId: user.userId,
        groupId: requestedGroup.groupId,
        status: RequestStatus.PENDING
    }

    data.requests.push(request);
    console.log("New request created successfully.")
    return request;
}

export function viewRequestsForGroup(groupId: string, requestStatus?: RequestStatus): Request[] {
    // get all requests for that group
    return getRequestsForGroup(groupId, requestStatus);
}

export function viewRequestsSentByUser(userId: string, requestStatus?: RequestStatus): Request[] {
    return getRequestsSentByUser(userId, requestStatus);
}

export function acceptRequest(requestId: string): boolean {
    // get request
    let requestResult = getRequest(requestId);
    if (!requestResult) {
        return false;
    }
    // else
    let request: Request = requestResult as Request;

    // if request has already been withdrawn then it can't be accepted
    if (request.status === RequestStatus.WITHDRAWN || request.status === RequestStatus.REJECTED) {
        return false;
    }

    // get group
    let groupResult = getGroup(request.groupId);
    if (!groupResult) {
        return false;
    } 
    // else
    let group: Group = groupResult as Group;

    // add user into the group
    group.members.push(request.userId);

    // withdraw all other requests sent by the user
    let pendingUserRequests: Request[] = getRequestsSentByUser(request.userId, RequestStatus.PENDING);
    pendingUserRequests.forEach( (r) => {
        r.status = RequestStatus.WITHDRAWN;
    });
    
    return true;
}

export function rejectRequest(requestId: string): boolean {
    // get request
    let requestResult = getRequest(requestId);
    if (!requestResult) {
        return false;
    }
    // else
    let request: Request = requestResult as Request;

    // if request has already been withdrawn then it can't be rejected
    if (request.status === RequestStatus.PENDING) {
        request.status = RequestStatus.REJECTED;
        return true;
    } else {
        return false;
    }
}

export function withdrawRequest(requestId: string): boolean {
    // get request
    let requestResult = getRequest(requestId);
    if (!requestResult) {
        return false;
    }
    // else
    let request: Request = requestResult as Request;
    
    // if request has already been rejected/accepted then it can't be withdrawn
    if (request.status === RequestStatus.PENDING) {
        request.status = RequestStatus.WITHDRAWN;
        return true;
    } else {
        return false;
    }
}