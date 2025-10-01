import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryService, Album } from '../services/gallery.service';
import { Lightbox, LightboxModule} from 'ngx-lightbox';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule, LightboxModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {

  albums = signal<Album[]>([]); // Signal holding your albums


  constructor(private lightbox: Lightbox, private galleryService: GalleryService) { }


  ngOnInit(): void {
    this.albums.set(this.galleryService.loadAlbums());
  }

  open(index: number): void {
    this.lightbox.open(this.albums(), index);
  }

  close(): void {
    this.lightbox.close();
  }

}
