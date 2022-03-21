import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';//Mi modelo de peticion
import { ProjectService } from 'src/app/services/project.service';//Cargar para hacer las peticiones
import { Global } from 'src/app/services/global';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService] //Cargar para hacer las peticiones y subir datos
})
export class DetailComponent implements OnInit {
  public project: Project;
  public url: string;
  public confirm : boolean;

  constructor(
    private _projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute//Esto es para poder recoger los parametros que viene por la url
  ) {
    this.url = Global.url;
    this.project = new Project('','','','','',0,'');
    this.confirm  = false;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {//Esto es para poder recoger los parametros que viene por la url
      let id = params['id'];
      this.getProject(id);
    })
  }

  getProject(id: any) {
    this._projectService.getProject(id).subscribe(
      response => {
        if (response.project) {
          this.project = response.project;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  setConfirm(data: any): void {
    this.confirm = data;
  }
  
  deleteProject(id: any) {
    this._projectService.deleteProject(id).subscribe(
      response => {
        if (response.project) {
          this._router.navigate(['/proyectos']);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}

