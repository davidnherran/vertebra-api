interface EnvironmentVariables {
  port?: string;
  dev: boolean;
  cors?: string;
  dbHost?: string;
  dbPort?: string;
  dbUsername?: string;
  dbPassword?: string;
  dbName?: string;
  jwtSecretKey?: string;
}

interface CreateUser {
  username: string;
  password: string;
  displayName: string;
}

interface UserDB extends CreateUser {
  id: number;
  password?: string;
}

interface PropsJWT {
  user: UserDB | string;
}

interface SignIn {
  username: string;
  password: string;
}

interface Get {
  limit: Array<number>;
  controller: string;
}

interface LocationsCreate {
  name: !string;
  type: !string;
  dimension: !string;
  residents: !Array<string>;
  url: !string;
  created: !string;
}
interface EpisodesCreate {
  name: !string;
  air_date: !string;
  episode: !string;
  characters: !Array<string>;
  url: !string;
  created: !string;
}

interface CharactersCreate {
  name: !string;
  type: !string;
  status: !string;
  species: !string;
  gender: !string;
  origin: {
    name: !string;
    url: !string;
  };
  location: {
    name: !string;
    url: !string;
  };
  image: !string;
  episode: !string[];
  url: !string;
  created: !string;
}

interface LocationsUpdate {
  name?: string;
  type?: string;
  dimension?: string;
  residents?: Array<string>;
  url?: string;
  created?: string;
}
interface EpisodesUpdate {
  name?: string;
  air_date?: string;
  episode?: string;
  characters?: Array<string>;
  url?: string;
  created?: string;
}

interface CharactersUpdate {
  name?: string;
  type?: string;
  status?: string;
  species?: string;
  gender?: string;
  origin?: {
    name?: string;
    url?: string;
  };
  location?: {
    name?: string;
    url?: string;
  };
  image?: string;
  episode?: string[];
  url?: string;
  created?: string;
}