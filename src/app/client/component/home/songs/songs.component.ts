import { Component, OnInit } from '@angular/core';
import { forEach } from 'lodash-es';
import { map } from 'rxjs';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {
  songs?: any;

  constructor( private songService: SongService) { }

  ngOnInit(): void {
    this.retrieveSongs();
  }

  refreshList(): void {
    this.retrieveSongs();
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

  
}
