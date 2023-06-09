import {
  TAnimeInfo,
  TEpisodeInfo,
  TAnimeInfoEpisode,
} from "@/@types/AnimeType";
import KitsunePlayer from "@/components/KitsunePlayer";
import useAnime from "@/hooks/useAnime";
import Link from "next/link";
import React from "react";
import { FaBackward, FaForward } from "react-icons/fa";

async function page({ params, searchParams }: any) {
  const { getInfo, getEpisode } = useAnime();
  const animeInfo: TAnimeInfo = await getInfo(params.slug);

  let episode: TAnimeInfoEpisode = searchParams.ep
    ? animeInfo.episodes.filter(
      (ep: TAnimeInfoEpisode) => ep.id === searchParams.ep
    )[0]
    : animeInfo.episodes[0];

  const episodeInfo: TEpisodeInfo = await getEpisode(
    episode.id,
    "vidstreaming"
  );

  return (
    <div className="flex lg:flex-row flex-col h-full">
      {/*Episode Panel*/}
      <div className="flex-1 lg:pl-5 lg:pr-5">
        <div className="flex-col">
          <KitsunePlayer episodeInfo={episodeInfo} animeInfo={animeInfo} />

          <div className="flex justify-between items-center lg:p-5 p-2 gap-5">
            <FaBackward size={25} className="hover:text-primary" />
            <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-pink-400">
              {animeInfo.title} | Episode: {episode.number}
            </p>

            <FaForward size={25} className="hover:text-primary" />
          </div>

          <div className="flex flex-col gap-5 mb-10 mt-10 ml-3 mr-3 lg:ml-0 lg:mr-0 lg:m-10 lg:mb-5 ">
            <p className="text-2xl uppercase font-bold">Episodes</p>
            <div className="grid lg:grid-cols-10 grid-cols-5 gap-4 max-h-[400px] overflow-y-auto">
              {animeInfo.episodes
                .reverse()
                .map((ep: TAnimeInfoEpisode, index: number) => (
                  <Link
                    href={`/anime/${animeInfo.id}/watch?ep=${ep.id}`}
                    key={index}
                    className={`btn btn-sm ${episode.id === ep.id
                        ? "btn-primary text-primary-content"
                        : "btn-secondary text-secondary-content"
                      }`}
                  >
                    {ep.number}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
      {/*Information Panel*/}
      <div className="relative lg:right-0 lg:w-1/4">
        <div
          className={`rounded-lg p-5 h-[90vh] lg:h-full w-full`}
          style={{
            backgroundImage: `url(${animeInfo.image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            filter: "blur(20px)",
            WebkitFilter: "blur(20px)",
          }}
        ></div>
        <div
          className={`rounded-lg absolute top-0 p-5 h-[90vh] lg:h-full w-full bg-gray-700 opacity-20`}
        ></div>
        <div className="absolute top-0 m-5 flex flex-col gap-5">
          <div className="flex lg:flex-row flex-col gap-3">
            <img
              src={animeInfo.image}
              width="150"
              height="150"
              className="rounded-lg object-cover"
            />
            <div className="flex-col">
              <p className="font-bold text-xl">{animeInfo.title}</p>
              <p>{animeInfo.otherName}</p>
              <div>
                Genre:
                {animeInfo.genres.map((genre: string, index: number) => (
                  <div
                    className="badge badge-primary mr-1 ml-1 text-primary-content"
                    key={index}
                  >
                    {genre}
                  </div>
                ))}
              </div>
              <p>Status: {animeInfo.status}</p>
              <p>Released: {animeInfo.releaseDate}</p>
              <p>Episodes: {animeInfo.totalEpisodes}</p>
            </div>
          </div>
          <div>
            <div className="max-h-[40vh] overflow-y-auto">
              {animeInfo.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
