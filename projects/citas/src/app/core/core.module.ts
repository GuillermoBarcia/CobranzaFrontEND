import { NgModule, Optional, SkipSelf } from '@angular/core';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  providers: [
    // // Servicios singleton
    // AuthService,
    // ApiService,

    // // Guards
    // AuthGuard,

    // // Interceptores
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true
    // },
  ]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class CoreModule {
  // Evita que el CoreModule se importe más de una vez
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule ya ha sido cargado. Solo se debe importar en AppModule.');
    }
  }
}