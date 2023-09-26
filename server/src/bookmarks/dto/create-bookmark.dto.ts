import { User } from 'src/auth/schemas/user.schema';
import { List } from 'src/list/schema/list.schema';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateBookmarkDto {
    @IsNotEmpty()
    readonly user: User;
    
    @IsNotEmpty()
    readonly list: List;
}
