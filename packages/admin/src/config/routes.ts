export interface Route {
  title: string
  path: string
  pages?: Route[]
}

export const userRoutes: Route = {
  title: 'Users',
  path: '/admin/users',
  pages: [
    {
      title: 'Users Overview',
      path: '/admin/users',
    },
    {
      title: 'Users List',
      path: '/admin/users/list',
    },
    {
      title: 'Add User',
      path: '/admin/users/new',
    },
  ],
}

export const profileRoutes: Route = {
  title: 'Profile',
  path: '/admin/profile',
  pages: [
    {
      title: 'Profile',
      path: '/admin/profile',
    },
    {
      title: 'Settings',
      path: '/admin/profile/settings',
    },
    {
      title: 'Feed',
      path: '/admin/profile/feed',
    },
  ],
}
