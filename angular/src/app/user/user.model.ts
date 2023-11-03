
type UserImage = {
  png: string
}
const AVATAR_PATH = 'assets/images/avatars'
type UserLike = {
  image: UserImage,
  username: string,
}

export class User {
  readonly image: UserImage;
  readonly username: string;

  static EMPTY = new User({
    username: '',
    image: {png: ''}
  });

  constructor(data:UserLike) {
    const userAvatar = data.image.png.split('/').pop();

    this.username = data.username,
    this.image = {
        png: AVATAR_PATH+'/'+ userAvatar
      }
  }
}
