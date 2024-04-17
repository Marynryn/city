import { LoadMoreBtn } from "./Button.styled"

export const Button = ({ onClick }) => {
    return (
        <LoadMoreBtn type="button" onClick={() => onClick()} >
            Поиск

        </LoadMoreBtn >
    )
}
