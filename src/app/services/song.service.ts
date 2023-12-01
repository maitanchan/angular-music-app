import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Song } from '../models/song.model';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private dbPath = '/songs';

  songRef: AngularFirestoreCollection<Song>;

  constructor(private db: AngularFirestore) {
    this.songRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Song> {
    return this.songRef;
  }

  create(song: Song): any {
    return this.songRef.add({ ...song });
  }

  update(id: string, data: any): Promise<void> {
    return this.songRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.songRef.doc(id).delete();
  }
}
