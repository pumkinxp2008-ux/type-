export interface User {
  id: number;
  name: string;
  surname?: string;
  pets: string[];
  colors: string[];
}

export interface IdResponse {
  id: number;
}

export interface ErrorResponse {
  error: string;
}