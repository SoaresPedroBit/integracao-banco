import { Routes } from '@angular/router';
import { UsuarioListComponent } from './components/usuario-list/usuario-list.component';
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';
import { ClienteSaveComponent } from './components/cliente-save/cliente-save.component';
import { ClienteEditarComponent } from './components/cliente-editar/cliente-editar.component';

export const routes: Routes = [
    {path:"usuarios", component: UsuarioListComponent},
    {path:"clientes", component:ClienteListComponent},
    {path:"salvarCliente",component:ClienteSaveComponent},
    {path:"editarCliente/:id",component:ClienteEditarComponent}
];
