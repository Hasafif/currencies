import { redirect } from "next/navigation";
import Prices from "../components/prices";
//import { getSession } from "../lib/auth";
  
export default  function Page() {
  
  //const session = await getSession();
  //if (!session) {
     // redirect('/auth/login')
    // }
    
  return (
    <>
    <Prices/>
     
    </>
  );
}
