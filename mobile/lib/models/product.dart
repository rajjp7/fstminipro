class ProductReview {
  final String id;
  final String userName;
  final double rating;
  final String date;
  final String comment;

  ProductReview({
    required this.id,
    required this.userName,
    required this.rating,
    required this.date,
    required this.comment,
  });

  Map<String, dynamic> toJson() => {
        'id': id,
        'userName': userName,
        'rating': rating,
        'date': date,
        'comment': comment,
      };

  factory ProductReview.fromJson(Map<String, dynamic> json) => ProductReview(
        id: json['id'] as String,
        userName: json['userName'] as String,
        rating: (json['rating'] as num).toDouble(),
        date: json['date'] as String,
        comment: json['comment'] as String,
      );
}

class Product {
  final String id;
  final String name;
  final String tagline;
  final String description;
  final double price;
  final double? originalPrice;
  final String category;
  final String imageUrl;
  final List<String> galleryImages;
  final double rating;
  final int reviewsCount;
  final int stockAvailability;
  final bool isFeatured;
  final bool isTrending;
  final bool isBestSeller;
  final Map<String, String> specifications;
  final List<String> features;
  final List<ProductReview> reviews;

  Product({
    required this.id,
    required this.name,
    required this.tagline,
    required this.description,
    required this.price,
    this.originalPrice,
    required this.category,
    required this.imageUrl,
    required this.galleryImages,
    required this.rating,
    required this.reviewsCount,
    required this.stockAvailability,
    this.isFeatured = false,
    this.isTrending = false,
    this.isBestSeller = false,
    required this.specifications,
    required this.features,
    required this.reviews,
  });

  int get discountPercentage {
    if (originalPrice == null || originalPrice! <= price) return 0;
    return (((originalPrice! - price) / originalPrice!) * 100).round();
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'name': name,
        'tagline': tagline,
        'description': description,
        'price': price,
        'originalPrice': originalPrice,
        'category': category,
        'imageUrl': imageUrl,
        'galleryImages': galleryImages,
        'rating': rating,
        'reviewsCount': reviewsCount,
        'stockAvailability': stockAvailability,
        'isFeatured': isFeatured,
        'isTrending': isTrending,
        'isBestSeller': isBestSeller,
        'specifications': specifications,
        'features': features,
        'reviews': reviews.map((r) => r.toJson()).toList(),
      };

  factory Product.fromJson(Map<String, dynamic> json) => Product(
        id: json['id'] as String,
        name: json['name'] as String,
        tagline: json['tagline'] as String? ?? '',
        description: json['description'] as String,
        price: (json['price'] as num).toDouble(),
        originalPrice: json['originalPrice'] != null
            ? (json['originalPrice'] as num).toDouble()
            : null,
        category: json['category'] as String,
        imageUrl: json['imageUrl'] as String,
        galleryImages: (json['galleryImages'] as List<dynamic>?)
                ?.map((e) => e as String)
                .toList() ??
            [json['imageUrl'] as String],
        rating: (json['rating'] as num).toDouble(),
        reviewsCount: json['reviewsCount'] as int,
        stockAvailability: json['stockAvailability'] as int,
        isFeatured: json['isFeatured'] as bool? ?? false,
        isTrending: json['isTrending'] as bool? ?? false,
        isBestSeller: json['isBestSeller'] as bool? ?? false,
        specifications: Map<String, String>.from(json['specifications'] ?? {}),
        features: (json['features'] as List<dynamic>?)
                ?.map((e) => e as String)
                .toList() ??
            [],
        reviews: (json['reviews'] as List<dynamic>?)
                ?.map((e) => ProductReview.fromJson(e as Map<String, dynamic>))
                .toList() ??
            [],
      );
}

class Category {
  final String id;
  final String name;
  final String slug;
  final String description;
  final String imageUrl;
  final int itemCount;

  Category({
    required this.id,
    required this.name,
    required this.slug,
    required this.description,
    required this.imageUrl,
    required this.itemCount,
  });
}
