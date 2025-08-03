# zoom-image-ionic-angular
This app has been made in Angular 19 and Ionic 8, **completely standalone**.
I needed to implement an image-zooming functionality for a project of mine, compatible both with web and mobile devices: so I made some research.
And boy it was frustrating...

I came up with three different solutions, each implementing a different library/toolkit.

## @zoom-image/angular
Only recently showed up on [NPM](https://www.npmjs.com/package/@zoom-image/angular), no info or documentation whatsoever a part from a compelte demo on [Stackblitz](https://stackblitz.com/edit/willnguyen1312-zoom-image-x7vadc?file=package.json) , but it works.

Some functionalities are specifically made for the web, but the main one (zooming using the wheel of the mouse) supports pinch-zooming on mobile so it does everything I needed.

Yoou just need to install the packages and follow the code on the demo:

    npm i @zoom-image/angular @zoom-image/core

## swiper.js
This is the library that I first used, for the same reason, in another project with Ionic 6. It worked pretty well for mobile (not so great on web) and it was the one suggested by [Ionic official docs](https://ionicframework.com/docs/angular/slides), so I hoped for the same result in this project...but it did not came out as expected:

You can make it work on web, but on mobile the pinch-to-zoom does not work anymore and I still haven't figured out why (nor found any mention about it in forums or issues).

## hammer.js
This was harder to implement. Had to rely a lot on differents posts and articles and made a collage to come out with a working implementation. 
The first tricky part is the installation:

    npm i hammerjs
    npm i --save-dev  @types/hammerjs
    
Then the import in the *main.ts* file of the project:

    import { routes } from './app/app.routes';
    import { AppComponent } from './app/app.component';
    import { importProvidersFrom } from '@angular/core';
    import 'hammerjs';

    bootstrapApplication(AppComponent, {
      providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        provideIonicAngular(),
        provideRouter(routes, withPreloading(PreloadAllModules)),
        importProvidersFrom(HammerModule)
      ],
    });

the main logic (with the interception of all the gestures events) is in the *zoom-pan.directive*


