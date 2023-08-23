import { createContext, useState } from "react";

const FormDataContext = createContext({})

export const FromInfo = ({children}) => {
    const [state, setState] = useState({
        "typeOfProperty":"",
        "zipCode":"",
        "installationPreferences":"",
        "securityFeature":"",
        "systemKind":"",
        "entrances":"",
        "address":"",
        "details":{
            "firstName":"",
            "lastName":"",
            "email":"",
            "phone":""
        },
    })
    return(
    <FormDataContext.Provider value={{state, setState}}>
    {children}
    </FormDataContext.Provider>
    )

}

export default FormDataContext