import { Expose } from 'class-transformer';

import { Profile } from '../../generated/prisma/client';

export class ProfileResponseDto {
  @Expose()
  id!: string;

  @Expose()
  email!: string;

  @Expose()
  name!: string | null;

  @Expose()
  createdAt!: Date;

  static fromProfile(profile: Profile): ProfileResponseDto {
    const dto = new ProfileResponseDto();
    dto.id = profile.id;
    dto.email = profile.email;
    dto.name = profile.name;
    dto.createdAt = profile.createdAt;
    return dto;
  }
}
