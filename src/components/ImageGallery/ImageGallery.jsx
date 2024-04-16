import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem"
import { Gallery } from "./ImageGallery.styled";

const ImageGallery = ({ props, onClick }) => {

    return (

        <Gallery>
            <ImageGalleryItem props={props} onClick={onClick} />
        </Gallery>
    );
};
export default ImageGallery;