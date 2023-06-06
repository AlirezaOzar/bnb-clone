// This component check we are in server side rendering or not

'use client';

import { useEffect, useState } from "react";

interface ClientOnlyProps {
    children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({children}) => { 
    const [hasMounted, setHasMounted] = useState(false);
    
    useEffect(() => { // the moment in this component loades that means its finshed server side rendring and it can be mounted
       setHasMounted(true)
    }, []);

    if(!hasMounted){
        return null;
    }

    return ( 
        <>
          {children}
        </>
     );
}
 
export default ClientOnly;