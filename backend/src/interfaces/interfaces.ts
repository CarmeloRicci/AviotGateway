export interface Riga {
    type: number;
    text: string;
    ip: string;
}


export interface IResultRequest {
    body?: any;
    error?: any;
    success: boolean;
}