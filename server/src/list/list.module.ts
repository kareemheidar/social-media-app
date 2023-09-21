import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { ListSchema } from './schema/list.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'List', schema: ListSchema }]),
  ],
  controllers: [ListController],
  providers: [ListService],
})
export class ListModule {}
