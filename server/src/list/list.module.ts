import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { ListSchema } from './schema/list.schema';
import { BookmarksModule } from 'src/bookmarks/bookmarks.module';

@Module({
  imports: [
    AuthModule,
    forwardRef(() => BookmarksModule),
    MongooseModule.forFeature([{ name: 'List', schema: ListSchema }]),
  ],
  controllers: [ListController],
  providers: [ListService],
  exports: [ListService]
})
export class ListModule {}
