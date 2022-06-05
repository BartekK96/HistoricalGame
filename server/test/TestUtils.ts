import { Test, TestingModule } from "@nestjs/testing";
import { AppModuleDev, AppModuleProd } from "../src/app.module";
import { AccessKeyService } from "../src/authorization/domain/accessKey/AccessKeyService";
import { IAccessKeyRepository } from "../src/authorization/domain/accessKey/IAccessKeyRepository";
import { AdminGuard } from "../src/authorization/domain/guards/AdminGuard";
import { UserGuard } from "../src/authorization/domain/guards/UserGuard";
import { IUserRepository } from "../src/authorization/domain/user/IUserRepository";
import { UserService } from "../src/authorization/domain/user/UserService";
import { ITimeService } from "../src/core/domain/ITimeService";

interface ITestingContainer {
    userRepository: IUserRepository;
    accessKeyRepository: IAccessKeyRepository;
    userService: UserService;
    accessKeyService: AccessKeyService;
    userGuard: UserGuard;
    adminGuard: AdminGuard;
    timeService: ITimeService;
}

export class TesUtils {
    /**
     * 
     * @deprecated 
     */

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

    public static async createCustomContainer(): Promise<ITestingContainer> {
        let testingModule: TestingModule;

        if (process.env.NODE_ENV === 'testing') {
            testingModule = await Test.createTestingModule({
                imports: [AppModuleDev],
            }).compile();
        }
        testingModule = await Test.createTestingModule({
            imports: [AppModuleProd],
        }).compile();


        return {
            accessKeyRepository: testingModule.get(IAccessKeyRepository),
            accessKeyService: testingModule.get(AccessKeyService),
            adminGuard: testingModule.get(AdminGuard),
            timeService: testingModule.get(ITimeService),
            userGuard: testingModule.get(UserGuard),
            userRepository: testingModule.get(IUserRepository),
            userService: testingModule.get(UserService)
        }
    }
}