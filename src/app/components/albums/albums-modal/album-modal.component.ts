import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Album } from '../../../models/album.model';
import { SongService } from '../../../services/song.service';
import { map } from 'rxjs';
import { AlbumService } from 'src/app/services/album.service';
import { GenerService } from 'src/app/services/geners.service';
import { ArtistService } from 'src/app/services/artists.service';
import { AngularFireStorage } from "@angular/fire/compat/storage"

@Component({
  selector: 'app-album-modal',
  templateUrl: './album-modal.component.html',
  styleUrls: ['./album-modal.component.css']
})
export class AlbumModalsComponent implements OnInit {
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentAlbum: Album = {
    id: '',
    title: '',
    releaseDate : new Date(),
    artistId: '',
    coverImages: '',
    songIds: [],
    songs: [],
    artists: []
  };
  message = '';
  songs: any;
  artists: any;
  visible = false;
  title = 'imageupload';
  
  constructor(private songService: SongService,    
    private albumService: AlbumService, 
    private artistService: ArtistService,
    private generService: GenerService,
    private fireStorage:AngularFireStorage
    ) { }

    async onFileChange(event: any) {
      const file = event.target.files[0];
      if (file) {
        const path = `img/${file.name}`;
        const uploadTask = this.fireStorage.upload(path, file);
    
        uploadTask.then(async (snapshot) => {
          const url = await snapshot.ref.getDownloadURL();
          console.log(url);
        }).catch(error => {
          console.error(error);
        });
      }
    }
    

  ngOnInit(): void {
    this.message = '';
    this.songService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.songs = data;
    });

    this.artistService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.artists = data;
    });
  }

  close(){
    this.visible = !this.visible;
  }

  show(album?: Album) {
    this.visible = !this.visible;
    if(!album?.id){
      this.currentAlbum = new Album();
      this.currentAlbum.releaseDate = new Date();
    }
    else{
      this.currentAlbum = album;
    }
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
  ngOnChanges(): void {
    this.message = '';

  }

  updatePublished(status: boolean): void {
    if (this.currentAlbum.id) {
      this.albumService.update(this.currentAlbum.id, { published: status })
      .then(() => {
        this.message = 'The status was updated successfully!';
      })
      .catch(err => console.log(err));
    }
  }

  updateAlbum(): void {
    if (this.currentAlbum.id) {
      this.albumService.update(this.currentAlbum.id, this.currentAlbum)
        .then(
          () => {
            this.refreshList.emit();
            this.close();
            this.message = 'The album was updated successfully!';
          }
        )
        .catch(err => console.log(err));
    }
    else{
      this.albumService.create(this.currentAlbum)
      .then(() => {
        this.refreshList.emit();
        this.close();
        this.message = 'The status was created successfully!';
      })
    }
  }

  deleteAlbum(): void {
    if (this.currentAlbum.id) {
      this.albumService.delete(this.currentAlbum.id)
        .then(() => {
          this.refreshList.emit();
          this.message = 'The album was updated successfully!';
        })
        .catch(err => console.log(err));
    }
  }
}
