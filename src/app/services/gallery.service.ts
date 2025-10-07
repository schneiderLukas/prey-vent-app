import { Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';
import { forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';

export interface Image {
  id: string;
  url: string;
  isPrey: boolean;
  // timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private _images = signal<Image[]>([]); // Signal holding your albums
  images = this._images.asReadonly();
  private blobCache = new Map<string, string>(); // cache filenames -> blob URLs
  
  constructor(private api: ApiService) { }

  // Example method to fetch images from an API
  fetchImages(isPrey: boolean): void {
    // Fetch metadata (list of filenames)
    this.api.get<{ filename: string; isPrey: boolean }[]>('pictures', { isPrey })
      .subscribe(items => {
        const imageRequests: Observable<Image>[] = items.map(item => {
          const cachedUrl = this.blobCache.get(item.filename);

          if (cachedUrl) {
            // Return cached blob URL
            return of({
              id: item.filename,
              url: cachedUrl,
              isPrey: item.isPrey
            });
          }

          // Otherwise, fetch blob from API
          return this.api.getBlob<Blob>('pictures/' + item.filename,{}).pipe(
            map((blob: Blob) => {
              const url = URL.createObjectURL(blob);
              this.blobCache.set(item.filename, url);
              return { id: item.filename, url, isPrey: item.isPrey };
            })
          );
        });

        // Wait until all blobs are loaded
        forkJoin(imageRequests).subscribe(images => {
          this._images.set(images);
        });
      });
  }

  clearCache(): void {
    this.blobCache.forEach(url => URL.revokeObjectURL(url));
    this.blobCache.clear();
  }
}
