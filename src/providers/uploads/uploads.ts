import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { UploadMetadata } from '@firebase/storage-types';
import { storage } from 'firebase';

@Injectable()
export class UploadsProvider {

  constructor(private afStorage: AngularFireStorage) {

  }

  uploadToStorage(picture, fireRoot: String): storage.UploadTask {
    var metadata: UploadMetadata = {
      contentType: 'image/jpeg',
    };
    return storage().ref('picutres/' + fireRoot).putString(picture,'data_url');
    // return this.afStorage.upload('picutres/' + fireRoot, picture, metadata);
    // return this.afStorage.ref('picutres/'+fireRoot).putString(picture);
  }

}
