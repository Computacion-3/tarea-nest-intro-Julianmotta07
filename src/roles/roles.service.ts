import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { Permission } from '../permissions/entities/permission.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const newRole = this.roleRepository.create(createRoleDto);
    return await this.roleRepository.save(newRole);
  }

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find({ relations: ['permissions'] });
  }

  async findOne(id: number): Promise<Role | null> {
    return await this.roleRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role | null> {
    await this.roleRepository.update(id, updateRoleDto);
    return await this.roleRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });
  }

  async remove(id: number): Promise<{ id: number } | null> {
    const result = await this.roleRepository.delete(id);
    if (result.affected) {
      return { id };
    }
    return null;
  }

  async findByName(name: string): Promise<Role | null> {
    return await this.roleRepository.findOne({
      where: { name },
      relations: ['permissions'],
    });
  }

  // 🚀 Nuevo método
  async addPermissionToRole(roleId: number, permissionId: number): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id: roleId },
      relations: ['permissions'],
    });
    if (!role) throw new NotFoundException(`Role with id ${roleId} not found`);

    const permission = await this.permissionRepository.findOneBy({ id: permissionId });
    if (!permission) throw new NotFoundException(`Permission with id ${permissionId} not found`);

    // Evitar duplicados
    const hasPermission = role.permissions.some((p) => p.id === permissionId);
    if (!hasPermission) {
      role.permissions.push(permission);
      await this.roleRepository.save(role);
    }

    return role;
  }
}