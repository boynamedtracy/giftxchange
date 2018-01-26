import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';

@Component({
  selector: 'gx-profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.scss']
})
export class ProfilePicComponent implements OnInit {

  data: any;
  cropperSettings: CropperSettings;

  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;

  @Input()
  picurl: string = '';
  
  constructor() {
    //this.cropperSettings = new CropperSettings();
    //this.cropperSettings.width = 100;
    //this.cropperSettings.height = 100;
    //this.cropperSettings.croppedWidth = 100;
    //this.cropperSettings.croppedHeight = 100;
    //this.cropperSettings.canvasWidth = 400;
    //this.cropperSettings.canvasHeight = 300;
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.canvasWidth = 160;
    this.cropperSettings.canvasHeight = 160;

    this.data = {};
    
  }

  ngOnInit() {
    
    console.log('this.picUrl: ' + this.picurl);

    var image: any = new Image();


    var that = this;

    fetch(this.picurl)
      .then(res => res.blob()) // Gets the response and returns it as a blob
      .then(blob => {
        // Here's where you get access to the blob
        // And you can use it for whatever you want
        // Like calling ref().put(blob)

        // Here, I use it to make an image appear on the page
        //let objectURL = URL.createObjectURL(blob);
        //let myImage = new Image();
        //myImage.src = objectURL;

        var myReader: FileReader = new FileReader();
        myReader.onloadend = function (loadEvent: any) {
          image.src = loadEvent.target.result;
          that.cropper.setImage(image);
        };
        myReader.readAsDataURL(blob);

        //document.getElementById('myImg').appendChild(myImage)
      });


  }

  savePic() {
    console.log('saving: ' + JSON.stringify(this.cropper.image));
    console.log('saving: ' + this.cropper.image.image);
  }

  fileChangeListener($event) {
    var image: any = new Image();
    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);

    };

    myReader.readAsDataURL(file);
  }

}
