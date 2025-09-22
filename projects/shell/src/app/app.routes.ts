import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { initialDataResolver } from './app.resolvers';
import { loadRemoteModule } from '@angular-architects/native-federation';

export const routes: Routes = [


    {
        pathMatch: 'full',
        path: '',
        resolve: {
            initialData: initialDataResolver
        },
        component: HomeComponent,
    },
    {
        path: 'citas',
        loadChildren: () =>
            loadRemoteModule({
              remoteName: 'citas',
              exposedModule: './Module',
            }).then((m) => m.AppModule),
    },
];
