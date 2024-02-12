import { UnauthorizedException } from '@nestjs/common';

export class ValidationService {
  async validateAuthorAndClient(author_id: string, client_id: string) {
    if (author_id != client_id) {
      throw new UnauthorizedException('You are not allowed to do it');
    }
  }
}
