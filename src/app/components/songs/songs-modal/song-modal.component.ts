import { Component, OnInit, Input, OnChanges, Output, EventEmitter, ViewChild } from '@angular/core';
import { Song } from '../../../models/song.model';
import { SongService } from '../../../services/song.service';
import { map } from 'rxjs';
import { AlbumService } from 'src/app/services/album.service';
import { GenerService } from 'src/app/services/geners.service';
import { ArtistService } from 'src/app/services/artists.service';
//import { UploadFormComponent } from 'src/app/components/upload-form/upload-form.component';

@Component({
  selector: 'app-song-modal',
  templateUrl: './song-modal.component.html',
  styleUrls: ['./song-modal.component.css']
})
export class SongModalsComponent implements OnInit {
  // @ViewChild('fileUpload')
  // fileUpload!: UploadFormComponent;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentSong: Song = {
    id: '',
    title: '',
    duration: 0,
    releaseDate : new Date(),
    albumId: '',
    artistId: '',
    generId: '',
  };
  message = '';
  albums: any;
  artists: any;
  geners: any;
  visible = false;

  constructor(private songService: SongService,    
    private albumService: AlbumService, 
    private artistService: ArtistService,
    private generService: GenerService
    ) { }

  ngOnInit(): void {
    this.message = '';
    this.albumService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.albums = data;
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

    this.generService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.geners = data;
    });
  }

  close(){
    this.visible = !this.visible;
  }

  show(song?: Song) {
    this.visible = !this.visible;
    if(!song?.id){
      this.currentSong = new Song();
      this.currentSong.releaseDate = new Date();
    }
    else{
      this.currentSong = song;
    }
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
  ngOnChanges(): void {
    this.message = '';

  }

  updatePublished(status: boolean): void {
    if (this.currentSong.id) {
      this.songService.update(this.currentSong.id, { published: status })
      .then(() => {
        this.message = 'The status was updated successfully!';
      })
      .catch(err => console.log(err));
    }
  }

  updateSong(): void {
    if (this.currentSong.id) {
      this.songService.update(this.currentSong.id, this.currentSong)
        .then(
          () => {
            this.refreshList.emit();
            this.close();
            this.message = 'The song was updated successfully!';
          }
        )
        .catch(err => console.log(err));
    }
    else{
      this.songService.create(this.currentSong)
      .then(() => {
        this.refreshList.emit();
        this.close();
        this.message = 'The status was created successfully!';
      })
    }
  }

  deleteSong(): void {
    if (this.currentSong.id) {
      this.songService.delete(this.currentSong.id)
        .then(() => {
          this.refreshList.emit();
          this.message = 'The song was updated successfully!';
        })
        .catch(err => console.log(err));
    }
  }
}
