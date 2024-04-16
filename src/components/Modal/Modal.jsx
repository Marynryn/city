import { useEffect } from "react";
import { createPortal } from "react-dom";
import { ModalBackdrop, ModalContent } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-root');
export default function Modal({ onClose, ImageUrl }) {


    const handleBackdropClick = event => {

        if (event.currentTarget === event.target) {
            onClose();
        }
    }
    useEffect(() => {
        const handleKeyDown = e => {
            if (e.code === "Escape") {
                onClose()
            }
        }
        document.addEventListener('keydown', handleKeyDown);

        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [onClose]);

    return createPortal(
        <ModalBackdrop onClick={handleBackdropClick} >
            <ModalContent><img src={ImageUrl} alt="" width={800} height={600} /></ModalContent>
        </ModalBackdrop>, modalRoot
    );
}
