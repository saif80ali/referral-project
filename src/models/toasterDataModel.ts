import { AlertColor } from "@mui/material";

export interface ToasterDataModel {
    type: AlertColor | undefined,
    message:string,
    time?:number
}