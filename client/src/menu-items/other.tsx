// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconBrandChrome, IconHelp, IconSitemap } from '@tabler/icons';

import { NavItemType } from 'types';

// constant
const icons = {
    IconBrandChrome,
    IconHelp,
    IconSitemap
};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other: NavItemType = {
    id: 'sample-docs-roadmap',
    icon: IconBrandChrome,
    type: 'group',
    children: [
        // {
        //     id: 'sample-page',
        //     title: <FormattedMessage id="sample-page" />,
        //     type: 'item',
        //     url: '/sample-page',
        //     icon: icons.IconBrandChrome,
        //     breadcrumbs: false
        // },
        {
            id: 'listed-products',
            title: <FormattedMessage id="listed-products" />,
            type: 'item',
            url: '/listed-products',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        },
        // {
        //     id: 'listed-products',
        //     title: <FormattedMessage id="listed-products" />,
        //     type: 'item',
        //     url: '/listed-products',
        //     icon: icons.IconBrandChrome,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'product-ratings',
        //     title: <FormattedMessage id="product-ratings" />,
        //     type: 'item',
        //     url: '/product-ratings',
        //     icon: icons.IconBrandChrome,
        //     breadcrumbs: false
        // },
        {
            id: 'add-products',
            title: <FormattedMessage id="add-products" />,
            type: 'item',
            url: '/add-products',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        },
        {
            id: 'buy-products',
            title: <FormattedMessage id="buy-products" />,
            type: 'item',
            url: '/buy-products',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        }
        // {
        //     id: 'documentation',
        //     title: <FormattedMessage id="documentation" />,
        //     type: 'item',
        //     url: 'https://codedthemes.gitbook.io/berry/',
        //     icon: icons.IconHelp,
        //     external: true,
        //     target: true
        // },
        // {
        //     id: 'roadmap',
        //     title: <FormattedMessage id="roadmap" />,
        //     type: 'item',
        //     url: 'https://codedthemes.gitbook.io/berry/roadmap',
        //     icon: icons.IconSitemap,
        //     external: true,
        //     target: true
        // }
    ]
};

export default other;
