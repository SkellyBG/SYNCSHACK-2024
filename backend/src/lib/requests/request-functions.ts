import { getData, User, Group, Request, Data, RequestStatus } from "../../data/data";
import { getUser, getGroup, getRequestsForGroup, getRequestsSentByUser, getRequest } from "../helpers/helpers";

export function createRequest(newRequest: Omit<Request, "requestId">): boolean {
    let data: Data = getData() as Data;

    // find the group from the group ID given in newRequest
    let groupResult: Group | null = getGroup(newRequest.groupId);
    if (!groupResult) {
        return false;
    } 
    // else
    let requestedGroup: Group = groupResult as Group;

    // find the user from the user ID given in newRequest
    let userResult: User | null = getUser(newRequest.userId);
    if (!userResult) {
        return false;
    }
    // else
    let user: User = userResult as User;

    // create request object
    let request: Request = {
        requestId: `${data.requests.length}`,
        userId: user.userId,
        groupId: requestedGroup.groupId,
        status: RequestStatus.pending
    }

    data.requests.push(request);
    console.log("New request created successfully.")
    return true;
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
    request.status = RequestStatus.accepted;

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

    
    return true;
}