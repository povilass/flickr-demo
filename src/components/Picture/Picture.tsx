import * as React from "react";
import {Button} from "../index";


export type PictureProps = {
    loading?: boolean;
    sources?: React.SourceHTMLAttributes<HTMLSourceElement>[];
    src: string;
    alt?: string;
    title?: string;
    author?: string;
    isFavorite?: boolean;
    onButtonClick: () => void;
};

const Picture = React.forwardRef<any, PictureProps>((props, ref) => {

    const {
        sources,
        src,
        alt,
        title,
        author,
        onButtonClick,
        isFavorite,
    } = props;

    return (
        <div ref={ref} className="picture-wrap">
            <picture className="picture">
                {sources && sources.map((sourceProps, index) => {
                    return (<source {...sourceProps} key={`source-key-${index}`}/>);
                })}
                <img loading={"lazy"} src={src} alt={alt} className="picture__img"/>
                <div className="picture-details">
                    <div className="picture-details__container">
                        <div className="picture-details__title" title={title}>{title}</div>
                        <div className="picture-details__divider"/>
                        <div className="picture-details__author">{author}</div>
                        <div>
                            <Button
                                type="button"
                                variant="outlined"
                                className="picture-details__button"
                                onClick={onButtonClick}
                            >
                                {isFavorite ? 'Dislike' : 'Favourite'}
                            </Button>
                        </div>
                    </div>
                </div>
            </picture>
        </div>
    );
});

export default Picture;
