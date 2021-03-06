import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { ChatPage } from '../pages/chat/chat';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { Camera } from '@ionic-native/camera';
import { UploadsProvider } from '../providers/uploads/uploads';

var config = {
  apiKey: "AIzaSyAiPOKeoWlagOg5tr8bvxEixYxMIMQagzY",
  authDomain: "ionic-firebase-chat-e1c36.firebaseapp.com",
  databaseURL: "https://ionic-firebase-chat-e1c36.firebaseio.com",
  projectId: "ionic-firebase-chat-e1c36",
  storageBucket: "ionic-firebase-chat-e1c36.appspot.com",
  messagingSenderId: "61897110598"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ChatPage,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ChatPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    UploadsProvider
  ]
})
export class AppModule {}
