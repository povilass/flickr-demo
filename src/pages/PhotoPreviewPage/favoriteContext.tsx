import * as React from "react";
import {PropsWithChildren} from "react";

type FavoriteContextValue = {
    isFavorite: (value: string) => boolean;
    add: (value: string) => void;
    remove: (value: string) => void;
}

export const FavoriteContext = React.createContext<FavoriteContextValue>({
    isFavorite: () => false,
    add: () => null,
    remove: () => null,
});

const LOCAL_STORE_KEY = "favoriteItems";

export const FavoriteProvider: React.FC<PropsWithChildren<{}>> = (props) => {

    const [favorite, setFavorite] = React.useState<string[]>(JSON.parse(localStorage.getItem(LOCAL_STORE_KEY) ?? "[]"));

    React.useEffect(() => {
        localStorage.setItem(LOCAL_STORE_KEY, JSON.stringify(favorite))
    }, [favorite]);

    const isFavorite = (value: string) => {
        return favorite.includes(value);
    };

    const add = (value: string) => {
        setFavorite((prev) => {
            return [...prev, value]
        });
    };

    const remove = (value: string) => {
        setFavorite((prev) => {
            return prev.filter((item) => item !== value)
        });
    };

    const {children} = props;

    return (
        <FavoriteContext.Provider value={{
            isFavorite,
            add,
            remove
        }}>
            {children}
        </FavoriteContext.Provider>
    );
};
