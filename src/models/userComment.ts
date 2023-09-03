import { User } from "models/user";
import { Reply } from "./Reply"

type UserCommentParams = {
    id:number;
    content: string,
    createdAt?: string,
    replies?: Reply[],
    score?: number,
    user: User,
}

export class UserComment implements Reply {
    id: number;
    content: string;
    createdAt: Date;
    score: number;
    user: User;
    replies: Reply[] = [];

    constructor(data:UserCommentParams) {
        const createdAt = data.createdAt? new Date(data.createdAt) : new Date();
        
        this.id        = data.id;
        this.content   = data.content;
        this.createdAt = createdAt;
        this.replies   = data.replies ? [...data.replies] : [];
        this.score     = data.score || 0;
        this.user      = data.user;
    }
}
