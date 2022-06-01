import { ITimeService } from "../../core/domain/ITimeService";
import { DateValue } from "../../kernel/DateValue";

export class TimeService implements ITimeService {
    public now(): DateValue {
        return new DateValue(new Date())
    }
}