export abstract class BaseException
{
    constructor(private message: string)
    {

    }

    getMessage(): string 
    {
        return this.message;
    }
}