import { getData, User, Group, Request, Data, RequestStatus } from "../../data/data";
import { getUser, getGroup, getRequestsForGroup, 
    getRequestsSentByUser, getRequest, checkIfRequestExists } from "../helpers/helpers";

export function createRequest(newRequest: Omit<Request, "requestId">): Request | string {
    let data: Data = getData() as Data;

    // first check if user has already sent a request
    if (checkIfRequestExists(newRequest.userId, newRequest.groupId)) {
        return "A request has already been sent to this group"
    }

    // find the group from the group ID given in newRequest
    let groupResult: Group | null = getGroup(newRequest.groupId);
    if (!groupResult) {
        return "Group cannot be found";
    } 
    // else
    let requestedGroup: Group = groupResult as Group;

    // find the user from the user ID given in newRequest
    let userResult: User | null = getUser(newRequest.userId);
    if (!userResult) {
        return "User cannot be found";
    }
    // else
    let user: User = userResult as User;

    // create request object
    let request: Request = {
        requestId: `${data.requests.length}`,
        userId: user.userId,
        groupId: requestedGroup.groupId,
        courseId: requestedGroup.courseId,
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

export function acceptRequest(requestId: string): [boolean, string] {
    // get request
    let requestResult = getRequest(requestId);
    if (!requestResult) {
        return [false, "Request could not be found"];
    }
    // else
    let request: Request = requestResult as Request;

    // if request has already been withdrawn then it can't be accepted
    if (request.status === RequestStatus.WITHDRAWN) {
        return [false, "Request has already been withdrawn and cannot be accepted anymore"];
    } else if (request.status === RequestStatus.REJECTED) {
        return [false, "Request has already been rejected and cannot be accepted anymore"];
    } else if (request.status === RequestStatus.ACCEPTED) {
        return [false, "Request has already been accepted"]
    }

    // get group
    let groupResult = getGroup(request.groupId);
    if (!groupResult) {
        return [false, "Group could not be found"];
    } 
    // else
    let group: Group = groupResult as Group;

    // add user into the group
    group.members.push(request.userId);

    // withdraw all other requests sent by the user
    let pendingUserRequests: Request[] = getRequestsSentByUser(request.userId, RequestStatus.PENDING);
    pendingUserRequests.forEach( (r) => {
        // only withdraw requests for the course. not all requests
        if (r.courseId === request.courseId) {
            r.status = RequestStatus.WITHDRAWN;
        }
    });
    
    return [true, "Request has been accepted"];
}

export function rejectRequest(requestId: string): [boolean, string] {
    // get request
    let requestResult = getRequest(requestId);
    if (!requestResult) {
        return [false, "Request could not be found"];
    }
    // else
    let request: Request = requestResult as Request;

    // if request has already been withdrawn then it can't be rejected
    if (request.status === RequestStatus.ACCEPTED) {
        return [false, "Request has already been accepted and cannot be rejected"];
    } else if (request.status === RequestStatus.WITHDRAWN) {
        return [false, "Request has already been withdrawn and cannot be rejected"];
    } else if (request.status === RequestStatus.REJECTED) {
        return [false, "Request has already been rejected"]
    }

    request.status = RequestStatus.REJECTED;
    return [true, "Request rejected"];
}

export function withdrawRequest(requestId: string): [boolean, string] {
    // get request
    let requestResult = getRequest(requestId);
    if (!requestResult) {
        return [false, "Request could not be found"];
    }
    // else
    let request: Request = requestResult as Request;
    
    // if request has already been rejected/accepted then it can't be withdrawn
    if (request.status === RequestStatus.ACCEPTED) {
        return [false, "Request has already been accepted and cannot be withdrawn"];
    } else if (request.status === RequestStatus.REJECTED) {
        return [false, "Request has already been rejected and cannot be withdrawn"];
    } else if (request.status === RequestStatus.WITHDRAWN) {
        return [false, "Request has already been withdrawn"]
    }

    request.status = RequestStatus.WITHDRAWN;
    return [true, "Request withdrawn"];
}