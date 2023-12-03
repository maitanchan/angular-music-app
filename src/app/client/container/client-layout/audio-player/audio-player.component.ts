import { Component, Input, OnInit } from '@angular/core';
import { Song } from 'src/app/models/song.model';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent  {
  @Input() selectedSong: any;
  
  
  

}
