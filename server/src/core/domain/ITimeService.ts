import { DateValue } from "../../kernel/DateValue";

export abstract class ITimeService {
    abstract now(): DateValue;
    
    abstract nullValue(): DateValue;
}