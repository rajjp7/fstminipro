import 'product.dart';

class CartItem {
  final Product product;
  int quantity;

  CartItem({
    required this.product,
    this.quantity = 1,
  });

  double get totalPrice => product.price * quantity;

  Map<String, dynamic> toJson() => {
        'product': product.toJson(),
        'quantity': quantity,
      };

  factory CartItem.fromJson(Map<String, dynamic> json) => CartItem(
        product: Product.fromJson(json['product'] as Map<String, dynamic>),
        quantity: json['quantity'] as int,
      );
}

class ShippingAddress {
  final String fullName;
  final String email;
  final String phone;
  final String street;
  final String city;
  final String state;
  final String postalCode;
  final String country;

  ShippingAddress({
    required this.fullName,
    required this.email,
    required this.phone,
    required this.street,
    required this.city,
    required this.state,
    required this.postalCode,
    this.country = 'United States',
  });

  Map<String, dynamic> toJson() => {
        'fullName': fullName,
        'email': email,
        'phone': phone,
        'street': street,
        'city': city,
        'state': state,
        'postalCode': postalCode,
        'country': country,
      };

  factory ShippingAddress.fromJson(Map<String, dynamic> json) => ShippingAddress(
        fullName: json['fullName'] as String,
        email: json['email'] as String,
        phone: json['phone'] as String,
        street: json['street'] as String,
        city: json['city'] as String,
        state: json['state'] as String,
        postalCode: json['postalCode'] as String,
        country: json['country'] as String? ?? 'United States',
      );
}

class OrderItem {
  final String productId;
  final String productName;
  final String productImage;
  final double price;
  final int quantity;

  OrderItem({
    required this.productId,
    required this.productName,
    required this.productImage,
    required this.price,
    required this.quantity,
  });

  Map<String, dynamic> toJson() => {
        'productId': productId,
        'productName': productName,
        'productImage': productImage,
        'price': price,
        'quantity': quantity,
      };

  factory OrderItem.fromJson(Map<String, dynamic> json) => OrderItem(
        productId: json['productId'] as String,
        productName: json['productName'] as String,
        productImage: json['productImage'] as String,
        price: (json['price'] as num).toDouble(),
        quantity: json['quantity'] as int,
      );
}

class OrderModel {
  final String id;
  final String date;
  final List<OrderItem> items;
  final double subtotal;
  final double tax;
  final double shipping;
  final double discount;
  final double total;
  final ShippingAddress shippingAddress;
  final String status;
  final String paymentMethod;
  final String? trackingNumber;
  final String? estimatedDelivery;

  OrderModel({
    required this.id,
    required this.date,
    required this.items,
    required this.subtotal,
    required this.tax,
    required this.shipping,
    required this.discount,
    required this.total,
    required this.shippingAddress,
    required this.status,
    required this.paymentMethod,
    this.trackingNumber,
    this.estimatedDelivery,
  });

  Map<String, dynamic> toJson() => {
        'id': id,
        'date': date,
        'items': items.map((i) => i.toJson()).toList(),
        'subtotal': subtotal,
        'tax': tax,
        'shipping': shipping,
        'discount': discount,
        'total': total,
        'shippingAddress': shippingAddress.toJson(),
        'status': status,
        'paymentMethod': paymentMethod,
        'trackingNumber': trackingNumber,
        'estimatedDelivery': estimatedDelivery,
      };

  factory OrderModel.fromJson(Map<String, dynamic> json) => OrderModel(
        id: json['id'] as String,
        date: json['date'] as String,
        items: (json['items'] as List<dynamic>)
            .map((e) => OrderItem.fromJson(e as Map<String, dynamic>))
            .toList(),
        subtotal: (json['subtotal'] as num).toDouble(),
        tax: (json['tax'] as num).toDouble(),
        shipping: (json['shipping'] as num).toDouble(),
        discount: (json['discount'] as num).toDouble(),
        total: (json['total'] as num).toDouble(),
        shippingAddress:
            ShippingAddress.fromJson(json['shippingAddress'] as Map<String, dynamic>),
        status: json['status'] as String,
        paymentMethod: json['paymentMethod'] as String,
        trackingNumber: json['trackingNumber'] as String?,
        estimatedDelivery: json['estimatedDelivery'] as String?,
      );
}

class UserModel {
  final String id;
  final String name;
  final String email;
  final String phone;
  final String avatarUrl;

  UserModel({
    required this.id,
    required this.name,
    required this.email,
    required this.phone,
    required this.avatarUrl,
  });

  Map<String, dynamic> toJson() => {
        'id': id,
        'name': name,
        'email': email,
        'phone': phone,
        'avatarUrl': avatarUrl,
      };

  factory UserModel.fromJson(Map<String, dynamic> json) => UserModel(
        id: json['id'] as String,
        name: json['name'] as String,
        email: json['email'] as String,
        phone: json['phone'] as String,
        avatarUrl: json['avatarUrl'] as String,
      );
}
