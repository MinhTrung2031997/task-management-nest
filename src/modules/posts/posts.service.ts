import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  public async test() {
    return 'aaa';
  }
}
