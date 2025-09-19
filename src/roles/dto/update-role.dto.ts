// src/roles/dto/update-role.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';

/**
 * DTO para la actualización de roles.
 */
export class UpdateRoleDto extends PartialType(CreateRoleDto) {}