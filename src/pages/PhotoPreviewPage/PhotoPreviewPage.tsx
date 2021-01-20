import * as React from "react";
import {getPhotos} from "../../api";
import PhotoLoader from "./PhotoLoader";
import {InfinityScroll, Spinner} from "../../components";

type PhotosState = {
    page: number;
    list: Array<{
        id: string;
        author: string;
        title: string;
    }>;
    total: number;
};


function PhotoPreviewPage() {

    const [loading, setLoading] = React.useState<boolean | undefined>(true);
    const [failed, setFailed] = React.useState<boolean | undefined>(false);

    const [data, setData] = React.useState<PhotosState>({
        page: 1,
        list: [],
        total: 0,
    });

    const makeACall = () => {
        setLoading(true);
        const page = data.page;
        getPhotos(page + 1).then((data) => {
            const {
                photos
            } = data;

            setData((prev) => ({
                page: photos.page,
                list: [
                    ...prev.list,
                    ...(photos.photo.map(({id, owner, title}) => ({title, id, author: owner})))
                ],
                total: photos.total
            }));
            setLoading(false);
        }).catch((...rest: any[]) => {
            setLoading(false);
            setFailed(true);
        });
    };

    React.useEffect(() => {
        makeACall();
    }, []);

    return (
        <div className="photo-preview-wrap">
            <div className="photo-preview">
                <InfinityScroll
                    threshold={0.75}
                    hasMore={data.total > data.list.length}
                    loading={loading}
                    loaderNode={<Spinner/>}
                    loadMore={() => {
                        makeACall();
                    }}
                >
                    <div className="photo-preview-items">
                        {data.list && data.list.map((item, index) => (
                            <PhotoLoader
                                key={`photo-key-${item.id}-${index}`}
                                {...item}
                            />))}
                    </div>
                </InfinityScroll>
                {failed && (
                    <div className="photo-preview-error">
                        <div className="photo-preview-error__title">
                            Error
                        </div>
                        <div className="photo-preview-error__description">
                            Can not retrieve data at this moment.
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PhotoPreviewPage;
