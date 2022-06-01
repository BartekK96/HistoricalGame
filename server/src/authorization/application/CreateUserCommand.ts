import { IsString } from "class-validator";

export class CreateUserCommand {
    @IsString()
    readonly login!: string;
    @IsString()
    readonly password!: string;
}