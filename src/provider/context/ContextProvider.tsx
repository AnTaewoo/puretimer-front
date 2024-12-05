import {UserContextProvider} from '@/provider/context/UserContext';
import {LandingContextProvider} from '@/provider/context/LandingContext';

const ContextProvider = (props: any) => {
  return (
    <UserContextProvider>
      <LandingContextProvider>
        {props.children}
      </LandingContextProvider>
    </UserContextProvider>
  )
}

export default ContextProvider