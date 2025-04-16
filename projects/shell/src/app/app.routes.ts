import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { initialDataResolver } from './app.resolvers';

export const routes: Routes = [
    {
        path: '',
        resolve: {
            initialData: initialDataResolver
        },
        component: HomeComponent,
    },

];
