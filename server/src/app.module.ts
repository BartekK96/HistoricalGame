import { Module } from '@nestjs/common';
import { AuthorizationModuleDev, AuthorizationModuleProd } from './authorization/AuthorizationModule';
import { CoreModuleDev, CoreModuleProd } from './core/CoreModule';

@Module({
  imports: [
    AuthorizationModuleProd,
    CoreModuleProd,
  ],
  controllers: [],
  providers: [],
})
export class AppModuleProd { }


@Module({
  imports: [
    AuthorizationModuleDev,
    CoreModuleDev,
  ],
  controllers: [],
  providers: [],
})
export class AppModuleDev { }
