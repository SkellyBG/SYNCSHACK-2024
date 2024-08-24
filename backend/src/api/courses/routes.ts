import express from "express";
import { viewGroups } from '../../lib/courses/course-function';

const router = express.Router();

// View courses
router.get("/unsw/courses/:courseid/groups", (req, res) => {
    const token: string | undefined = req.headers.authorization;
    if (typeof (token) == undefined) {
        res.status(400).json({ error: 'Error: Not logged in!' });
    }
    
    const courseId = req.params.courseid;
    const sortBy = req.query.sortby as string ?? "recommended";
    const groups = viewGroups(courseId, sortBy);

    if (typeof (groups) == 'string') {
        res.status(400).json({ error: "error bruh" });
    } else {
        res.status(200).json({ groups: groups });
    }
})

export default router;