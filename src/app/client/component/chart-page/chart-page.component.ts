import { Component } from '@angular/core';
import { forEach } from 'lodash-es';
import { map } from 'rxjs';
import { AlbumService } from 'src/app/services/album.service';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-chart-page',
  templateUrl: './chart-page.component.html',
  styleUrls: ['./chart-page.component.scss']
})
export class ChartPageComponent {
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
