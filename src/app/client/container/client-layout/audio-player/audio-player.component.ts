import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/models/song.model';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit {

  // Tạo một đối tượng bài hát để thử nghiệm
  currentSong = {
    title: 'Song Title',
    artist: 'Artist Name',
    url: 'https://firebasestorage.googleapis.com/v0/b/mp3-app-c366f.appspot.com/o/song1.mp3?alt=media&token=c0230b27-7107-44ab-836f-47a723eb1afd'
  };
  audio = new Audio();
  trackPointer: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

  // Các phương thức điều khiển audio
  playPause() {
    const audio = document.querySelector('audio') as HTMLAudioElement;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  next() {
    // Thực hiện logic chuyển bài hát tiếp theo
  }

  previous() {
    // Thực hiện logic chuyển bài hát trước đó
  }
  currentMusic: Song = {
    url: ""
  }
  musicList: Song[] = [];
  play(index?: number): void {
    if (index === undefined) {
      if (this.audio.paused) {
        if (this.audio.readyState === 0) {
          this.trackPointer = 0;
          this.currentMusic = this.musicList[0];
          if (this.currentMusic && this.currentMusic.url) {
            this.audio.src = this.currentMusic.url;
  
            // Xử lý sự kiện canplay
            this.audio.addEventListener('canplay', () => {
              this.audio.play();
            });
          }
        } else {
          this.audio.play();
        }
      } else {
        this.audio.pause();
      }
    } else {
      this.trackPointer = index;
      this.currentMusic = this.musicList[index];
      if (this.currentMusic && this.currentMusic.url) {
        this.audio.src = this.currentMusic.url;
  
        // Xử lý sự kiện canplay
        this.audio.addEventListener('canplay', () => {
          this.audio.play();
        });
      }
    }
  
    // Xử lý sự kiện ended
    this.audio.addEventListener('ended', () => {
      // Thực hiện các hành động khi bài hát kết thúc, ví dụ: chuyển đến bài hát tiếp theo.
      this.next();
    });
  
    // Xử lý sự kiện click
    document.addEventListener('click', () => {
      this.audio.play();
    });
  }
  
  

}
