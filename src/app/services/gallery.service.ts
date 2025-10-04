import { Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';

export interface Album {
  id: string;
  url: string;
  type: 'prey' | 'no-prey';
  timestamp: Date;
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
        id: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
        url: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
        type: 'no-prey',
        timestamp: new Date()
      },
      {
        id: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
        url: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
        type: 'no-prey',
        timestamp: new Date()
      },
      {
        id: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
        url: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
        type: 'no-prey',
        timestamp: new Date()
      },
      {
        id: 'https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg',
        url: 'https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg',
        type: 'prey',
        timestamp: new Date()
      }
    ]
  }
}
