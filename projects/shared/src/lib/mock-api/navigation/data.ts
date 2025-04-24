/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
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
                        link: '#',
                    },
                    {
                        id: 'pages.authentication.sign-in.modern',
                        title: 'Citas Pendientes',
                        type: 'basic',
                        link: '#',
                    },
                    {
                        id: 'pages.authentication.sign-in.modern-reversed',
                        title: 'Citas Canceladas SAP',
                        type: 'basic',
                        link: '#',
                    },
                    {
                        id: 'pages.authentication.sign-in.split-screen',
                        title: 'Citas Canceladas',
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
                                title: 'Citas Canceladas',
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
