import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { File } from '@ionic-native/file';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Device } from '@ionic-native/device';
import { Uid } from '@ionic-native/uid';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ApplistProvider } from '../providers/applist/applist';
import { ToastController } from 'ionic-angular';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BackgroundMode,
    File,
    Device,
    Uid,
    ToastController,
    AndroidPermissions,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApplistProvider
  ]
})
export class AppModule {

}
