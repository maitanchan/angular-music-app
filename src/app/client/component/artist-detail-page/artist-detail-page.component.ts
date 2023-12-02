import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Artist } from 'src/app/models/artist.model';

@Component({
  selector: 'app-artist-detail-page',
  templateUrl: './artist-detail-page.component.html',
  styleUrls: ['./artist-detail-page.component.scss']
})
export class ArtistDetailPageComponent   implements OnInit {
  artistId?: string;
  artist?: Artist;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.artistId = params['id'];
      this.loadAlbumData();
    });
  }

  loadAlbumData() {
    this.firestore
      .collection('artists')
      .doc<Artist>(this.artistId)
      .valueChanges()
      .subscribe((artist) => {
        this.artist = artist;
      });
  }
}
