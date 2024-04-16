import { useState } from "react";
import { SearchBtn, SearchForm, Input, SearchBtnLabel, HeaderSearchbar } from "./Searchbar.styled";

export function Searchbar({ onSearch }) {
    const [query, setQuery] = useState("")


    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        onSearch(query);
    }
    return (
        <HeaderSearchbar >
            <SearchForm onSubmit={handleSubmit}>
                <Input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Введите название города"
                />
                <SearchBtn type="submit">
                    <SearchBtnLabel >Search</SearchBtnLabel>
                </SearchBtn>
            </SearchForm>
        </HeaderSearchbar>
    )
}