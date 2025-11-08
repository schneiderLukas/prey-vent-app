import { Component, OnInit, OnDestroy } from '@angular/core';
import { LivestreamService } from '../services/livestream.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-livestream',
  imports: [NgIf],
  templateUrl: './livestream.component.html',
  styleUrl: './livestream.component.css'
})
export class LivestreamComponent implements OnInit, OnDestroy {
  imageUrl: any;
  private intervalId: any;

  constructor(private livestreamService: LivestreamService) {}

  ngOnInit(): void {
    this.refreshImage();
    this.intervalId = setInterval(() => {this.refreshImage(); }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  refreshImage(): void {
    this.livestreamService.getLiveImage().subscribe(url => this.imageUrl = url);
  }
}
