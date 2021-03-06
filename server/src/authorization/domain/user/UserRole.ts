import { Enum } from "../../../kernel/decorators/Enum"

@Enum.decorate()
export class UserRole extends Enum {
    public static readonly USER = new UserRole('USER')
    public static readonly ADMIN = new UserRole('ADMIN')
}