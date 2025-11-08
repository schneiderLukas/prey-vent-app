import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { map } from 'rxjs';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class LivestreamService {

  constructor(private api: ApiService, private sanitizer: DomSanitizer) { }

  //   @app.get("/live-image")
  // def get_live_image(user=Depends(get_current_user)):
  //     picture_dir = config.get("LIVE_PICTURE_DIR", "live_picture")
  //     filepath = os.path.join(picture_dir, "live.jpg")
  //     if not os.path.exists(filepath):
  //         raise HTTPException(status_code=404, detail="Live image not found")
  //     return FileResponse(filepath) 

  // give me a function which gets the live image from the api service that i can use in the livestream component
  getLiveImage() {
    return this.api.get<Blob>("live-image", {}, 'blob' as any)
      .pipe(
        map((blob: Blob) => {
          const objectURL = URL.createObjectURL(blob);
          return this.sanitizer.bypassSecurityTrustUrl(objectURL);
        })
      );
  }

}
