export interface ProductReview {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  avatarUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  imageUrl: string;
  galleryImages: string[];
  rating: number;
  reviewsCount: number;
  stockAvailability: number;
  isFeatured?: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
  specifications: Record<string, string>;
  features: string[];
  reviews: ProductReview[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  itemCount: number;
  iconName: string;
}
