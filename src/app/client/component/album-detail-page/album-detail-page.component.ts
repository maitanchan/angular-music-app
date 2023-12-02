import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Album } from 'src/app/models/album.model';

@Component({
  selector: 'app-album-detail-page',
  templateUrl: './album-detail-page.component.html',
  styleUrls: ['./album-detail-page.component.scss']
})
export class AlbumDetailPageComponent implements OnInit {
  albumId?: string;
  album?: Album;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.albumId = params['id'];
      this.loadAlbumData();
    });
  }

  loadAlbumData() {
    this.firestore
      .collection('albums')
      .doc<Album>(this.albumId)
      .valueChanges()
      .subscribe((album) => {
        this.album = album;
      });
  }
  
}
