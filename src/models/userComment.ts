import { User } from "models/user";
import { Reply } from "./Reply"

type UserCommentParams = {
    id:number;
    content: string,
    createdAt?: string,
    replies?: UserCommentParams[],
    score?: number,
    user: User,
}

export class UserComment implements Reply {
    id: number;
    content: string;
    createdAt: Date;
    score: number;
    user: User;
    replies: UserComment[] = [];

    constructor(data:UserCommentParams) {
        const createdAt = data.createdAt? new Date(data.createdAt) : new Date();
        
        this.id        = data.id;
        this.content   = data.content;
        this.createdAt = createdAt;
        this.score     = data.score || 0;
        this.user      = data.user;
        this.replies   = this.loadReplies(data.replies)
    }
    private loadReplies(replies: UserCommentParams[] = []): UserComment[] {
        return replies ? replies.map(reply=>new UserComment(reply as any)) : [];
    }
}
