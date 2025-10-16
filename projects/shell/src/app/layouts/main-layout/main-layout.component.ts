import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FuseLoadingBarComponent } from '@fuse/components/loading-bar';
import {
    FuseNavigationItem,
    FuseNavigationService,
    FuseVerticalNavigationComponent,
} from '@fuse/components/navigation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { filter, finalize, Subject, takeUntil } from 'rxjs';
import { NavigationService } from '../../core/navigation/navigation.service';
import { Navigation } from '../../core/navigation/navigation.types';
import { NotificationsComponent } from '../../features/notification/notifications.component';
import { UserComponent } from '../../features/user/user.component';
import { AuthService } from 'shared';


// 
@Component({
    selector: 'app-root-main',
    encapsulation: ViewEncapsulation.None,
    imports: [
        CommonModule,
        FuseLoadingBarComponent,
        FuseVerticalNavigationComponent,
        MatButtonModule,
        MatIconModule,
        NotificationsComponent,
        UserComponent,
        RouterOutlet,
        MatFormFieldModule,
        MatSelectModule
    ],
    templateUrl: './main-layout.component.html',
    styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent implements AfterViewInit {
    societyOptions: { value: string; label: string }[] = [];
    selectedSociety: string | null = null;

    isScreenSmall?: boolean;
    navigation?: Navigation;
    defaultNavigation?: FuseNavigationItem[];
    private _unsubscribeAll: Subject<void> = new Subject<void>();
    userName!: string;
    email!: string;
    isLoadingSocieties = true;
    /**
     * Constructor
     */

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _navigationService: NavigationService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService,
        private dialog: MatDialog,
        private authService: AuthService // Inyecta AuthService
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
        title: 'Módulo Cobranza',
        type: 'collapsable',
        icon: 'heroicons_outline:credit-card',
        children: [
          {
            id: 'pages.authentication.sign-in',
            title: 'Cobranza',
            type: 'collapsable',
            children: [
             {
                id: 'pages.authentication.sign-in.modern-reversed',
                title: 'Prestamo Maestro',
                type: 'basic',
                link: './cobranzas/prestamo-maestro',
              },
              {
                id: 'pages.authentication.sign-in.modern-reversed',
                title: 'Lista Prestamo Maestro',
                type: 'basic',
                link: './cobranzas/listar-prestamos-maestro',
              },
                {
                id: 'pages.authentication.sign-in.modern-reversed',
                title: 'Judicial',
                type: 'basic',
                link: './cobranzas/prestamo-demanda-judicial-form',
              },
              {
                id: 'pages.authentication.sign-in.modern-reversed',
                title: 'Prestamos Judiciales',
                type: 'basic',
                link: './cobranzas/prestamos-judiciales',
              },
              {
                id: 'pages.authentication.sign-in.modern-reversed',
                title: 'Solicitud Debito Cuenta',
                type: 'basic',
                link: './cobranzas/aprobar-solicitud-debito-cuenta',
              },
              {
                id: 'pages.authentication.sign-in.fullscreen-reversed',
                title: 'Reporte',
                type: 'collapsable',
                children: [
                  {
                    id: 'pages.authentication.sign-in.classic',
                    title: 'Cobranza Diario',
                    type: 'basic',
                    link: '#',
                  },
                  {
                    id: 'pages.authentication.sign-in.classic',
                    title: 'Cobranza 2',
                    type: 'basic',
                    link: '#',
                  },
                  {
                    id: 'pages.authentication.sign-in.classic',
                    title: 'Cobranza 3',
                    type: 'basic',
                    link: '#',
                  },
                ],
              },
              {
                id: 'pages.authentication.sign-in.fullscreen-reversed',
                title: 'Administración',
                type: 'collapsable',
                children: [
                  {
                    id: 'pages.authentication.sign-in.classic',
                    title: 'Abogado',
                    type: 'basic',
                    link: '#',
                  },
                  {
                    id: 'pages.authentication.sign-in.classic',
                    title: 'Usuarios',
                    type: 'basic',
                    link: '#',
                  },
                  {
                    id: 'pages.authentication.sign-in.classic',
                    title: 'Satje',
                    type: 'basic',
                    link: '#',
                  },
                ],
              },
            ],
          }
        ]
      }
    ];

    this._navigationService.navigation$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((navigation: Navigation) => {
        console.log(navigation);
        this.navigation = navigation;
      });

    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {
        this.isScreenSmall = !matchingAliases.includes('md');
      });
  }
    /**
     * On destroy
     */
   ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

    ngAfterViewInit(): void {
        // Si quieres forzar el modal después de renderizar la vista
    }

    onSocietyChange(event: MatSelectChange): void {
        const selectedOption = this.societyOptions.find(opt => opt.value === event.value);
        if (selectedOption) {
            // Update the selected society value
            this.selectedSociety = selectedOption.value;
        }
    }

    // Update openSocietyDialog to use societyOptions
    openSocietyDialog(): void {
        // const dialogRef = this.dialog.open(SocietySelectDialogComponent, {
        //     disableClose: true,
        //     data: { options: this.societyOptions }, // Changed from this.options
        //     width: '35vw',
        // });

        // dialogRef.afterClosed().subscribe((result) => {
        //     if (result) {
        //         this.selectedSociety = result; // Changed from selectedOption
        //     } else {
        //         this.openSocietyDialog();
        //     }
        // });
    }
    /**
     * Get the society label from the storage service
     * @returns {string} The label of the society
     */
    getSocietyLabel(): string {
        return  '';
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

    navigateToRoot(): void {
        this._router.navigate(['/']);
    }


    /**
     * Handle authenticated user scenario
     */


    /**
  
     * Load societies and handle different scenarios
     */
    private loadSocieties(): void {
        
    }

    /**
     * Handle societies response
     */
   

    /**
     * Validate societies response
     */
    

    /**
     * Process societies data
     */
    
    /**
     * Map menu data to FuseNavigationItem array
     */
    private mapMenuDataToNavigation(menuData: unknown[]): FuseNavigationItem[] {
        return menuData.map((item: unknown) => {
            const menuItem = item as Record<string, unknown>;
            return {
                id: this.safeStringValue(menuItem['id']),
                title: this.safeStringValue(menuItem['title']),
                type: this.mapMenuType(
                    this.safeStringValue(menuItem['type']) ?? 'basic'
                ),
                icon: this.safeStringValue(menuItem['icon']),
                link: this.safeStringValue(menuItem['link']),
                children: Array.isArray(menuItem['children'])
                    ? this.mapMenuDataToNavigation(menuItem['children'])
                    : undefined,
            } as FuseNavigationItem;
        });
    }

    /**
     * Safely convert unknown value to string
     */
    private safeStringValue(value: unknown): string | undefined {
        if (value === null || value === undefined) {
            return undefined;
        }
        if (typeof value === 'string') {
            return value;
        }
        if (typeof value === 'number' || typeof value === 'boolean') {
            return String(value);
        }
        return undefined; // Don't convert objects to string
    }

    /**
     * Map menu type from MenuResponse to allowed FuseNavigationItem type
     */
    private mapMenuType(
        type: string
    ): 'aside' | 'basic' | 'collapsable' | 'divider' | 'group' | 'spacer' {
        const allowedTypes = [
            'aside',
            'basic',
            'collapsable',
            'divider',
            'group',
            'spacer',
        ];
        return allowedTypes.includes(type)
            ? (type as
                  | 'aside'
                  | 'basic'
                  | 'collapsable'
                  | 'divider'
                  | 'group'
                  | 'spacer')
            : 'basic';
    }

    /**
     * Handle security menu success
     */
    private handleSecurityMenuSuccess(menu: {
        data: FuseNavigationItem[];
    }): void {
        this.setDefaultNavigation(menu.data);
    }

    /**
     * Set the default navigation items
     */
    private setDefaultNavigation(navigationData: FuseNavigationItem[]): void {
        this.defaultNavigation = navigationData;
    }

    /**
     * Configure permission menu with navigation data
     */
    private configurePermissionMenu(navigationData: unknown[]): void {
        // this.permissionService.setMenu(navigationData as never);
    }

    /**
     * Handle security menu error
     */
    private handleSecurityMenuError(error: Error): void {
        console.error('Error al cargar el menú de seguridad:', error);
        this.defaultNavigation = [];
    }

            // Método para desloguear
        logout(): void {
            this.authService.logout();
        }
}
