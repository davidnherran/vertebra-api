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

interface LocationsContent {
  id: !number;
  name: !string;
  type: !string;
  dimension: !string;
  resident: !Array<string>;
  url: !string;
  created: !string;
}

type LocationsResponse = { location: Array<LocationsContent> };
