import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/models/artist.model';
import { ArtistService } from 'src/app/services/artists.service';
import { AlbumService } from 'src/app/services/album.service';
import { SongService } from 'src/app/services/song.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./add-artist.component.css']
})
export class AddArtistComponent implements OnInit {
  artist: Artist = new Artist();
  submitted = false;
  albums: any;
  songs: any;

  constructor(private artistService: ArtistService,
    private albumService: AlbumService,
    private songService: SongService
    
    ) { }

  ngOnInit(): void {
    this.albumService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      console.log(data)
      this.albums = data;
    });

    this.songService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      console.log(data)
      this.songs = data;
    });
  }

  saveArtist(): void {
    this.artistService.create(this.artist).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
    });
  }

  newArtist(): void {
    this.submitted = false;
    this.artist = new Artist();
  }
}
