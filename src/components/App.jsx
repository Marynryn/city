import { useState, useEffect } from "react";
import { serviceSeach } from "helpers/helpers";
import { Searchbar } from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import Modal from "./Modal/Modal";

export function App() {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isVisibleBtn, setIsVisibleBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);



  useEffect(() => {
    if (!query) {
      return
    }
    const getImage = async () => {
      setLoading(true);
      try {
        const dataImages = await serviceSeach(query, page);

        setPhotos(prevState => (prevState ? [...prevState, ...dataImages.hits] : dataImages.hits));
        setIsVisibleBtn(page < Math.ceil(dataImages.totalHits / 12));


      } catch (error) {
        setPhotos([]);
      } finally { setLoading(false) }
    }
    getImage()

  }, [query, page]
  );


  const handleSubmit = (query) => {
    setQuery(query);
    setPhotos([]);
    setPage(1);
    setIsVisibleBtn(false);

  }
  const onBtnLoadMoreClick = () => {
    setPage(page => page + 1);
  }
  const openModal = selectedImage => {
    setShowModal(true);
    setSelectedImage(selectedImage);
  }
  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <div
      style={{
        height: '100vh',
        display: 'block',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery props={photos} onClick={openModal} />
      {loading && <Loader />}
      {isVisibleBtn && (
        <Button onClick={onBtnLoadMoreClick} />
      )}
      {showModal && (
        <Modal onClose={closeModal} ImageUrl={selectedImage} />
      )}
    </div >
  );
};

