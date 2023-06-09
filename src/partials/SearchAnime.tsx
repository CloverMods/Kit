"use client";
import React, { useState, useEffect } from "react";
import SearchAnimeCard from "@/components/SearchAnimeCard";
import { TSearchAnime } from "@/@types/AnimeType";
import useAnime from "@/hooks/useAnime";
import Loading from "@/components/LoadingSingle";
import Link from "next/link";

function Search() {
  const [search, setSearch] = useState("");
  const [searchFilter, setSearchFilter] = useState<TSearchAnime[]>([]);
  const [loading, setLoading] = useState(false);
  const { getSearch } = useAnime();

  useEffect(() => {
    if (search === "") return setSearchFilter([]);
    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);
      const data = await getSearch(search);
      setSearchFilter(data.results.slice(0, 5));
      setLoading(false);
    }, 1000);
    return () => {
      clearTimeout(delayDebounceFn);
    };
  }, [search]);

  const handleSearchCallback = () => {
    setSearch("");
    setSearchFilter([]);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search Anime"
        className="input input-bordered w-full lg:input-md input-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="absolute z-50">
        <div
          className="mt-1 bg-base-100 shadow-lg rounded-lg"
          style={{ width: "400px" }}
        >
          {loading ? (
            <div className="flex gap-5 items-center">
              <Loading />
              <p>Searching...</p>
            </div>
          ) : searchFilter.length > 0 ? (
            <>
              {searchFilter.map((anime) => (
                <SearchAnimeCard
                  key={anime.id}
                  id={anime.id}
                  title={
                    anime.title !== ""
                      ? anime.title
                      : anime.id.split("-").join(" ").toString()
                  }
                  src={anime.image}
                  additional={
                    anime.releaseDate + " | " + anime.subOrDub.toUpperCase() ??
                    ""
                  }
                  cb={handleSearchCallback}
                />
              ))}
              <Link
                className="btn btn-secondary w-full"
                href={`/search?q=${encodeURIComponent(search)}`}
                onClick={handleSearchCallback}
              >
                See More
              </Link>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default Search;
