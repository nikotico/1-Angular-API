import { Injectable} from '@angular/core';
import {HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

import { Project } from '../models/project';
import {Global} from './global'

//Aca va todo lo relacionado con la conexion al API 
@Injectable()
export class ProjectService {
    public url : string = '';
    
    constructor(
        private http : HttpClient
    ){
        this.url = Global.url
    }

    testService(){
        return 'Ya casi llegamos al api'
    }

    saveProject(project: Project): Observable<any> {
        let params = JSON.stringify(project);//Para que el api pueda recogerlo
        let headers = new HttpHeaders().set('Content-Type', 'application/json');//Para que todo viaje como json para

        return this.http.post(this.url+'save-project',params,{headers : headers });
    }

    getProjects(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');//Para que todo viaje como json para

        return this.http.get(this.url+'projects',{headers : headers });
    }

    getProject(id: string): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');//Para que todo viaje como json para

        return this.http.get(this.url+'project/'+id,{headers : headers });
    }

    deleteProject(id: string): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');//Para que todo viaje como json para

        return this.http.delete(this.url+'project/'+id,{headers : headers });
    }

    updateProject(project: Project): Observable<any>{
        let params = JSON.stringify(project);//Para que el api pueda recogerlo

        let headers = new HttpHeaders().set('Content-Type', 'application/json');//Para que todo viaje como json para

        return this.http.put(this.url+'project/'+project._id,params,{headers : headers });
    }
}