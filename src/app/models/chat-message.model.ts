export class ChatMessage {
    $key?: string;
    email?: string;
    userName?:string;
    message?:any;
    timeSent?: Date = new Date();
    liked: boolean = false;
}