import { Injectable} from '@angular/core';

import {Global} from './global'

//Aca va todo lo relacionado con la conexion al API 
@Injectable()
export class UploadService {
    public url : string = '';

    constructor(){
        this.url = Global.url
    }


    makeFileRequest(url : string, params : Array<string>, files : Array<File>,name : string){
        return new Promise((resolve, reject) =>{
            var formData:any = new FormData();
            var xhr = new XMLHttpRequest();//Peticion AJAX

            for(var i = 0; i < files.length; i++){
                formData.append(name,files[i],files[i].name);
            }

            xhr.onreadystatechange = function(){//Funcion de AJAX, cuando ya esta todo listo
                if(xhr.readyState == 4){//Estos son valores ya predefinidos de AJAX, 4 = DONE, 3 = LOADING, etc
                    if(xhr.status == 200){ //200 OK funciono
                        resolve(JSON.parse(xhr.response))
                    }else{//Sino, se cayo
                        reject(xhr.response)
                    }
                }
            }
            xhr.open('POST', url,true);
            xhr.send(formData);//Envio todo el formulario
        });
    }
}

