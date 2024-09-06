import { JwtPayload } from 'jwt-decode';

export interface UserProps extends JwtPayload {
  userId: string;
  name: string;
  token: string;
}
