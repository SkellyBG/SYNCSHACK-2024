import express from "express"
import { createRequest, viewRequestsForGroup, viewRequestsSentByUser, 
    acceptRequest, rejectRequest, withdrawRequest } from "../../lib/requests/request-functions"

const router = express.Router();

// create request
router.post("/request_group/:groupid", (req, res) => {
    const payload = req.body;
    const token = createRequest(payload);
    
    if (typeof(token) === "object") {
        res.status(200).json({ token: token });
    } else {
        res.status(400).json({ error: token });
    }
});

// view requests for group
router.post("/view_requests/:groupid", (req, res) => {
    const payload = req.body;
    const token = viewRequestsForGroup(req.params.groupid, payload.requestStatus);

    if (token.length > 0) {
        res.status(200).json({ token: token });
    } else {
        res.status(200).json({ error: token });
    }
});

// view requests sent by a user
router.post("view_requests/:userid", (req, res) => {
    const payload = req.body;
    const token = viewRequestsSentByUser(req.params.userid, payload.requestStatus);

    if (token.length > 0) {
        res.status(200).json({ token: token });
    } else {
        res.status(200).json({ error: token });
    }
});

// accept requests
router.post("accept_request/:requestid", (req, res) => {
    const token = acceptRequest(req.params.requestid);

    if (token[0]) {
        res.status(200).json({ token: token[1] });
    } else {
        res.status(400).json({ token: token[1] });
    }
})

// reject request
router.post("reject_request/:requestid", (req, res) => {
    const token = rejectRequest(req.params.requestid);

    if (token[0]) {
        res.status(200).json({ token: token[1] });
    } else {
        res.status(400).json({ token: token[1] });
    }
})

// withdraw request
router.post("withdraw_request/:requestid", (req, res) => {
    const token = withdrawRequest(req.params.requestid);

    if (token[0]) {
        res.status(200).json({ token: token[1] });
    } else {
        res.status(400).json({ token: token[1] });
    }
})