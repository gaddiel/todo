import { Component} from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { File } from '@ionic-native/file';
import { BackgroundMode } from '@ionic-native/background-mode';
import * as Applist from 'cordova-plugin-applist2/www/Applist';
import * as moment from 'moment';
import { Device } from '@ionic-native/device';
import { Uid } from '@ionic-native/uid';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { ToastController } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { ApplistProvider } from '../providers/applist/applist';
declare var Applist: any;

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = HomePage;
  data:any;
  constructor(
  platform: Platform,
  statusBar: StatusBar,
   splashScreen: SplashScreen,
   applist: ApplistProvider,
   private file: File,
   private backgroundMode: BackgroundMode,
   private device: Device,
   private uid: Uid,
   private androidPermissions: AndroidPermissions,
   private toastCtrl: ToastController
   ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.androidPermissions.requestPermissions([
        this.androidPermissions.PERMISSION.READ_PHONE_STATE,
        //this.androidPermissions.PERMISSION.ACCESS_NETWORK_STATE,
      ]);
      this.backgroundMode.enable();

      console.log('Hello ApplistProvider Provider');

        //Success Callback Receive
        function successCallback(app_list) {
            console.log(JSON.stringify(app_list));
                    localStorage.setItem('applist', JSON.stringify(app_list));
            localStorage.setItem('appcount', app_list.length);
            for (var i = 0; i < app_list.length; i++) {
                  var num = app_list[i];
                  let loopapps  = "\r\n03#"+num.appname+"#"+num.package+"#"+num.verName+"#"+num.firstInstallTime+"#"+num.lastUpdateTime;
                  //console.log(loopapps);
                  localStorage.setItem('app'+i, loopapps);
              }

        };

        //Error Callback Receive
          function errorCallback(app_list) {
            // alert("Oopsie! " + app_list);
            console.log("Oopsie! " + app_list);
          };

       this.data = new Applist.createEvent('', '', '', '', '', successCallback, errorCallback);

      // console.log(this.data.succ);
       console.log(this.backgroundMode.isActive());
       localStorage.setItem('UUID', this.device.uuid);
       localStorage.setItem('model', this.device.model);
       localStorage.setItem('platform', this.device.platform);
       localStorage.setItem('version', this.device.version);
       localStorage.setItem('manufacturer', this.device.manufacturer);
       localStorage.setItem('serial', this.device.serial);

       localStorage.setItem('IMEI', this.uid.IMEI);
       localStorage.setItem('IMSI', this.uid.IMSI);
       localStorage.setItem('ICCID', this.uid.ICCID);
       localStorage.setItem('MAC', this.uid.MAC);

        console.log('Device UUID is: ' + this.device.uuid);
        console.log('Device model is: ' + this.device.model);
        console.log('Device platform is: ' + this.device.platform);
        console.log('Device version is: ' + this.device.version);
        console.log('Device manufacturer is: ' + this.device.manufacturer);
        console.log('Device serial is: ' + this.device.serial);

        console.log('Device IMEI is: ' + this.uid.IMEI);
        console.log('Device UUID is: ' + this.uid.UUID);
        console.log('Device IMSI is: ' + this.uid.IMSI);
        console.log('Device ICCID is: ' + this.uid.ICCID);
        console.log('Device MAC is: ' + this.uid.MAC);
        console.log(moment().format('YYYYMMDDHHmmss')); // kk

            setTimeout(()=>{
                this.saveFile();
            }, 2000);




    });


   this.backgroundMode.on("activate").subscribe(()=>{
     console.log("backgroundMode")
   });

  }


    saveFile() {
      let applistcount =  localStorage.getItem('appcount');
      let totalCount = parseInt(applistcount)+8;
      let currentDate = moment().format('YYYYMMDDHHmmss');
      let checksumgen = localStorage.getItem('IMEI')+""+currentDate;
      let checksumtostr = this.reverse(checksumgen);
      let checksum = checksumtostr;
      console.log(checksum);
      let devicename  = "01#"+localStorage.getItem('model')+"#"+localStorage.getItem('UUID')+"#"+currentDate+"#"+totalCount+"#"+checksumgen;
      let cpu = "\r\n02-CPU##";
      let ram = "\r\n02-RAM##";
      let sd = "\r\n02-STORAGE##";
      let wifi = "\r\n02-WIFI##";
      let bluetooth = "\r\n02-BLUETOOTH##";
      let oss = "\r\n02-OS#"+localStorage.getItem('platform')+"#"+localStorage.getItem('version');
    //  let appname = "\r\n03-APPNAME"+localStorage.getItem('applist');
      let trailer = "\r\n04#"+localStorage.getItem('model')+"#"+localStorage.getItem('UUID')+"#"+currentDate+"#6#"+applistcount+"#"+totalCount+"#"+checksum;

       console.log(applistcount);

      let storage = this.file.externalDataDirectory;

      let filename = localStorage.getItem('model')+"_"+localStorage.getItem('UUID')+"_"+currentDate+".txt";
      //let log = ":: TEST LOG ::" + " [" + (new Date()) + "]\n";
      let appListArray = [];
      for (var j = 0; j < parseInt(applistcount); j++) {
          let localitem = "app"+j;
            //console.log(localitem);
             var list = localStorage.getItem(localitem);
             console.log(list);
             appListArray.push(list);

        }
      let blob = new Blob([devicename,cpu,ram,sd,wifi,bluetooth,oss,appListArray,trailer], {type:'text/plain'});
          return this.file.createFile(storage, filename, true)
      .then(() =>
        this.file.writeFile(storage, filename, blob,{replace: true })
        .then(
          () => {
          //resolve()
          console.log('Done');
          },
          (error) => {
          console.log('Could not rewrite existing image');
          console.log(error);
          //reject()
          }
          )
    );
  }
  reverse(str:string) {
    return str.split('').reverse().join('');
  }




}
