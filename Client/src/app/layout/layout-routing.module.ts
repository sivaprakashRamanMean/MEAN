import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
            },
            { path: 'admin-dashboard', loadChildren: () => import('./tables/tables.module').then((m) => m.TablesModule) },
            { path: 'paient-dashboard', loadChildren: () => import('./form/form.module').then((m) => m.FormModule) },
            { path: 'appointment', loadChildren: () => import('./grid/grid.module').then((m) => m.GridModule) },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
