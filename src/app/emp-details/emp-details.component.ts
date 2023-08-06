import { Component, Inject, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-details',
  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.css']
})
export class EmpDetailsComponent  {
  empId:number;
  firstName:string;
  lastName:string;
  designation:string
  project:string;
  reportingManager:string;

  constructor(
    private _empService:EmployeeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){
    this.empId=data.empId;
    this.firstName=data.firstName;
    this.lastName=data.lastName;
    this.designation=data.designation
    this.project=data.project
    this.reportingManager=data.reportingManager
  }

}
