import { FORM_TYPES, FULLFIELD_MESSAGE, REJECTED_MESSAGE } from '@/constants';
import { Action, State } from '@/types/Contact.interface';
import emailjs from '@emailjs/browser';


const emailService = (form:HTMLFormElement, dispatch: React.Dispatch<Action>) => 
    emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
    )
    .then(
        (response) => {
            console.log(response.status, response.text)
            dispatch({
                type:FORM_TYPES.SET_FULLFIELD, 
                payload: FULLFIELD_MESSAGE as keyof State
            })
            setTimeout(() => {
                dispatch({type:FORM_TYPES.CLEAR_FORM});
            }, 5000);
        },
        (error) => {
            console.log(error)
            dispatch({type:FORM_TYPES.SET_REJECTED, payload: REJECTED_MESSAGE as keyof State})
            setTimeout(() => {
                dispatch({type:FORM_TYPES.CLEAR_FORM});
            }, 3000);
        }
    );

export default emailService