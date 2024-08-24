import express from "express"
import { Request } from "@/src/data/data";

import { 
    createRequest, 
    viewRequestsForGroup, 
    viewRequestsSentByUser, 
    acceptRequest, 
    rejectRequest, 
    withdrawRequest
} from "../../lib/requests/request-functions"

const router = express.Router();

// create request
router.post("/request_group/:groupid", (req, res) => {
    const payload: Omit<Request, "requestId" | "groupId" | "status"> = req.body;
    const request = createRequest(req.params.groupid, payload);

    if (typeof(request) === "object") {
        res.status(200).json({ request: request });
    } else {
        res.status(400).json({ error: request });
    }
});

// view requests for group
router.get("/view_requests/:groupid", (req, res) => {
    const payload = req.body;
    const groupRequests = viewRequestsForGroup(req.params.groupid, payload.requestStatus);

    if (groupRequests.length > 0) {
        res.status(200).json({ groupRequests: groupRequests });
    } else {
        res.status(200).json({ error: groupRequests });
    }
});

// view requests sent by a user
router.get("/view_requests", (req, res) => {
    const payload = req.body;

    const tokenString: string | undefined = req.headers.authorization;
    if (typeof (tokenString) == undefined) {
        res.status(400).json({ error: 'Error: Not logged in!' });
    }

    const userRequests = viewRequestsSentByUser(tokenString as string, payload.requestStatus);

    if (userRequests.length > 0) {
        res.status(200).json({ userRequests: userRequests });
    } else {
        res.status(200).json({ error: userRequests });
    }
});

// accept requests
router.post("/accept_request/:requestid", (req, res) => {
    const accept = acceptRequest(req.params.requestid);

    if (accept[0]) {
        res.status(200).json({ acceptedString: accept[1] });
    } else {
        res.status(400).json({ failedString: accept[1] });
    }
})

// reject request
router.post("/reject_request/:requestid", (req, res) => {
    const reject = rejectRequest(req.params.requestid);

    if (reject[0]) {
        res.status(200).json({ rejectedString: reject[1] });
    } else {
        res.status(400).json({ failedString: reject[1] });
    }
})

// withdraw request
router.post("/withdraw_request/:requestid", (req, res) => {
    const withdraw = withdrawRequest(req.params.requestid);

    if (withdraw[0]) {
        res.status(200).json({ withdrawnString: withdraw[1] });
    } else {
        res.status(400).json({ failedString: withdraw[1] });
    }
})

export default router;