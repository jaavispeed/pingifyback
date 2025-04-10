import { IsInt, IsOptional, IsString } from "class-validator";


export class aiDto{
    @IsString()
    readonly prompt: string;

    @IsInt()
    @IsOptional()
    readonly maxTokens?: number;
}