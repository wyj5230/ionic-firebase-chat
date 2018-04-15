import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { UploadsProvider } from '../../providers/uploads/uploads';

/**
* Generated class for the ChatPage page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
//@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  username: string = '';
  message: string = '';
  _chatSubscription;
  messages: object[] = [];
  photUrl: string = '';
  phtoData: any;

  constructor(public db: AngularFireDatabase, private alertCtrl: AlertController,
    public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private uploadService: UploadsProvider) {
    this.username = this.navParams.get('username');
    this._chatSubscription = this.db.list('/chat').valueChanges().subscribe(data => {
      this.messages = data;
    });
  }

  sendMessage() {
    this.db.list('/chat').push({
      username: this.username,
      message: this.message
    }).then(() => {
    })
    this.message = '';
  }

  ionViewDidLoad() {
    this.db.list('/chat').push({
      specialMessage: true,
      message: `${this.username} is online now!`
    });
  }

  ionViewWillLeave() {
    this._chatSubscription.unsubscribe();
    this.db.list('/chat').push({
      specialMessage: true,
      message: `${this.username} just went offline.`
    });
  }

  public showAlert(title: string, message: string) {
    let alertBox = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alertBox.present();
  }

  takePhoto(fromCamera: boolean) {

    const optionCamera: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      correctOrientation: true,
      saveToPhotoAlbum: true,
      allowEdit: true
    }
    const optionLibrary: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true,
      allowEdit: true
    }
    this.camera.getPicture(fromCamera ? optionCamera : optionLibrary).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.uploadService.uploadToStorage(base64Image, new Date().getTime() + ".jpeg").then(res => {
        console.log('res download url:', res.downloadURL);
        this.photUrl = res.downloadURL;
        this.message = res.downloadURL;
        this.sendMessage();
      }).catch(function () {
        console.log('Failed to save photo to cloud, please check your internet connection and try again.');
      });
    }).catch(function () {
      console.log('Failed to invoke native camera, please restart your app and try again.');
    });
  }
}