import { Test, TestingModule } from "@nestjs/testing";
import { AppModuleDev, AppModuleProd } from "../src/app.module";

export class TesUtils {
    public static async createTestingContainer(
    ): Promise<TestingModule> {
        if (process.env.NODE_ENV === 'testing') {
            return await Test.createTestingModule({
                imports: [AppModuleDev],
            }).compile();
        }
        return await Test.createTestingModule({
            imports: [AppModuleProd],
        }).compile();
    }
}