import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';//Mi modelo de peticion
import { ProjectService } from 'src/app/services/project.service';//Cargar para hacer las peticiones
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService] //Cargar para hacer las peticiones y subir datos
})
export class EditComponent implements OnInit {

  public title: string = '';
  public project: Project;
  public save_project!: Project;
  public status: string = '';
  public fileToUpload: Array<File> = [];
  public url: string;


  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _route: ActivatedRoute//Esto es para poder recoger los parametros que viene por la url
  ) {
    this.title = 'Editar Project';
    this.project = new Project('', '', '', '', '', 2022, '');
    this.url = Global.url;
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

  onSubmit(form: any) {
    //Guardar los datos
    this._projectService.updateProject(this.project).subscribe(
      response => {
        if (response.project) {
          if (this.fileToUpload.length) {
            this._uploadService.makeFileRequest(Global.url + "upload-image/" + response.project._id, [], this.fileToUpload, 'image')
            .then((result: any) => {
              this.save_project = response.project;
              this.status = 'success';
            });
          } else {
            this.save_project = response.project;
            this.status = 'success';
          }
        } else {
          this.status = 'failed';
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  fileChangeEvent(fileInput: any) {
    this.fileToUpload = <Array<File>>fileInput.target.files;//Lo casteo y luego agarro todos los datos del file
  }

}
