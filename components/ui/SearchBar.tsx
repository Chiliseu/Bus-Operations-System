"use client";
import React from "react";
import Image from "next/image";

type SearchBarProps = {
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar = ({ placeholder = "Search", className = "", value = "", onChange }: SearchBarProps) => {
  return (
    <div className={`position-relative ${className}`}>
      {/* Search Input */}
      <input
        type="search"
        value={value}
        className="form-control rounded border border-gray-300 shadow-sm pe-4" // ✅ Adds right padding for icon space
        placeholder={placeholder}
        onChange={onChange}
        aria-label="Search"
      />

      {/* Search Icon (Inside Input, at the Right) */}
      <div className="position-absolute end-0 top-50 translate-middle-y pe-2">
        <Image src="/icons/search-icon.svg" alt="Search" width={16} height={16} />
      </div>
    </div>
  );
};

export default SearchBar;