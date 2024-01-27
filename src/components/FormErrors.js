import { capitalizeFirstLetter } from "./dashboard/utils/cn";

const FormErrors = props => {
    const { errors= [], forField } = props;

    let filteredErrors = errors;

    if(forField){
        filteredErrors = errors.filter(
            err => err.field === forField
        )
    }

    return(
        <ul className="text-red-500">
            {
                filteredErrors.map((error, i) => {
                    return <li key={i}>{capitalizeFirstLetter(error.field.replace("_", " "))} {error.message}</li>
                })
            }
        </ul>
    )
}

export default FormErrors;


