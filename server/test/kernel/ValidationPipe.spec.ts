import { ArgumentMetadata } from "@nestjs/common";
import { IsNumber, IsString } from "class-validator";
import { strict as assert } from 'node:assert';
import { ValidationPipe } from "../../src/kernel/ValidationPipe";

describe('ValidationPipe', async () => {

    it('ValidationPipe returns error message', async () => {
        class DTO {
            @IsString()
            readonly login!: string;
            @IsNumber()
            readonly age!: number;
        }
        let target: ValidationPipe = new ValidationPipe();
        const metadata: ArgumentMetadata = {
            type: 'body',
            metatype: DTO,
            data: ''
        };
        await assert.rejects(
            async () => {
                await target.transform(<DTO>{
                    login: "test",
                }, metadata)
            },
            {
                name: 'HttpException',
                message: 'Validation failed: age must be a number conforming to the specified constraints',
            }
        )


    })
})