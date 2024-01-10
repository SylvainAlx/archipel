export interface Com  {
    originId: string;
    originName : string;
    title?: string;
    comType: number;
    message?: string;
    createdAt: Date;
}

export const EmptyCom: Com = {
    originId: "",
    originName: "",
    comType: 0,
    createdAt: new Date
}