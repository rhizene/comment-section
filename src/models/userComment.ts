import { User } from "models/user";
import { Reply } from "./Reply"

export class UserComment implements Reply {
    id: number;
    content: string;
    createdAt: Date;
    score: number;
    user: User;
    replies: Reply[] = [];

    constructor(data:any) {
        this.id        = data.id;
        this.content   = data.content;
        this.createdAt = new Date(data.createdAt);
        this.replies   = data.replies;
        this.score     = data.score;
        this.user      = new User(data.user);
    }
}
