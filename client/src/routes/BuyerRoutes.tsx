import { lazy } from 'react';
import { useParams } from 'react-router-dom';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { useSelector } from 'react-redux';

// seller page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const ListedProducts = Loadable(lazy(() => import('views/pages/seller-pages/listed-products')));
const ListedItems = Loadable(lazy(() => import('views/pages/seller-pages/booked-items')));
const AddProducts = Loadable(lazy(() => import('views/pages/seller-pages/add-product')));
const ProductsRatings = Loadable(lazy(() => import('views/pages/seller-pages/products-ratings')));

// buyer page routing
const BuyProducts = Loadable(lazy(() => import('views/pages/buyer-pages/products')));
const BuyNow = Loadable(lazy(() => import('views/pages/buyer-pages/buy-now')));
const StripePay = Loadable(lazy(() => import('views/pages/buyer-pages/stripe-pay')));
const RatingReviews = Loadable(lazy(() => import('views/pages/buyer-pages/ratings-reviews')));

// ==============================|| MAIN ROUTING ||============================== //

const BuyerRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),

    children: [
        // ============== || SELLER ROUTING || ===============//

        // {
        //     path: '/',
        //     element: <ListedProducts />
        // },
        // {
        //     path: '/sample-page',
        //     element: <SamplePage />
        // },
        // {
        //     path: '/listed-products',
        //     element: <ListedProducts />
        // },
        // {
        //     path: '/listed-products',
        //     element: <ListedItems />
        // },
        // {
        //     path: '/product-ratings',
        //     element: <ProductsRatings />
        // },
        // {
        //     path: '/add-products',
        //     element: <AddProducts />
        // },

        // ============== || BUYER ROUTING || ===============//
        {
            path: '/buy-products',
            element: <BuyProducts />
        },
        {
            path: '/product-sammary-page',
            element: <BuyNow />
        },
        {
            path: '/stripe-pay',
            element: <StripePay />
        },
        {
            path: '/ratings-reviews',
            element: <RatingReviews />
        }
    ]
};

export default BuyerRoutes;
