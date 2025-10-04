import { Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';

export interface Album {
  src: string;
  thumb: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  albums = signal<Album[]>([]); // Signal holding your albums
  
  constructor(private api: ApiService) { }
    

  images() : Array<Album> { // Replace with actual API call 
    return [
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
        thumb: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
        category: 'cat_without_prey'
      },
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
        thumb: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
        category: 'cat_without_prey'
      },
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
        thumb: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
        category: 'cat_with_prey'
      },
      {
        src: 'https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg',
        thumb: 'https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg',
        category: 'cat_with_prey'
      }
    ]
  }
}
