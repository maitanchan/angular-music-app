import { Component, Input, OnInit } from '@angular/core';
import { Song } from 'src/app/models/song.model';
import { MyPlaylistService } from 'src/app/services/my-playlist.service';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent  {
  @Input() selectedSong: any;
  isFavorite: boolean[] = [];

  constructor(private playlistService: MyPlaylistService) { }
  
  addToPlaylist(song: any): void {
    this.playlistService.addToPlaylist(song);
    alert('Added to my playlist ')
  }

}
