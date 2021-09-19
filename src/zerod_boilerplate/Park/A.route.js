import lazyLoad from '@/lazyLoad/lazyLoad';

export default [
  {
    path: '/park',
    component: lazyLoad(() => import('.')),
  },
];
