import { stringSchema } from 'yup';
declare module 'yup' {
    class StringSchema {
        firstLetterUppercase(): this;
    }
}