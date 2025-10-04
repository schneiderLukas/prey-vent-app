import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryService, Image } from '../services/gallery.service';
declare var bootstrap: any;

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {

  selectedCategory = signal<'prey' | 'no-prey'>('prey');

  currentImage = signal<{ id: string; url: string } | null>(null);

  // images = signal<Album[]>([]); // Signal holding your albums


  constructor(private galleryService: GalleryService) { }

  filteredImages = computed(() =>
    this.galleryService.images().filter(img => img.type === this.selectedCategory())
  );

  selectCategory(type: 'prey' | 'no-prey') {
    this.selectedCategory.set(type);
  }
  // ngOnInit(): void {
  //   this.images.set(this.galleryService.images());
  // }

  open(image: any) {
    this.currentImage.set(image);
    const modal = new bootstrap.Modal(document.getElementById('lightboxModal')!);
    modal.show();
  }



}
