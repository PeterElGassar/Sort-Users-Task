import { Component } from '@angular/core';
import { IUser } from './IUser';
import usersDate from './users.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'UsersSort';
  users: any[] = usersDate;

  Rows: any[] = [];
  splitUserIdArr: any[] = [];

  ngOnInit(): void {
    this.sortUsers();
   
  }



  sortUsers = () => {
    let usres = this.users;
    let childId;
    //get frist
    let parentId = this.users[0].code;

    let row = [];
    //============================

    // 1-push first Parent Row
    this.Rows.push([this.users[0]]);

    // 2-get all children of First Parent ..
    usres.forEach(function (child) {
      let splitUserIdArr = child.code.split(".");
      childId = splitUserIdArr[splitUserIdArr.length - 2];

      //3- search for all matching children of parent
      if (childId === parentId) {
        row.push(child);
      }
    });
    this.callFuncWithDelay(row);
    //============================
    //============================

  }



  getAllChild(chilsList: any) {
    let childId;
    let row = [];
    let users = this.users;

    chilsList.forEach(function (child) {
      
      let splitUserIdArr = child.code.split(".");
      //last part of 'code'
      childId = splitUserIdArr[splitUserIdArr.length - 1];

      users.forEach(function (childOfchild) {

        splitUserIdArr = childOfchild.code.split(".");
        // before last part of 'code'
        let childOfId = splitUserIdArr[splitUserIdArr.length - 2];
        if (childId === childOfId) {
          debugger;
          row.push(childOfchild);
        }
      });

    });

    //if find children for this parents
    if (row.length > 0) {
      this.callFuncWithDelay(row);
    }

  }


  callFuncWithDelay(chilsList: any) {
    setTimeout(() => {
      this.Rows.push(chilsList);
      this.getAllChild(chilsList);
    }, 700);
  }







  // x = () => {
  //   let x = this.users;
  //   let childId;
  //   let Rows = [];


  //   this.users.forEach(function (user, i) {

  //     let splitUserIdArr = user.code.split(".");
  //     let parentId = splitUserIdArr[splitUserIdArr.length - 1]
  //     let row = { 'parent': user, 'children': [] };

  //     console.log("*********************");
  //     //============================
  //     //============================

  //     console.log("parent ID:  " + parentId);
  //     x.forEach(function (child) {


  //       let splitUserIdArr = child.code.split(".");
  //       childId = splitUserIdArr[splitUserIdArr.length - 2];

  //       if (childId === parentId) {
  //         console.log(`valid Children  ${child.name}:  ` + childId);
  //         row.children.push(child);
  //       }

  //     });
  //     //============================
  //     //============================

  //     //push in Rows
  //     if (row.children.length > 0) {
  //       Rows.push(row);
  //     }
  //   });
  //   // console.log(Rows);
  //   this.Rows = Rows;
  //   console.log(this.Rows);

  // }


}
