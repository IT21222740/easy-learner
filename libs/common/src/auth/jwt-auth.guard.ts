import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, Observable, tap } from 'rxjs';
import { AUTH_ } from './services';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_) private authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const authentication = this.getAuthentication(context);
    return this.authClient
      .send('validate_user', {
        Authentication: authentication,
      })
      .pipe(
        tap((res) => {
          this.addUser(res, context);
        }),
        catchError(() => {
          throw new UnauthorizedException();
        }),
      );
  }

  private getAuthentication(context: ExecutionContext) {
    let authentication_string: string;
    if (context.getType() === 'rpc') {
      authentication_string = context.switchToRpc().getData().Authentication;
    } else if (context.getType() === 'http') {
      authentication_string = context.switchToHttp().getRequest()
        .cookies?.Authentication;
    }
    if (!authentication_string) {
      throw new UnauthorizedException(
        'Nothing is provided  ',
      );
    }
    return authentication_string;
  }

  private addUser(user: any, context: ExecutionContext) {
    if (context.getType() === 'rpc') {
      context.switchToRpc().getData().user = user;
    } else if (context.getType() === 'http') {
      context.switchToHttp().getRequest().user = user;
    }
  }
}
