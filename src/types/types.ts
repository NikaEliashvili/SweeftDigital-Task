export interface Image {
  alt_description: string;
  blur_hash: string;
  breadcrumbs: any[];
  color: string;
  created_at: string;
  current_user_collections: any[];
  description: string | null;
  height: number;
  id: string;
  liked_by_user: boolean;
  likes: number;
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  promoted_at: string | null;
  slug: string;
  sponsorship: any | null;
  topic_submissions: {
    [key: string]: any;
  };
  updated_at: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    // Add more if needed
  };
  user: {
    id: string;
    updated_at: string;
    username: string;
    name: string;
    first_name: string;
    last_name: string;
    location: string;
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
  };
  width: number;
}

export interface Statistics {
  id: string;
  downloads: {
    total: number;
  };
  views: {
    total: number;
  };
  likes: {
    total: number;
  };
}

export interface CachedImages {
  [query: string]: Image[];
}
