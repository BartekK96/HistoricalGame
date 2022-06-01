import { Enum } from "../../kernel/Enum";

@Enum.decorate()
export class UserRole extends Enum {
    public static readonly USER = 'USER'
}