export type TRecentAnime = {
  id: string;
  episodeId: string;
  episodeNumber: number;
  title: string;
  image: string;
  url: string;
};

export type TPopularAnime = {
  id: string;
  title: string;
  image: string;
  url: string;
};

export type TAnimeInfo = {
  id: string;
  title: string;
  url: string;
  image: string;
  releaseDate: string | null; // or null
  description: string | null; // or null
  genres: string[];
  subOrDub: string;
  type: string | null; // or null
  status: string;
  otherName: string | null; // or null
  totalEpisodes: number;
  episodes: TAnimeInfoEpisode[];
};

export type TAnimeInfoEpisode = {
  id: string;
  number: number;
  url: string;
};

export type TEpisodeInfo = {
  headers: {
    Referer: string;
    watchsb: string;
    "User-Agent": string;
  };
  sources: TEpisodeSources[];
};

export type TEpisodeSources = {
  url: string;
  quality: string;
  isM3U8: boolean;
};

export type TSearchAnime = {
  id: string;
  title: string;
  image: string;
  releaseDate: string | null;
  subOrDub: string;
};

export type TSpotlightAnime = {
  title: string;
  image: string;
  description: string;
  spotlight: string;
  episodeId: string;
};

export type TTrendingAnime = {
  position: string;
  image: string;
  title: string;
  episodeId: string;
};
