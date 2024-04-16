import { Gallery } from "components/ImageGallery/ImageGallery.styled";
import { GalleryItem } from "./ImageGalleryItem.styled";


const ImageGalleryItem = ({ props, onClick }) => {

    return (
        <Gallery >
            {props.map(({ largeImageURL, tags, webformatURL, id }) => (<GalleryItem className="gallery-item" key={id}>
                <img src={webformatURL} alt={tags} onClick={() => onClick(largeImageURL)} width={280} height={200} />
            </GalleryItem>))
            }  </Gallery>
    );
};

export default ImageGalleryItem;

