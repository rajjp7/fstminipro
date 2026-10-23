import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/product.dart';

class WishlistProvider extends ChangeNotifier {
  List<Product> _wishlist = [];
  static const String _storageKey = 'aura_mobile_wishlist';

  WishlistProvider() {
    _loadFromPrefs();
  }

  List<Product> get wishlist => _wishlist;
  int get totalWishlist => _wishlist.length;

  bool isInWishlist(String productId) {
    return _wishlist.any((item) => item.id == productId);
  }

  void toggleWishlist(Product product) {
    if (isInWishlist(product.id)) {
      _wishlist.removeWhere((item) => item.id == product.id);
    } else {
      _wishlist.add(product);
    }
    _saveToPrefs();
    notifyListeners();
  }

  void removeFromWishlist(String productId) {
    _wishlist.removeWhere((item) => item.id == productId);
    _saveToPrefs();
    notifyListeners();
  }

  void clearWishlist() {
    _wishlist.clear();
    _saveToPrefs();
    notifyListeners();
  }

  Future<void> _saveToPrefs() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final data = jsonEncode(_wishlist.map((e) => e.toJson()).toList());
      await prefs.setString(_storageKey, data);
    } catch (e) {
      debugPrint('Failed to save wishlist: $e');
    }
  }

  Future<void> _loadFromPrefs() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final data = prefs.getString(_storageKey);
      if (data != null) {
        final List<dynamic> decoded = jsonDecode(data);
        _wishlist = decoded.map((e) => Product.fromJson(e)).toList();
        notifyListeners();
      }
    } catch (e) {
      debugPrint('Failed to load wishlist: $e');
    }
  }
}
