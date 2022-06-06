import { IsString } from "class-validator";

export class AuthCommand {
    @IsString()
    readonly authToken!: string;
}