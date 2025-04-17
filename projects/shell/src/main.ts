import { initFederation } from '@angular-architects/native-federation';
import { remoteEndpoints } from '../../../remote.config';

initFederation(remoteEndpoints )
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap'))
  .catch(err => console.error(err));
