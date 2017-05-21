import { RouterModule } from '@angular/router';

import { PersonListComponent } from './person-list/person-list.component';
import { PersonAddComponent } from './person-add/person-add.component';

export const baseDataRoutes = [
    {
        path: 'person-list',
        component: PersonListComponent
    },
    {
        path: 'person-add',
        component: PersonAddComponent
    }
]
