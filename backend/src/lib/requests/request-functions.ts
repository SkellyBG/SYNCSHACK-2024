import { group } from "console";
import { getData, User, Group, Request, Data, RequestStatus } from "../../data/data";
import { getUser, getGroup } from "../helpers/helpers";

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
        requestId: data.requests.length,
        userId: user.userId,
        groupId: requestedGroup.groupId,
        status: RequestStatus.pending
    }

    data.requests.push(request);
    console.log("New request created successfully.")
    return true;

}