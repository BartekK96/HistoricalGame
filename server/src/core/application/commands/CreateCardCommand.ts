import { IsString } from "class-validator";
import { AuthCommand } from "./AuthCommand";

export class CreateCardCommand extends AuthCommand {
    @IsString()
    readonly description!: string;
    @IsString()
    readonly event!: string;
    @IsString()
    readonly year!: number;
}