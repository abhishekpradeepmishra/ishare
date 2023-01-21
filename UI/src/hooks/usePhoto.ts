import { useState, useEffect } from "react";
import { useCamera } from '@ionic/react-hooks/camera';
import { useFilesystem, base64FromPath } from '@ionic/react-hooks/filesystem';
import { useStorage } from '@ionic/react-hooks/storage';
import { isPlatform } from '@ionic/react';
import { CameraResultType, CameraSource, CameraPhoto, Capacitor, FilesystemDirectory } from "@capacitor/core";
import { uuid } from "uuidv4";
// export interface Post {
//     text:string,
//     photos: Photo[]
// }

export interface Photo {
    filepath: string,
    webviewPath?: string
    base64String?: string,
    id?: string
}
export function usePhoto() {
    const { getPhoto } = useCamera();
    const [photos, setPhotos] = useState<Photo[]>([]);
    const takePhoto = async (event:any) => {

        event.preventDefault();
        const cameraPhoto = await getPhoto({
            resultType: CameraResultType.Base64,
            source: CameraSource.Camera,
            quality: 100
        });

        const fileName = new Date().getTime() + '.png';
        const newPhotos = [{
            id: uuid(),
            filepath: fileName,
            base64String: cameraPhoto.base64String,
            webviewPath: cameraPhoto.webPath
        }, ...photos];
        setPhotos(newPhotos)
    };

    const deletePhoto = async (photoid: string) => {
        // var photos1 = photos.forEach(function (item, index) {
        //     if (item.id !== photoid) {
        //         return item;
        //     }
        // })
        
        let photos1 = photos.filter(photo => (photo.id !== photoid));

        //alert(photos.length);
        setPhotos(photos1);
    }

    return {
        photos,
        deletePhoto,
        takePhoto
    };
}