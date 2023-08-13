type UserImage = {
    png: string
}
const AVATAR_PATH = '/resources/images/avatars'

export class User {
    image: UserImage;
    username: string;

    constructor(data:User) {
        
        const userAvatar = data.image.png.split('/').pop();

        this.username = data.username
        this.image = {
            png: AVATAR_PATH+'/'+userAvatar
        };
    }
};
