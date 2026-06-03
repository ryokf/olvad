import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
    ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';

/**
 * Simple authentication guard for checking user roles
 * In production, this should be replaced with JWT verification
 */
@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly allowedRoles: string[]) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();

        // In production, extract from JWT token
        // For now, expect userId and role in headers (mock implementation)
        const userId = request.headers['x-user-id'] as string;
        const userRole = request.headers['x-user-role'] as string;

        if (!userId || !userRole) {
            throw new UnauthorizedException('Missing user authentication');
        }

        if (!this.allowedRoles.includes(userRole)) {
            throw new ForbiddenException('Insufficient permissions for this action');
        }

        // Attach user info to request for later use
        (request as any).userId = parseInt(userId);
        (request as any).userRole = userRole;

        return true;
    }
}

/**
 * Factory function to create role guards with specific allowed roles
 */
export function createRoleGuard(allowedRoles: string[]) {
    return new RoleGuard(allowedRoles);
}
