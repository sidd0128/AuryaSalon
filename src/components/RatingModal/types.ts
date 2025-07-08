import { AlertVariant } from "../CustomAlert/types";


  
  export interface AlertInfo  {
    variant: AlertVariant;
    title: string;
    message: string;
    onConfirm?: () => void;
  };