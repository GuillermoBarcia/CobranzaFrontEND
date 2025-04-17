import { inject, Injectable } from '@angular/core';
import { NavigationMockApi } from './navigation/api';

@Injectable({ providedIn: 'root' })
export class MockApiService {
    navigationMockApi = inject(NavigationMockApi);
}
