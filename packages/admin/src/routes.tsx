import { Icon } from '@chakra-ui/react'
import { MdDashboard, MdHome, MdLock, MdOutlineShoppingCart } from 'react-icons/md'

// Auth Imports
import { IRoute } from 'types/navigation'

const routes: IRoute[] = [
  {
    name: 'Admin',
    path: '/admin',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    collapse: true,
    items: [
      {
        name: 'Main Dashboard',
        layout: '/admin',
        path: '/',
      },
      {
        name: 'Users',
        path: '/users',
        collapse: true,
        items: [
          {
            name: 'Users Overview',
            layout: '/admin',
            path: '/users',
            secondary: true,
          },
          {
            name: 'Users List',
            layout: '/admin',
            path: '/users/list',
            secondary: true,
          },
          {
            name: 'Users Add',
            layout: '/admin',
            path: '/users/new',
            secondary: true,
          },
        ],
      },
      {
        name: 'Profile',
        path: '/profile',
        collapse: true,
        items: [
          {
            name: 'Profile Overview',
            layout: '/admin',
            path: '/profile',
            secondary: true,
          },
          {
            name: 'Profile Settings',
            layout: '/admin',
            path: '/profile/settings',
            secondary: true,
          },
          {
            name: 'News Feed',
            layout: '/admin',
            path: '/profile/newsfeed',
            secondary: true,
          },
        ],
      },
    ],
  },
  {
    name: 'Dashboards',
    path: '/',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    collapse: true,
    items: [
      {
        name: 'Main Dashboard',
        layout: '/admin',
        path: '/dashboards/default',
      },
      {
        name: 'Car Interface',
        layout: '/admin',
        path: '/dashboards/car-interface',
      },
      {
        name: 'Smart Home',
        layout: '/admin',
        path: '/dashboards/smart-home',
      },
      {
        name: 'RTL',
        layout: '/rtl',
        path: '/dashboards/rtl',
      },
    ],
  },
  // // --- NFTs ---
  {
    name: 'NFTs',
    path: '/nfts',
    icon: <Icon as={MdOutlineShoppingCart} width="20px" height="20px" color="inherit" />,
    collapse: true,
    items: [
      {
        name: 'Marketplace',
        layout: '/admin',
        path: '/nfts/marketplace',
        secondary: true,
      },
      {
        name: 'Collection',
        layout: '/admin',
        path: '/nfts/collection',
        secondary: true,
      },
      {
        name: 'NFT Page',
        layout: '/admin',
        path: '/nfts/page',
        secondary: true,
      },
      {
        name: 'Profile',
        layout: '/admin',
        path: '/nfts/profile',
        secondary: true,
      },
    ],
  },
  // // --- Main pages ---
  {
    name: 'Main Pages',
    path: '/main',
    icon: <Icon as={MdDashboard} width="20px" height="20px" color="inherit" />,
    collapse: true,
    items: [
      {
        name: 'Account',
        path: '/main/account',
        collapse: true,
        items: [
          {
            name: 'Billing',
            layout: '/admin',
            path: '/main/account/billing',
          },
          {
            name: 'Application',
            layout: '/admin',
            path: '/main/account/application',
          },
          {
            name: 'Invoice',
            layout: '/admin',
            path: '/main/account/invoice',
          },
          {
            name: 'Settings',
            layout: '/admin',
            path: '/main/account/settings',
          },
          {
            name: 'All Courses',
            layout: '/admin',
            path: '/main/account/all-courses',
          },
          {
            name: 'Course Page',
            layout: '/admin',
            path: '/main/account/course-page',
          },
        ],
      },
      {
        name: 'Ecommerce',
        path: '/main/users',
        collapse: true,
        items: [
          {
            name: 'New Product',
            layout: '/admin',
            path: '/main/ecommerce/new-product',
          },
          {
            name: 'Product Settings',
            layout: '/admin',
            path: '/main/ecommerce/settings',
          },
          {
            name: 'Product Page',
            layout: '/admin',
            path: '/main/ecommerce/page-example',
          },
          {
            name: 'Order List',
            layout: '/admin',
            path: '/main/ecommerce/order-list',
          },
          {
            name: 'Order Details',
            layout: '/admin',
            path: '/main/ecommerce/order-details',
          },
          {
            name: 'Referrals',
            layout: '/admin',
            path: '/main/ecommerce/referrals',
          },
        ],
      },
      {
        name: 'Applications',
        path: '/main/applications',
        collapse: true,
        items: [
          {
            name: 'Data Tables',
            layout: '/admin',
            path: '/main/applications/data-tables',
          },
          {
            name: 'Calendar',
            layout: '/admin',
            path: '/main/applications/calendar',
          },
        ],
      },

      {
        name: 'Others',
        path: '/main/others',
        collapse: true,
        items: [
          {
            name: 'Notifications',
            layout: '/admin',
            path: '/main/others/notifications',
          },
          {
            name: '404',
            layout: '/admin',
            path: '/main/others/404',
          },
          {
            name: 'Messages',
            layout: '/admin',
            path: '/main/others/messages',
          },
        ],
      },
    ],
  },
]

export default routes
