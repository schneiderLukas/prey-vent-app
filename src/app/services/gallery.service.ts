import { Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';

export interface Album {
  src: string;
  thumb: string;
  caption: string;
}

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  albums = signal<Album[]>([]); // Signal holding your albums
  
  constructor(private api: ApiService) { }
    

  loadAlbums() : Array<Album> { // Replace with actual API call 
    return [
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
        thumb: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
        caption: 'Cute Kitten 1'
      },
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
        thumb: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
        caption: 'Cute Kitten 1'
      },
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
        thumb: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
        caption: 'Cute Kitten 1'
      },
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
        thumb: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
        caption: 'Cute Kitten 1'
      }
    ]
  }
}
