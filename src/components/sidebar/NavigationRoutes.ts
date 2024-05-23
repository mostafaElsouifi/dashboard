export interface INavigationRoute {
  name: string
  displayName: string
  meta: { icon: string }
  children?: INavigationRoute[]
}

export default {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
  },
  routes: [
    {
      name: 'dashboard',
      displayName: 'dashboard',
      meta: {
        icon: 'vuestic-iconset-dashboard',
      },
    },
    {
      name: 'history',
      displayName: 'History',
      meta: {
        icon: 'history',
      },
    },
    {
      name: 'users',
      displayName: 'Users',
      meta: {
        icon: 'group',
      },
    },
    {
      name: 'chat',
      displayName: 'Chat with Admin',
      meta: {
        icon: 'chat',
      },
    },

    // {
    //   name: 'auth',
    //   displayName: 'auth',
    //   meta: {
    //     icon: 'login',
    //   },
    //   children: [
    //     {
    //       name: 'login',
    //       displayName: 'login',
    //     },
    //     {
    //       name: 'signup',
    //       displayName: 'signup',
    //     },
    //     {
    //       name: 'recover-password',
    //       displayName: 'recover-password',
    //     },
    //   ],
    // },

    // {
    //   name: '404',
    //   displayName: '404',
    //   meta: {
    //     icon: 'vuestic-iconset-files',
    //   },
    // },

    {
      name: 'settings',
      displayName: 'settings',
      meta: {
        icon: 'settings',
      },
    },
  ] as INavigationRoute[],
}
