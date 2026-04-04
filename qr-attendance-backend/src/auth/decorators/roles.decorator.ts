import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/common/enums/roles.enum';


// Attach roles metadata to routes
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);