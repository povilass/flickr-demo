import React, {ReactNode, useEffect, useRef} from 'react';


type InfiniteScrollProps = {
    loading: boolean;
    hasMore: boolean;
    children: ReactNode;
    loaderNode?: ReactNode;
    loadMore: () => void;
} & IntersectionObserverInit;

const InfiniteScroll = React.forwardRef<HTMLDivElement, InfiniteScrollProps>((props, ref) => {
    const {
        threshold = 1,
        root = null,
        rootMargin,
        children,
        loadMore,
        loading,
        loaderNode,
        hasMore
    } = props;

    const loader = useRef(null);

    useEffect(() => {

        const observer = new IntersectionObserver(handleObserver, {
            root,
            rootMargin,
            threshold
        });

        if (loader.current) {
            observer.observe(loader.current)
        }

        return () => {
            observer.disconnect();
        }
    }, [loading, threshold, loadMore, root]);


    const handleObserver = (entries: IntersectionObserverEntry[]) => {
        const target = entries[0];
        if (target.isIntersecting && !loading && hasMore) {
            loadMore();
        }
    };

    return (
        <div className="infinity-scroll-container" ref={ref}>
            <div className="infinity-scroll-container__list">
                {children}
                <div className="infinity-scroll-container__loading" ref={loader}>
                    {loading && loaderNode}
                </div>
            </div>
        </div>
    )
});

export default InfiniteScroll;
