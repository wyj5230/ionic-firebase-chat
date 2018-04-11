import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

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

  constructor(public db: AngularFireDatabase, private alertCtrl: AlertController,
    public navCtrl: NavController, public navParams: NavParams) {
      this.username = this.navParams.get('username');
      this._chatSubscription = this.db.list('/chat').valueChanges().subscribe( data => {
        this.messages = data;
      });
    }

    sendMessage() {
      this.db.list('/chat').push({
        username: this.username,
        message: this.message
      }).then( () => {
      })
      this.message = '';
    }

    ionViewDidLoad() {
      this.db.list('/chat').push({
        specialMessage: true,
        message: `${this.username} is online now!`
      });
    }

    ionViewWillLeave(){
      this._chatSubscription.unsubscribe();
      this.db.list('/chat').push({
        specialMessage: true,
        message: `${this.username} just went offline.`
      });
    }

    showAlert(title: string, message: string) {
      let alertBox = this.alertCtrl.create({
        title: title,
        subTitle: message,
        buttons: ['OK']
      });
      alertBox.present();
    }
  }
