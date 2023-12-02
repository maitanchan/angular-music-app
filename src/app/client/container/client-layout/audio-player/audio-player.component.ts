import { Component, OnInit } from '@angular/core';
import { Howl } from 'howler';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit{
   sound!: Howl;

  ngOnInit(): void {
    // Đặt đường dẫn của audio file của bạn
    const audioFile = 'https://firebasestorage.googleapis.com/v0/b/mp3-app-c366f.appspot.com/o/song1.mp3?alt=media&token=c0230b27-7107-44ab-836f-47a723eb1afd';
    
    // Khởi tạo đối tượng Howl
    this.sound = new Howl({
      src: [audioFile],
      html5: true, // Sử dụng giao diện người dùng của trình duyệt nếu có thể
      loop: true // Lặp lại audio
    });
  }

  togglePlayPause(): void {
    // Kiểm tra trạng thái của audio và chuyển đổi giữa play và pause
    if (this.sound.playing()) {
      this.sound.pause();
    } else {
      this.sound.play();
    }
  }
}
