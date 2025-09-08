export interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    click?: ()=>void;
    text: string;
    isSubmiting?: boolean;
    icon?:string;
}