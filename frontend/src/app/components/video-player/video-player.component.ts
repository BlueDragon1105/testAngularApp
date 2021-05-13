import {Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
// import {TableOfContentModel} from '../../shell/courses/course.module';
// import {ActiveUrlService} from '../services/active-url.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss', './sound-style.scss']
})

export class VideoPlayerComponent implements OnInit, AfterViewInit, OnDestroy {
  // @Input() playlist: TableOfContentModel;
  @ViewChild('video') video: ElementRef;
  @ViewChild('currentProgress') currentProgress: ElementRef;
  @ViewChild('progressDot') progressDot: ElementRef;
  @ViewChild('volume') volume: ElementRef;
  @ViewChild('playbackRate') playbackRate: ElementRef;
  videoProgressInterval: any;
  videoPlayer: HTMLVideoElement;
  videoPaused: boolean;
  videoScrollStartPosition: number;
  videoScrollPercentage: number;
  videoScrollHandler: any;
  videoMouseUpHandler: any;
  volumeMouseMoveHandler: any;
  playbackRateMouseMoveHandler: any;
  initialProgressWidth: string;
  scrolling = false;
  isFullscreen = false;
  docElmWithBrowsersFullScreenFunctions: any;
  docWithBrowsersExitFunctions: any;
  videoVolume: number;
  tempVideoVolume: number;
  videoPlaybackRate: number;

  constructor(
    // private router: Router,
    // private activeUrlService: ActiveUrlService
  ) {
  }

  ngOnInit() {
    console.log('VideoPlayerComponent ngOnInit');
  }

  ngAfterViewInit() {
    if (this.video.nativeElement.autoplay) {
      clearInterval(this.videoProgressInterval);
      this.setVideoProgressInterval();
    }
    this.videoPaused = true;
    this.videoMouseUpHandler = this.onProgressDotMouseUp.bind(this);
    this.setFullscreenEventListeners();
    this.video.nativeElement.onended = () => {
      this.goToNext();
    };
  }

  onVolumeMouseDown($event) {
    console.log($event.target.value);
    this.tempVideoVolume = this.videoVolume;
    console.log(this.tempVideoVolume);
    this.volumeMouseMoveHandler = this.updateVolume.bind(this);
    this.volume.nativeElement.addEventListener('mousemove', this.volumeMouseMoveHandler);
  }

  removeVolumeChangeEvent() {
    this.volume.nativeElement.removeEventListener('mousemove', this.volumeMouseMoveHandler);
    if (this.video.nativeElement.muted) {
      console.log('video is muted');
      this.videoVolume = this.tempVideoVolume;
      console.log(this.tempVideoVolume);
      this.video.nativeElement.volume = this.videoVolume;
      this.volume.nativeElement.value = this.videoVolume * 100;
    }
  }

  updateVolume() {
    console.log(this.volume.nativeElement.value);
    if (this.volume.nativeElement.value === '0') {
      console.log('mute');
      this.mute();
    } else {
      if (this.video.nativeElement.muted) {
        this.unmute();
      }
      this.videoVolume = this.volume.nativeElement.value / 100;
      this.video.nativeElement.volume = this.videoVolume;
    }
  }


  onPlaybackRateChange() {
    this.playbackRateMouseMoveHandler = this.updatePlaybackRate.bind(this);
    this.playbackRate.nativeElement.addEventListener('mousemove', this.playbackRateMouseMoveHandler);
  }

  updatePlaybackRate() {
    this.videoPlaybackRate = this.playbackRate.nativeElement.value / 10;
    this.video.nativeElement.playbackRate = this.videoPlaybackRate;
    console.log(this.videoPlaybackRate);
  }

  removePlaybackRateChangeEvent() {
    this.playbackRate.nativeElement.removeEventListener('mousemove', this.playbackRateMouseMoveHandler);
  }

