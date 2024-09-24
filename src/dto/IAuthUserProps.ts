import { JwtPayload } from 'jwt-decode';

export interface IAuthUserProps extends JwtPayload {
  userId: string;
  name: string;
  token: string;
}
