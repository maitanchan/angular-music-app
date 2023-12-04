import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { forEach } from 'lodash-es';
import { map, of, switchMap } from 'rxjs';
import { Artist } from 'src/app/models/artist.model';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-artist-detail-page',
  templateUrl: './artist-detail-page.component.html',
  styleUrls: ['./artist-detail-page.component.scss']
})
export class ArtistDetailPageComponent   implements OnInit {
  artistId?: string;
  artist?: Artist;
  songs?: any;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore,private songService: SongService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.artistId = params['id'];
      this.loadAlbumData();
    });
    this.retrieveSongs();
  }
  refreshList(): void {
    this.retrieveSongs();
  }

  retrieveSongs(): void {
    this.songService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data(), showAudioDropdown: false })
        )
      ),
      switchMap(songs => {
        const shuffledSongs = this.shuffleArray(songs);
  
        const randomSongs = shuffledSongs.slice(0, 6);
  
        this.songs = randomSongs;
  
        forEach(this.songs, x => x.releaseDate = new Date(x.releaseDate.seconds * 1000));
  
        console.log(this.songs);
        return of(null); 
      })
    ).subscribe();
  }
  
  private shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  
  toggleAudioDropdown(song: any): void {
    song.showAudioDropdown = !song.showAudioDropdown;
    this.closeOtherDropdowns(song);
  }

  closeOtherDropdowns(currentSong: any): void {
    if (this.songs) {
      this.songs.forEach((song: any) => {
        if (song !== currentSong) {
          song.showAudioDropdown = false;
        }
      });
    }
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
