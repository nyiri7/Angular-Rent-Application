import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ToastInfo, UserDTO } from '../../dataTypes/models';
import { NgClass } from '@angular/common';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,NgClass],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router,private toastService: ToastService){}

  userForm = this.formBuilder.group({

    id: this.formBuilder.control(0),
    name: this.formBuilder.control("",Validators.required),
    phone: this.formBuilder.control("",Validators.required),
    email: this.formBuilder.control("",[Validators.required, Validators.min(1)]),
    password : this.formBuilder.control("",Validators.required),
    pwda : this.formBuilder.control("",Validators.required),
  });
  ngOnInit(): void {
  }

  saveUser() {
    if(this.userForm.valid){
      if(this.userForm.controls.password.value == this.userForm.controls.pwda.value){
        const user = this.userForm.value;
        this.userService.create(user as UserDTO).subscribe({
          next: () => {
            this.toastService.show("Mentés","Sikeres mentés!")
            this.router.navigateByUrl('/login');
          },
          error: (err) => {
            this.toastService.show("Error",'Hiba a mentés során.')
          }
        });
      }else{
        this.toastService.show("Hiba",'A két jelszó nem egyezik.')
      }
    }else{
      this.toastService.show("Hiba",'Töltsd ki az összes mezőt!')
    }

    }
}
