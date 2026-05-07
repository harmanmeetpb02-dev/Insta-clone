import {browserHistory} from 'react-router';
import login from './features/auth/pages/login';
import register from './features/auth/pages/register';
import { path } from '../../backend/src/app';





function AppRoutes() {

    return (
        <BrowserRouter >
            <Routes>
<Route path='/login' element={<login/>} />
<Route path='/register' element={<register/>} />
                </Routes>
        </BrowserRouter>
    )
}


export default AppRoutes;