import React, {useContext} from "react";
import {getSizes} from "../../api";
import {SizeItem} from "../../api/getSizes";
import {Picture} from "../../components";
import {FavoriteContext} from "./favoriteContext";

export type PhotoPreviewProps = {
    id: string;
    title: string;
    author: string;
};

export type PhotoState = {
    sizes: Record<string, SizeItem>;
};

const PhotoLoader = React.forwardRef<any, PhotoPreviewProps>((props, ref) => {
    const {
        id,
        author,
        title
    } = props;

    const favUtils = useContext(FavoriteContext);

    const [sizes, setSizes] = React.useState<Record<string, SizeItem>>({});

    const loadSizes = React.useCallback(() => {
        getSizes(id).then((data) => {
            const sizes = data.sizes.size.reduce<PhotoState["sizes"]>((acc, item) => {
                acc[item.label] = item;
                return acc;
            }, {});

            setSizes(sizes);
        });
    }, [id]);

    React.useMemo(() => {
        loadSizes();
    }, []);


    const isFavorite = favUtils.isFavorite(id);

    const handleClick = () => {
        if (isFavorite) {
            favUtils.remove(id);
        } else {
            favUtils.add(id);
        }
    };


    return (
        <Picture
            sources={[
                {media: "(min-width: 75.em)", srcSet: sizes["Medium"]?.source},
                {media: "(min-width: 56.25em)", srcSet: sizes["Small 400"]?.source},
                {media: "(min-width: 37.5em)", srcSet: sizes["Small 320"]?.source},
            ]}
            src={sizes["Small"]?.source}
            title={title}
            author={author}
            isFavorite={isFavorite}
            onButtonClick={handleClick}
        />
    );
});

export default PhotoLoader;
