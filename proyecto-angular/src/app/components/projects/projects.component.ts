import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';//Mi modelo de peticion
import { ProjectService } from 'src/app/services/project.service';//Cargar para hacer las peticiones
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService] //Cargar para hacer las peticiones y subir datos
})
export class ProjectsComponent implements OnInit {
  public projects: Project[] | undefined;
  public url: string;

  constructor(
  	private _projectService: ProjectService
  ){
  	this.url = Global.url;
  }

  ngOnInit(): void {
    this.getProject();
  }

  getProject(){
    this._projectService.getProjects().subscribe(
      response => {
        if(response.projects){
          this.projects = response.projects;
        }
    },
      error => {
        console.log(error);
      }
    );
  }
}