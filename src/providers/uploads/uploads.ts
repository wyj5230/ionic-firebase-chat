import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';

@Injectable()
export class UploadsProvider {

  constructor(private afStorage: AngularFireStorage) {

  }

  uploadToStorage(picture, fireRoot: String): AngularFireUploadTask {
    // return storage().ref('picutres/' + fireRoot).putString(picture,'data_url');
    // return this.afStorage.upload('picutres/' + fireRoot, picture, metadata);
    return this.afStorage.ref('picutres/' + fireRoot).putString(picture, 'data_url');
  }

}
