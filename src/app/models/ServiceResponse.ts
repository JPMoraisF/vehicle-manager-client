export class ServiceResponse<T> {
    hasErrors: boolean;
    errorList: string[];
    data: T | null = null;
}