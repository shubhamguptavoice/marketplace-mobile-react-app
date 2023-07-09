import { lazy } from 'react';

// project imports
import GuestGuard from 'utils/route-guard/GuestGuard';
import MinimalLayout from 'layout/MinimalLayout';
import NavMotion from 'layout/NavMotion';
import Loadable from 'ui-component/Loadable';

// login routing
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/Login3')));
const AuthRegister = Loadable(lazy(() => import('views/pages/authentication/Register3')));
const AuthForgotPassword = Loadable(lazy(() => import('views/pages/authentication/ForgotPassword3')));
const Roles = Loadable(lazy(() => import('views/pages/roles')));
const MoreInfo = Loadable(lazy(() => import('views/pages/more-info')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: (
        <NavMotion>
            <GuestGuard>
                <MinimalLayout />
            </GuestGuard>
        </NavMotion>
    ),
    children: [
        {
            path: '/',
            element: <AuthLogin />
        },
        {
            path: '/login',
            element: <AuthLogin />
        },
        {
            path: '/register/:roleId',
            element: <AuthRegister />
        },
        {
            path: '/forgot',
            element: <AuthForgotPassword />
        },

        {
            path: '/roles',
            element: <Roles />
        },
        {
            path: '/google/moreinfo/:id',
            element: <MoreInfo />
        }

        //========================|| LOGIN ROUTING  ||==========================//
    ]
};

export default LoginRoutes;
