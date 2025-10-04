import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryService, Album } from '../services/gallery.service';
declare var bootstrap: any;

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {

  selectedCategory = signal<'cat_with_prey' | 'cat_without_prey'>('cat_with_prey');

  currentImage = signal<{ src: string; thumb: string } | null>(null);

  // images = signal<Album[]>([]); // Signal holding your albums


  constructor(private galleryService: GalleryService) { }

  filteredImages = computed(() =>
    this.galleryService.images().filter(img => img.category === this.selectedCategory())
  );

  selectCategory(category: 'cat_with_prey' | 'cat_without_prey') {
    this.selectedCategory.set(category);
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
