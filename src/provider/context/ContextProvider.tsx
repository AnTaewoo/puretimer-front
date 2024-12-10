import {UserContextProvider} from '@/provider/context/UserContext';
import {LandingContextProvider} from '@/provider/context/LandingContext';
import { DetectContextProvider } from '@/provider/context/DetectContext';

const ContextProvider = (props: any) => {
  return (
    <DetectContextProvider>
      <UserContextProvider>
        <LandingContextProvider>
          {props.children}
        </LandingContextProvider>
      </UserContextProvider>
    </DetectContextProvider>
  )
}

export default ContextProvider