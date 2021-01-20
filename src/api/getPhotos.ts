import {httpClientInstance} from "../core/httpClient";
import {apiRejectResolver} from "./apiRejectResolver";

export type Photo = {
    farm: number;
    id: string;
    isfamily: number;
    isfriend: number;
    ispublic: number;
    owner: string;
    secret: string;
    server: string;
    title: string;
}

export type PhotosResponse = {
    photos: {
        page: number;
        pages: number;
        perpage: number;
        photo: Photo[];
        total: number;
    };
}


export default (page: number = 1, perPage = 40) => {
    const params = new URLSearchParams({
        "method": "flickr.photos.getRecent",
        "per_page": perPage + "",
        "page": page + "",
        "format": "json",
        "nojsoncallback": "1"
    });

    return httpClientInstance.execute(`/flickr/api?${params}`).then<PhotosResponse>(apiRejectResolver);
}
