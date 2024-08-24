import express from "express";
import { Group } from "../../data/data";
import { addGroup, viewGroup } from '../../lib/groups/group-functions';

const router = express.Router();

// Create a new group
router.post("/unsw/courses/:courseid/groups", (req, res) => {
    const payload: Omit<Group, 'groupId' | 'members' | 'courseId' | 'createdAt'> = req.body;
    const token: string | undefined = req.headers.authorization;
    if (typeof (token) == undefined) {
        res.status(400).json({ error: 'Error: Not logged in!' });
    }

    const courseId = req.params.courseid;
    const group: Group | String = addGroup(payload, token as string, courseId);
    if (typeof (group) == 'string') {
        res.status(400).json({ error: "error bruh" });
    } else {
        res.status(200).json({ group: group });
    }
});

// View group
router.get("/unsw/courses/:courseid/groups/:groupid", (req, res) => {
    const courseId: string = req.params.courseid;
    const groupId: string = req.params.groupid;
    const group: Group | string = viewGroup(courseId, groupId);

    if (typeof (group) == 'string') {
        res.status(400).json({ error: "error bruh" });
    } else {
        res.status(200).json({ group: group });
    }
});

// Modify group
router.put("/unsw/courses/:courseid/groups/:groupsid", (req, res) => {
    res.status(200).json({ hi: "hello world from api!" });
})

// Delete group
router.delete("/unsw/courses/:courseid/groups/:groupsid", (req, res) => {
    res.status(200).json({ hi: "hello world from api!" });
})

export default router;