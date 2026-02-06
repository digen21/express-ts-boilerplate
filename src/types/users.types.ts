interface IUser {
  username?: string;
  name?: string;
  city?: string;
  country?: string;
  password: string;
  id: string;
  _id: string;
  email: string;
  bio?: string;
  avatar?: string;
  phoneNumber?: string;
  isVerified: boolean;
  providerId?: string;
  provider?: string;
}

export type UserWithToken = IUser & { token: string };

export default IUser;
