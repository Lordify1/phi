import react from 'react'
import FounderDashboard from '../Founder/FounderDashboard';
import InvestorDashboard from '../Investor/InvestorDashboard';
import { authCheck } from '@/components/Tools/Misc';

export default function UserDashboard(user:any){
    authCheck(user)
    return(
            user?.user?.role === 'founder' ? (
                <FounderDashboard user={user?.user}/>
            ) : (
                <InvestorDashboard user={user?.user}/>
            )
    )
}