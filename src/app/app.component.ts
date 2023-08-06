import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmpDetailsComponent } from './emp-details/emp-details.component';
import { EmployeeService } from './services/employee.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'demoNget';

  displayedColumns: string[] = ['empId', 'firstName', 'lastName', 'action'];
  dataSource!: MatTableDataSource<any>;
  EmployeeData!:any

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog:MatDialog, private _empService: EmployeeService){

  }
  ngOnInit(): void {
    this.getEmployeeList();
  }

  openAddEditEmpForm(){
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next : (val) => {
        if(val){
          this.getEmployeeList();
        }
      }
    });
  }

  openEditForm(data:any){
    const dialogRef = this._dialog.open(EmpAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }

  showEmployeeDetail(id:number){
    this._empService.getEmployeeById(id).subscribe({
      next : (res : any) => {
        console.log(res)
        this.openEmpDetail(res)
      },
      error : (err:any) => {
        console.error(err);
      }
    });
    console.log(this.EmployeeData);
  }

  openEmpDetail(data:any){
    this._dialog.open(EmpDetailsComponent,{data});
  }

  getEmployeeList(){
    this._empService.getEmployeeList().subscribe({
      next : (res : any) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error : (err:any) =>{
        console.error(err);
      }
    });
  }

  getEmployeeById(id:number){
    this._empService.getEmployeeById(id).subscribe({
      next : (res : any) => {
        console.log(res)
        this.openEditForm(res)
      },
      error : (err:any) => {
        console.error(err);
      }
    });
    console.log(this.EmployeeData);
  }

  deleteEmployee(id:number){
    this._empService.deleteEmployee(id).subscribe({
      next : (res:any) => {
        alert('Employee Deleted!');
        this.getEmployeeList();
      },
      error : (err:any) => {
        console.error(err);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
