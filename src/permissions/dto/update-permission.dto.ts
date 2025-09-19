import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissionDto } from './create-permission.dto';

/**
 * DTO para la actualización de permisos.
 */
export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {}