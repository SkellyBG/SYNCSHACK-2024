import { getData, User, Group, Data } from '../../data/data';

export function viewGroups(courseId: string, sortBy: string): Group[] | Array<String> {
    const data: Data = getData() as Data;
    if (!data) {
        console.error("No data available");
        return [];
    }

    let groups = data.groups.filter((group) => group.courseId === courseId);

    switch (sortBy) {
        case "newest":
            groups.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            break;
        case "oldest":
            groups.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            break;
        case "recommended":
            // TO-DO: implement logic
            groups.sort((a, b) => {
                return 0;
            });
            break;
        case "score":
            groups.sort((a, b) => (b.score || 0) - (a.score || 0));
            break;
        case "role":
            // TO-DO: implement logic
            groups.sort((a, b) => {
                return 0;
            });
            break;
        default:
            // Change to recommended later
            groups.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }

    return groups;
}