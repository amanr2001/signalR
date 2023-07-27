import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginform!:FormGroup;
  constructor(private fb :FormBuilder,private http:HttpClient,private route:ActivatedRoute,private router: Router){
    this.loginform= this.fb.group({
      username:[''],
      userpass:['']
    })
  }
  log(){
    let formdata=this.loginform.value
    this.http.post('https://localhost:7122/WeatherForecast',formdata).subscribe({
      next:(resp:any)=>{
        console.log(resp);
        this.router.navigate(['chat',resp.userid])
        
      }
    })
  }
}
