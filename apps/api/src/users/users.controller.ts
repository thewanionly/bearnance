import { Controller, Get } from '@nestjs/common';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { Profile } from '../generated/prisma/client';
import { ProfileResponseDto } from './dto/profile-response.dto';

@Controller('users')
export class UsersController {
  @Get('me')
  getMe(@CurrentUser() user: Profile): ProfileResponseDto {
    return ProfileResponseDto.fromProfile(user);
  }
}
