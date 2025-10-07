import { Component, computed, effect, signal, untracked } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { GalleryService, Image } from '../services/gallery.service';
declare var bootstrap: any;

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {

  selectedCategory = signal<boolean>(true); // true for 'prey', false for 'no-prey'
  // filteredImages = signal<Image[]>([]);
  currentImage = signal<{ id: string; url: string } | null>(null);
  images = signal<Image[]>([]);
  
  // images = signal<Album[]>([]); // Signal holding your albums
  
  
  constructor(private galleryService: GalleryService) { 
    effect(() => {
      this.images.set(this.galleryService.images());
      // this.filteredImages.set(this.images().filter(img => img.isPrey === this.selectedCategory()))
      // this.filteredImages = 
    });
    
  }

  

  filteredImages = computed(() =>
    this.images().filter(img => img.isPrey === untracked(this.selectedCategory))
  );

  selectCategory(isPrey: any) {
    const boolValue = (isPrey === "true" || isPrey === true);
    this.selectedCategory.set(boolValue);
    this.loadImages();
  }
  ngAfterViewInit(): void {
    if(typeof window !== 'undefined') {
      this.loadImages();
    }
  }

  loadImages() {
    this.galleryService.fetchImages(this.selectedCategory());
  }

  open(image: any) {
    this.currentImage.set(image);
    const modal = new bootstrap.Modal(document.getElementById('lightboxModal')!);
    modal.show();
  }



}
