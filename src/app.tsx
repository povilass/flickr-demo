import * as React from "react";
import './assets/scss/main.scss';
import {PhotoPreviewPage} from "./pages/PhotoPreviewPage";
import {FavoriteProvider} from "./pages/PhotoPreviewPage/favoriteContext";

export class App extends React.Component {
    render() {
        return (
            <div className="app-container">
                <div className="app">
                    <div className="container">
                        <div className="page-content">
                            {/*TODO: implement routing if needed*/}
                            <FavoriteProvider>
                                <PhotoPreviewPage/>
                            </FavoriteProvider>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
