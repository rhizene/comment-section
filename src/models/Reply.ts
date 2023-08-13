import { User } from "./user";

export interface Reply {
    "id": number;
    "content": string;
    "createdAt": Date;
    "score": number;
    "user": User;
};
