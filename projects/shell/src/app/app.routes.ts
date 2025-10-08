import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { initialDataResolver } from './app.resolvers';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthGuard } from './guards/auth.guard';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
  { 
    path: 'login', 
    component: SignInComponent 
    }, // Login sin layout
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
        resolve: {
          initialData: initialDataResolver,
        },
      },
      {
        path: 'cobranzas',
        canActivate: [AuthGuard], // Protección adicional para las rutas de cobranzas
        loadChildren: () =>
          loadRemoteModule({
            remoteName: 'cobranzas',
            exposedModule: './Module',
          }).then((m) => m.AppModule),
      }
    ]
  }
  // ,
  // { path: '**', redirectTo: 'login' }
];