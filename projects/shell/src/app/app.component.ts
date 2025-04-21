import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FuseLoadingBarComponent } from '@fuse/components/loading-bar';
import { FuseNavigationItem, FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { Subject, takeUntil } from 'rxjs';
// import { NavigationService } from '../../../theme/src/app/core/navigation/navigation.service';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { NotificationsComponent } from './features/notification/notifications.component';
import { Navigation } from './core/navigation/navigation.types';
import { NavigationService } from './core/navigation/navigation.service';
import { UserComponent } from './features/user/user.component';
// import { Navigation } from '../../../theme/src/app/core/navigation/navigation.types';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  imports: [ FuseLoadingBarComponent,
    FuseVerticalNavigationComponent,
    MatButtonModule,
    MatIconModule,
    NotificationsComponent,
    UserComponent,
    RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
    isScreenSmall?: boolean;
    navigation?: Navigation;
    defaultNavigation?: FuseNavigationItem[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _navigationService: NavigationService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {


        this.defaultNavigation = [
            {
                id: 'pages.authentication',
                title: 'Logística',
                type: 'collapsable',
                icon: 'heroicons_outline:truck',
                children: [
                    {
                        id: 'pages.authentication.sign-in',
                        title: 'Citas',
                        type: 'collapsable',
                        children: [
                            {
                                id: 'pages.authentication.sign-in.classic',
                                title: 'Nueva Cita',
                                type: 'basic',
                                link: './citas/',
                            },
                            {
                                id: 'pages.authentication.sign-in.modern',
                                title: 'Citas Pendientes',
                                type: 'basic',
                                link: '#',
                            },
                            {
                                id: 'pages.authentication.sign-in.modern-reversed',
                                title: 'Citas Rechazadas SAP',
                                type: 'basic',
                                link: '#',
                            },
                            {
                                id: 'pages.authentication.sign-in.split-screen',
                                title: 'Citas Rechazadas',
                                type: 'basic',
                                link: '#',
                            },
                            {
                                id: 'pages.authentication.sign-in.split-screen-reversed',
                                title: 'Proveedor',
                                type: 'basic',
                                link: '#',
                            },
                            {
                                id: 'pages.authentication.sign-in.fullscreen',
                                title: 'Bodega',
                                type: 'basic',
                                link: '#',
                            },
                            {
                                id: 'pages.authentication.sign-in.fullscreen-reversed',
                                title: 'Reporte',
                                type: 'collapsable',
                                children: [
                                    {
                                        id: 'pages.authentication.sign-in.classic',
                                        title: 'Diario',
                                        type: 'basic',
                                        link: '#',
                                    },{
                                        id: 'pages.authentication.sign-in.classic',
                                        title: 'Citas Rechazadas',
                                        type: 'basic',
                                        link: '#',
                                    },{
                                        id: 'pages.authentication.sign-in.classic',
                                        title: 'citas a futuro',
                                        type: 'basic',
                                        link: '#',
                                    },
                                ],
                            },
                            {
                                id: 'pages.authentication.sign-in.fullscreen-reversedx',
                                title: 'Recepcion',
                                type: 'basic',
                                link: '-reversed',
                            },
                        ],
                    }]}
        ];




        // Subscribe to navigation data
        this._navigationService.navigation$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((navigation: Navigation) => {
                console.log(navigation);
                this.navigation = navigation;
            });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void {
        // Get the navigation
        const navigation =
            this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(
                name
            );

        if (navigation) {
            // Toggle the opened status
            navigation.toggle();
        }
    }
}
