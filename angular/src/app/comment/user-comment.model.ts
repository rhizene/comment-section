import { User } from "../user/user.model";

type UserCommentParams = {
  id:number;
  content: string,
  createdAt?: string,
  replies?: UserCommentParams[],
  score?: number,
  user: User,
  replyingTo?:string,
}

export class UserComment {
  id: number;
  content: string;
  createdAt: Date;
  score: number;
  user: User;
  replies: UserComment[] = [];
  replyingTo:string | null;

  static EMPTY = new UserComment({
    id: 0,
    content: '',
    user: User.EMPTY,
  })

  constructor(data:UserCommentParams) {
      const createdAt = data.createdAt? new Date(data.createdAt) : new Date();
      
      this.id        = data.id;
      this.content   = data.content;
      this.createdAt = createdAt;
      this.score     = data.score || 0;
      this.user      = new User(data.user);
      this.replies   = this.loadReplies(data.replies)
      this.replyingTo = data.replyingTo || null

  }
  private loadReplies(replies: UserCommentParams[] = []): UserComment[] {
      return replies ? replies.map(reply=>new UserComment(reply as any)) : [];
  }

  static sort(previous:UserComment, next:UserComment) {
      if(previous.replyingTo !== null) {
          if(previous.createdAt === next.createdAt) return 0;
          if(previous.createdAt > next.createdAt) return -1;
          return 1;
      }

      if(previous.score === next.score) return 0;
      if(previous.score > next.score) return -1;
      return 1;
  }

  deleteReply(replyId:number){
      let isFound = false;
      this.replies = this.replies.filter(reply =>{
          const isMatch = reply.id !== replyId;
          if(isMatch) {
              isFound = true;
          }
          return isMatch;
      });
      return isFound;
  }

  addReply(reply:UserComment) {
      this.replies.push(reply);
  }

  upvote(){
      this.score ++;
  }

  downvote(){
      this.score --;
  }

  private isIdMatch(otherId:number) {
      return this.id === otherId;
  }

  static findById(comments:UserComment[], searchId:number):UserComment|null {
      for(let i:number = 0; i < comments.length; i++) {
          const currentComment =comments[i];
          if(currentComment.isIdMatch(searchId)) {
              return currentComment;
          }

          if(currentComment.replies.length > 0) {
              const replyFound = UserComment.findById(currentComment.replies, searchId);
              if(replyFound !== null) {
                  return replyFound;
              }
          }
      }
      return null;
  }
}
