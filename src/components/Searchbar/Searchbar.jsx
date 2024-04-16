import { useState } from "react";
import { SearchBtn, SearchForm, Input, SearchBtnLabel, HeaderSearchbar } from "./Searchbar.styled";

export function Searchbar({ onSubmit }) {
    const [query, setQuery] = useState("")

    const handleSubmit = event => {
        event.preventDefault();

        onSubmit(query);
        reset();
    };
    const handleChange = event => {
        setQuery(event.currentTarget.value)
    }
    const reset = () => {
        setQuery('');
    };

    return (
        <HeaderSearchbar >
            <SearchForm onSubmit={handleSubmit}>
                <Input
                    className="input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={handleChange}
                />
                <SearchBtn type="submit">
                    <SearchBtnLabel >Search</SearchBtnLabel>
                </SearchBtn>
            </SearchForm>
        </HeaderSearchbar>
    )
}