  onProgressDotMouseDown($event) {
    console.log('onProgressDotMouseDown');
    document.removeEventListener('mouseup', this.videoMouseUpHandler);
    this.initialProgressWidth = this.currentProgress.nativeElement.style.width;
    this.videoScrollStartPosition = $event.clientX;
    this.videoPaused = this.video.nativeElement.paused;
    this.videoScrollHandler = this.scrollVideo.bind(this);
    document.addEventListener('mousemove', this.videoScrollHandler);
    document.addEventListener('mouseup', this.videoMouseUpHandler);
    this.pause();
  }

  scrollVideo($event: { clientX: number; }) {
    console.log('scrollVideo');
    this.scrolling = true;
    // console.log(this.videoScrollStartPosition);

    if (!this.initialProgressWidth || this.initialProgressWidth === '0px') {
      this.initialProgressWidth = '0%';
    }
    const videoWidth = this.video.nativeElement.offsetWidth;
    const initialProgressWidth = videoWidth * parseFloat(this.initialProgressWidth) / 100;


    const mouseMove = $event.clientX - this.videoScrollStartPosition;

    // console.log('ProgressWidth: ' + (initialProgressWidth + mouseMove) / videoWidth);

    this.videoScrollPercentage = (initialProgressWidth + mouseMove) / videoWidth * 100;
    if (this.videoScrollPercentage < 0) {
      this.videoScrollPercentage = 0;
    }
    if (this.videoScrollPercentage > 100) {
      this.videoScrollPercentage = 100;
      this.videoPaused = true;
    }
    this.currentProgress.nativeElement.style.width = this.videoScrollPercentage + '%';
  }


  onProgressDotMouseUp() {
    console.log('onProgressDotMouseUp');
    document.removeEventListener('mousemove', this.videoScrollHandler);
    if (this.scrolling) {
      this.video.nativeElement.currentTime = this.video.nativeElement.duration * this.videoScrollPercentage / 100;
      if (!this.videoPaused) {
        this.play();
      }
    }
    document.removeEventListener('mouseup', this.videoMouseUpHandler);
  }

