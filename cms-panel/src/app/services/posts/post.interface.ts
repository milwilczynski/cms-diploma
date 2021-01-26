export interface Post {
  id: number;
  siteId: number;
  title: string;
  subtitle: string;
  content: string;
  user: {
    id: number;
    login: string;
  };
  site: {
    id: number;
    title: string;
  };
}
