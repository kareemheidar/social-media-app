import { Category, ListItem } from '../schema/list.schema';
import { User } from 'src/auth/schemas/user.schema';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateListDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly topic: string;

  @IsNotEmpty()
  @IsEnum(Category)
  readonly category: Category;

  @IsNotEmpty()
  readonly items: ListItem[];

  @IsNotEmpty()
  @IsString()
  readonly visibility: 'public' | 'private';

  @IsNotEmpty()
  readonly user: User;
}
