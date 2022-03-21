import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';//Mi modelo de peticion
import { ProjectService } from 'src/app/services/project.service';//Cargar para hacer las peticiones
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService,UploadService] //Cargar para hacer las peticiones y subir datos
})
export class CreateComponent implements OnInit {

  public title: string = '';
  public project: Project;
  public save_project!: Project;
  public status : string = '';
  public fileToUpload: Array<File> = [];
  public url: string;


  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ) {
    this.title = 'Create Project';
    this.project = new Project('','','','','',2022,'');
    this.url = Global.url;
   }

  ngOnInit(): void {
  }

  
  onSubmit(form: any){
    //Guardar los datos
    this._projectService.saveProject(this.project).subscribe(
      response => {
        if(response.project){
          
          this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id, [], this.fileToUpload, 'image')
          .then( (result:any) => {
            this.save_project = response.project;
            this.status = 'success';
          });
            
          form.reset();//Vaciar el formulario una vez salvado
        }else{
          this.status = 'failed';
        }
        console.log(response);
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