  playPause() {
    console.log(this.video.nativeElement.currentTime);
    this.videoPlayer = document.getElementById('video') as HTMLVideoElement;
    if (this.videoPlayer.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  play() {
    document.getElementById('playpause').className = 'pause';
    this.video.nativeElement.play();
    clearInterval(this.videoProgressInterval);
    this.setVideoProgressInterval();
  }

  pause() {
    document.getElementById('playpause').className = 'play';
    clearInterval(this.videoProgressInterval);
    this.video.nativeElement.pause();
  }

  setVideoProgressInterval() {
    this.videoProgressInterval = setInterval(this.updateVideoProgress, 10);
  }

  updateVideoProgress() {
    const video = document.getElementById('video') as HTMLVideoElement;
    const percentage = video.currentTime / video.duration * 100;
    const currentProgress = document.getElementById('current-progress') as HTMLElement;
    currentProgress.style.width = percentage + '%';
    // console.log(currentProgress.style.width);
  }

  muteUnmute() {
    // this.videoPlayer = document.getElementById('video') as HTMLVideoElement;
    if (this.video.nativeElement.muted) {
      this.unmute();
    } else {
      this.mute();
    }
  }

  unmute() {
    console.log('mute()');
    this.video.nativeElement.muted = false;
    document.getElementById('sound').classList.remove('sound-mute');
    this.volume.nativeElement.value = this.video.nativeElement.volume * 100;
  }

  mute() {
    this.video.nativeElement.muted = true;
    document.getElementById('sound').classList.add('sound-mute');
  }

  expandCompress() {
    console.log('expandCompress');

    console.log(this.isFullscreen);
    if (this.isFullscreen) {
      console.log('fullscreen');
      if (this.docWithBrowsersExitFunctions.exitFullscreen) {
        this.docWithBrowsersExitFunctions.exitFullscreen();
      } else if (this.docWithBrowsersExitFunctions.mozCancelFullScreen) { /* Firefox */
        this.docWithBrowsersExitFunctions.mozCancelFullScreen();
      } else if (this.docWithBrowsersExitFunctions.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        this.docWithBrowsersExitFunctions.webkitExitFullscreen();
      } else if (this.docWithBrowsersExitFunctions.msExitFullscreen) { /* IE/Edge */
        this.docWithBrowsersExitFunctions.msExitFullscreen();
      }
      // this.isFullscreen = false;
    } else {
      console.log('Not Fullscreen');
      if (this.docElmWithBrowsersFullScreenFunctions.requestFullscreen) {
        this.docElmWithBrowsersFullScreenFunctions.requestFullscreen();
      } else if (this.docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen) { /* Firefox */
        this.docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen();
      } else if (this.docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        this.docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen();
      } else if (this.docElmWithBrowsersFullScreenFunctions.msRequestFullscreen) { /* IE/Edge */
        this.docElmWithBrowsersFullScreenFunctions.msRequestFullscreen();
      }
      // this.isFullscreen = true;
    }
  }

  setFullscreenEventListeners() {
    this.docElmWithBrowsersFullScreenFunctions = document.body as HTMLElement & {
      mozRequestFullScreen(): Promise<void>;
      webkitRequestFullscreen(): Promise<void>;
      msRequestFullscreen(): Promise<void>;
    };
    this.docWithBrowsersExitFunctions = document as Document & {
      mozCancelFullScreen(): Promise<void>;
      webkitExitFullscreen(): Promise<void>;
      msExitFullscreen(): Promise<void>;
    };

    this.docWithBrowsersExitFunctions.addEventListener('fullscreenchange', () => {
      console.log('fullscreenchange');
      this.isFullscreen = !this.isFullscreen;
      this.activeUrlService.updateLessonFullscreenStatus(this.isFullscreen);
    });
    this.docWithBrowsersExitFunctions.addEventListener('mozfullscreenchange', () => {
      console.log('mozfullscreenchange');
      this.isFullscreen = !this.isFullscreen;
      this.activeUrlService.updateLessonFullscreenStatus(this.isFullscreen);
    });
    this.docWithBrowsersExitFunctions.addEventListener('webkitfullscreenchange', () => {
      console.log('webkitfullscreenchange');
      this.isFullscreen = !this.isFullscreen;
      this.activeUrlService.updateLessonFullscreenStatus(this.isFullscreen);
    });
    this.docWithBrowsersExitFunctions.addEventListener('msfullscreenchange', () => {
      console.log('msfullscreenchange');
      this.isFullscreen = !this.isFullscreen;
      this.activeUrlService.updateLessonFullscreenStatus(this.isFullscreen);
    });

    this.docElmWithBrowsersFullScreenFunctions.addEventListener('fullscreenchange', () => {
      console.log('fullscreenchange');
      // this.isFullscreen = !this.isFullscreen;
      this.activeUrlService.updateLessonFullscreenStatus(this.isFullscreen);
    });
    this.docElmWithBrowsersFullScreenFunctions.addEventListener('mozfullscreenchange', () => {
      console.log('mozfullscreenchange');
      // this.isFullscreen = !this.isFullscreen;
      this.activeUrlService.updateLessonFullscreenStatus(this.isFullscreen);
    });
    this.docElmWithBrowsersFullScreenFunctions.addEventListener('webkitfullscreenchange', () => {
      console.log('webkitfullscreenchange');
      // this.isFullscreen = !this.isFullscreen;
      this.activeUrlService.updateLessonFullscreenStatus(this.isFullscreen);
    });
    this.docElmWithBrowsersFullScreenFunctions.addEventListener('msfullscreenchange', () => {
      console.log('msfullscreenchange');
      // this.isFullscreen = !this.isFullscreen;
      this.activeUrlService.updateLessonFullscreenStatus(this.isFullscreen);
    });
  }


  goToNext() {
    if (this.playlist.nextLesson.slug) {
      this.router.navigate([this.playlist.nextLesson.slug]);
    }
  }


  goToPrevious() {
    this.router.navigate([this.playlist.previousLesson.slug]);
  }

  ngOnDestroy(): void {
    clearInterval(this.videoProgressInterval);
  }
}
