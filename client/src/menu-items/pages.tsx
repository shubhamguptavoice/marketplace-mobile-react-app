// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconBrandChrome, IconKey, IconBug } from '@tabler/icons';

import { NavItemType } from 'types';

// constant
const icons = {
    IconKey,
    IconBug,
    IconBrandChrome
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages: NavItemType = {
    id: 'pages',
    title: <FormattedMessage id="pages" />,
    // caption: <FormattedMessage id="pages-caption" />,
    // icon: icons.IconKey,
    type: 'group',
    children: [
        {
            id: 'Seller-dashboard',
            title: <FormattedMessage id="Seller-dashboard" />,
            type: 'collapse',
            icon: icons.IconBrandChrome
            // children: [
            //     {
            //         id: 'booked-items',
            //         title: <FormattedMessage id="booked-items" />,
            //         type: 'item',
            //         url: '/pages/booked-items',
            //         target: true
            //     },
            //     {
            //         id: 'error',
            //         title: <FormattedMessage id="error-404" />,
            //         type: 'item',
            //         url: '/pages/error',
            //         target: true
            //     },

            //     {
            //         id: 'coming-soon',
            //         title: <FormattedMessage id="coming-soon" />,
            //         type: 'collapse',
            //         children: [
            //             {
            //                 id: 'coming-soon1',
            //                 title: (
            //                     <>
            //                         <FormattedMessage id="coming-soon" /> 01
            //                     </>
            //                 ),
            //                 type: 'item',
            //                 url: '/pages/coming-soon1',
            //                 target: true
            //             },
            //             {
            //                 id: 'coming-soon2',
            //                 title: (
            //                     <>
            //                         <FormattedMessage id="coming-soon" /> 02
            //                     </>
            //                 ),
            //                 type: 'item',
            //                 url: '/pages/coming-soon2',
            //                 target: true
            //             }
            //         ]
            //     },
            //     {
            //         id: 'under-construction',
            //         title: <FormattedMessage id="under-construction" />,
            //         type: 'item',
            //         url: '/pages/under-construction',
            //         target: true
            //     }
            // ]
        }
    ]
};

export default pages;
