// Importar modulos del router de angular
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importar componentes
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateComponent } from './components/create/create.component';
import { ContactComponent } from './components/contact/contact.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component'
// Array de rutas
const appRoutes: Routes = [
	{path: '', component: AboutComponent},
	{path: 'home', component: AboutComponent},
	{path: 'sobre-mi', component: AboutComponent},
	{path: 'proyectos', component: ProjectsComponent},
	{path: 'crear-proyecto', component: CreateComponent},
	{path: 'proyecto/:id', component: DetailComponent},//Cosas por parametros
	{path: 'contacto', component: ContactComponent},
	//{path: 'contacto', component: ContactoComponent},
	{path: 'editar-proyecto/:id', component: EditComponent},
	{path: '**', component: AboutComponent}//Error 404, SIEMPRE tiene que estar
];

// Exportar el modulo del router
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);