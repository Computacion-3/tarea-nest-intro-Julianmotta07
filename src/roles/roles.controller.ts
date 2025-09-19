import { Controller, Post, Param, ParseIntPipe } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post(':roleId/permissions/:permissionId')
  async addPermissionToRole(
    @Param('roleId', ParseIntPipe) roleId: number,
    @Param('permissionId', ParseIntPipe) permissionId: number,
  ): Promise<Role> {
    return this.rolesService.addPermissionToRole(roleId, permissionId);
  }
}