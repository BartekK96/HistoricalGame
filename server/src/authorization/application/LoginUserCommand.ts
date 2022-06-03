import { IsString } from "class-validator";

export class LoginUserCommand {
    @IsString()
    readonly login!: string;
    @IsString()
    readonly password!: string;
}