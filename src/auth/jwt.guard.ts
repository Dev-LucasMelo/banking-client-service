import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JWTguard extends AuthGuard('jwt') {
    handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {

        if (info) {
            throw new UnauthorizedException('Token inválido ou expirado');
        }
        
        if (!user) {
            throw new UnauthorizedException('Token não fornecido ou credencial inválida');
        }

        return user
    }
}