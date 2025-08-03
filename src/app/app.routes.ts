import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/inbox',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'zoom-image',
    loadComponent: () => import('./pages/zoom-image/zoom-image.page').then( m => m.ZoomImagePage)
  },
  {
    path: 'swiperjs',
    loadComponent: () => import('./pages/swiperjs/swiperjs.page').then( m => m.SwiperjsPage)
  },
];
