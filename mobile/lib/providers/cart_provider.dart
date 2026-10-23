import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/product.dart';
import '../models/cart_item.dart';

class CartProvider extends ChangeNotifier {
  List<CartItem> _items = [];
  String _discountCode = '';
  static const String _storageKey = 'aura_mobile_cart';
  static const String _couponKey = 'aura_mobile_coupon';

  CartProvider() {
    _loadFromPrefs();
  }

  List<CartItem> get items => _items;
  String get discountCode => _discountCode;

  int get totalItems => _items.fold(0, (sum, item) => sum + item.quantity);

  double get subtotal =>
      _items.fold(0.0, (sum, item) => sum + item.product.price * item.quantity);

  double get freeShippingThreshold => 100.0;

  double get shipping {
    if (subtotal == 0) return 0.0;
    return subtotal >= freeShippingThreshold ? 0.0 : 12.0;
  }

  double get tax => subtotal * 0.08;

  double get discount {
    if (_discountCode == 'AURA20') {
      return subtotal * 0.20;
    } else if (_discountCode == 'WELCOME10') {
      return subtotal > 10 ? 10.0 : subtotal;
    } else if (_discountCode == 'STUDENT15') {
      return subtotal * 0.15;
    }
    return 0.0;
  }

  double get total {
    final t = subtotal - discount + shipping + tax;
    return t < 0 ? 0.0 : t;
  }

  bool isInCart(String productId) {
    return _items.any((item) => item.product.id === productId);
  }

  int getQuantity(String productId) {
    final item = _items.firstWhere(
      (item) => item.product.id == productId,
      orElse: () => CartItem(
        product: Product(
          id: '',
          name: '',
          tagline: '',
          description: '',
          price: 0,
          category: '',
          imageUrl: '',
          galleryImages: [],
          rating: 0,
          reviewsCount: 0,
          stockAvailability: 0,
          specifications: {},
          features: [],
          reviews: [],
        ),
        quantity: 0,
      ),
    );
    return item.quantity;
  }

  void addToCart(Product product, {int quantity = 1}) {
    final index = _items.indexWhere((item) => item.product.id == product.id);
    if (index >= 0) {
      _items[index].quantity += quantity;
    } else {
      _items.add(CartItem(product: product, quantity: quantity));
    }
    _saveToPrefs();
    notifyListeners();
  }

  void updateQuantity(String productId, int newQuantity) {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    final index = _items.indexWhere((item) => item.product.id == productId);
    if (index >= 0) {
      _items[index].quantity = newQuantity;
      _saveToPrefs();
      notifyListeners();
    }
  }

  void removeFromCart(String productId) {
    _items.removeWhere((item) => item.product.id == productId);
    _saveToPrefs();
    notifyListeners();
  }

  void clearCart() {
    _items.clear();
    _discountCode = '';
    _saveToPrefs();
    notifyListeners();
  }

  bool applyCoupon(String code) {
    final clean = code.trim().toUpperCase();
    if (clean == 'AURA20' || clean == 'WELCOME10' || clean == 'STUDENT15') {
      _discountCode = clean;
      _saveToPrefs();
      notifyListeners();
      return true;
    }
    return false;
  }

  void removeCoupon() {
    _discountCode = '';
    _saveToPrefs();
    notifyListeners();
  }

  Future<void> _saveToPrefs() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final data = jsonEncode(_items.map((e) => e.toJson()).toList());
      await prefs.setString(_storageKey, data);
      await prefs.setString(_couponKey, _discountCode);
    } catch (e) {
      debugPrint('Failed to save cart to prefs: $e');
    }
  }

  Future<void> _loadFromPrefs() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final data = prefs.getString(_storageKey);
      if (data != null) {
        final List<dynamic> decoded = jsonDecode(data);
        _items = decoded.map((e) => CartItem.fromJson(e)).toList();
      }
      _discountCode = prefs.getString(_couponKey) ?? '';
      notifyListeners();
    } catch (e) {
      debugPrint('Failed to load cart from prefs: $e');
    }
  }
}
