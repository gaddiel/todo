import { Injectable } from '@angular/core';
import * as Applist from 'cordova-plugin-applist2/www/Applist';
import * as packagemanager from 'cordova-plugin-packagemanager/www/packagemanager';
/*
  Generated class for the ApplistProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
declare var Applist: any;
declare var packagemanager: any;
@Injectable()
export class ApplistProvider {
data:any;
getdata:any;
returnData:any;
  constructor() {

  }
 getlist(){
   console.log('Hello ApplistProvider Provider');
   let success = function(app_list) {
     //alert(JSON.stringify(app_list));
       console.log(JSON.stringify(app_list));

    };
   let error = function(app_list) {
      alert("Oopsie! " + app_list);
     console.log("Oopsie! " + app_list);
     };
   this.data= new Applist.createEvent('', '', '', '', '', success, error);

 }
 packagelist(){
  let success = function successCallback(e) {
     console.log(JSON.stringify(e));
   };

  let error = function errorCallback(e) {
     console.log(JSON.stringify(e));
   };
   this.getdata = new packagemanager.show(true, success, error);
  // console.log(JSON.stringify(this.getdata));
 }
}
