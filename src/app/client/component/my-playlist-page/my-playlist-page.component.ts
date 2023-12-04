import { Component, OnInit } from '@angular/core';
import { MyPlaylistService } from 'src/app/services/my-playlist.service';

@Component({
  selector: 'app-my-playlist-page',
  templateUrl: './my-playlist-page.component.html',
  styleUrls: ['./my-playlist-page.component.scss']
})
export class MyPlaylistPageComponent implements OnInit {
  favoriteSongs?: any

  constructor(private playlistService: MyPlaylistService) {}

  ngOnInit(): void {
    this.favoriteSongs = this.playlistService.getPlaylist();
  }

  toggleAudioDropdown(song: any): void {
    song.showAudioDropdown = !song.showAudioDropdown;
    this.closeOtherDropdowns(song);
  }

  closeOtherDropdowns(currentSong: any): void {
    if (this.favoriteSongs) {
      this.favoriteSongs.forEach((song: any) => {
        if (song !== currentSong) {
          song.showAudioDropdown = false;
        }
      });
    }
  }
}
