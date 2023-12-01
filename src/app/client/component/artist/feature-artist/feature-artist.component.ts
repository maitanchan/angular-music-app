import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ArtistService } from 'src/app/services/artists.service';

@Component({
  selector: 'app-feature-artist',
  templateUrl: './feature-artist.component.html',
  styleUrls: ['./feature-artist.component.scss']
})
export class FeatureArtistComponent implements OnInit {
  artists?: any;

  constructor( private artistService: ArtistService) { }

  ngOnInit(): void {
    this.retrieveArtists();
  }

  refreshList(): void {
    this.retrieveArtists();
  }

  retrieveArtists(): void {
    this.artistService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.artists = data;
      console.log(this.artists)
    });
  }
}
