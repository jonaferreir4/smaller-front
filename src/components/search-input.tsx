type SearchInputProps = {
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchInput({ placeholder, value, onChange }: SearchInputProps) {
    return <input 
        type="text"
        placeholder={placeholder} 
        value={value}
        onChange={onChange}
        className="input input-bordered  border-primary input-lg w-full" 
    />;
}