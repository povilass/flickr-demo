import {httpClientInstance} from "../core/httpClient";
import {apiRejectResolver} from "./apiRejectResolver";

export type SizeItem = {
    height: number;
    label: string;
    media: string;
    source: string;
    url: string;
    width: number;
};

export type SizesResponse = {
    sizes: {
        canblog: number;
        candownload: number;
        canprint: number;
        size: SizeItem[]
    }
};


export default (photoId: string) => {
    const params = new URLSearchParams({
        "method": "flickr.photos.getSizes",
        "photo_id": photoId + "",
        "format": "json",
        "nojsoncallback": "1"
    });

    return httpClientInstance.execute(`/flickr/api?${params}`).then<SizesResponse>(apiRejectResolver);
}
