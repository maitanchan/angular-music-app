import { Component } from '@angular/core';
import { forEach } from 'lodash-es';
import { map } from 'rxjs';
import { AlbumService } from 'src/app/services/album.service';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-songs-page',
  templateUrl: './songs-page.component.html',
  styleUrls: ['./songs-page.component.scss']
})
export class SongsPageComponent {
  topSongs: any[] = [
    { rank: 1, title: 'Song 1', artist: 'Artist 1' },
    { rank: 2, title: 'Song 2', artist: 'Artist 2' },
    { rank: 3, title: 'Song 3', artist: 'Artist 3' },
    { rank: 4, title: 'Song 4', artist: 'Artist 4' },
    { rank: 5, title: 'Song 5', artist: 'Artist 5' },
    { rank: 6, title: 'Song 6', artist: 'Artist 6' },
  ];

  songs?: any;
  albums?: any;

  constructor( private songService: SongService,
    private albumService: AlbumService) { }

  ngOnInit(): void {
    this.retrieveSongs();
    this.retrieveAlbums();
  }

  refreshList(): void {
    this.retrieveSongs();
    this.retrieveAlbums();
  }

  retrieveSongs(): void {
    this.songService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.songs = data;
      forEach(this.songs, x=>x.releaseDate = new Date(x.releaseDate.seconds * 1000))
      console.log(this.songs)
    });
  }

  retrieveAlbums(): void {
    this.albumService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.albums = data;
      forEach(this.albums, x=>x.releaseDate = new Date(x.releaseDate.seconds * 1000))
      console.log(this.albums)
    });
    
  }
}
