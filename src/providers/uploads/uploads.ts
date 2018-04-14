import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { UploadMetadata } from '@firebase/storage-types';

@Injectable()
export class UploadsProvider {

  constructor(private afStorage: AngularFireStorage) {

  }

  uploadToStorage(picture, fireRoot: String): AngularFireUploadTask{
    var metadata: UploadMetadata = {
        contentType: 'image/jpeg',
      };

      return this.afStorage.ref('picutres/'+fireRoot).putString(picture, 'base64' ,metadata);
  }

}
