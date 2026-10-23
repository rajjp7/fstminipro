import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/cart_item.dart';

class AuthProvider extends ChangeNotifier {
  UserModel? _user;
  List<OrderModel> _orders = [];
  static const String _userKey = 'aura_mobile_user';
  static const String _ordersKey = 'aura_mobile_orders';

  AuthProvider() {
    _loadFromPrefs();
  }

  UserModel? get user => _user;
  bool get isAuthenticated => _user != null;
  List<OrderModel> get orders => _orders;

  Future<void> login(String email, {String? name, String? password}) async {
    final displayName = name ??
        (email.contains('@')
            ? email.split('@')[0].replaceAll(RegExp(r'[._]'), ' ')
            : 'Alex Rivera');

    _user = UserModel(
      id: 'usr-${DateTime.now().millisecondsSinceEpoch}',
      name: displayName.isNotEmpty ? displayName : 'Alex Rivera',
      email: email,
      phone: '+1 (555) 349-2041',
      avatarUrl:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    );
    await _saveToPrefs();
    notifyListeners();
  }

  Future<void> register(String name, String email, {String? password}) async {
    _user = UserModel(
      id: 'usr-${DateTime.now().millisecondsSinceEpoch}',
      name: name,
      email: email,
      phone: '+1 (555) 000-1122',
      avatarUrl:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop',
    );
    await _saveToPrefs();
    notifyListeners();
  }

  Future<void> logout() async {
    _user = null;
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_userKey);
    notifyListeners();
  }

  OrderModel createOrder({
    required List<OrderItem> items,
    required double subtotal,
    required double tax,
    required double shipping,
    required double discount,
    required double total,
    required ShippingAddress shippingAddress,
    required String paymentMethod,
  }) {
    final orderId = 'ORD-${(10000 + DateTime.now().millisecond * 99).toInt()}';
    final now = DateTime.now();
    final months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    final dateString =
        '${months[now.month - 1]} ${now.day}, ${now.year}';

    final newOrder = OrderModel(
      id: orderId,
      date: dateString,
      items: items,
      subtotal: subtotal,
      tax: tax,
      shipping: shipping,
      discount: discount,
      total: total,
      shippingAddress: shippingAddress,
      status: 'Processing',
      paymentMethod: paymentMethod,
      trackingNumber: 'TRK-${DateTime.now().millisecondsSinceEpoch}',
      estimatedDelivery: '3-5 business days',
    );

    _orders.insert(0, newOrder);
    _saveToPrefs();
    notifyListeners();
    return newOrder;
  }

  Future<void> _saveToPrefs() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      if (_user != null) {
        await prefs.setString(_userKey, jsonEncode(_user!.toJson()));
      } else {
        await prefs.remove(_userKey);
      }
      final ordersJson = jsonEncode(_orders.map((o) => o.toJson()).toList());
      await prefs.setString(_ordersKey, ordersJson);
    } catch (e) {
      debugPrint('Error saving auth to prefs: $e');
    }
  }

  Future<void> _loadFromPrefs() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final userData = prefs.getString(_userKey);
      if (userData != null) {
        _user = UserModel.fromJson(jsonDecode(userData));
      } else {
        // Default sample user for demo
        _user = UserModel(
          id: 'usr-demo',
          name: 'Alex Rivera',
          email: 'alex.rivera@example.com',
          phone: '+1 (555) 349-2041',
          avatarUrl:
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
        );
      }

      final ordersData = prefs.getString(_ordersKey);
      if (ordersData != null) {
        final List<dynamic> decoded = jsonDecode(ordersData);
        _orders = decoded.map((e) => OrderModel.fromJson(e)).toList();
      } else {
        // Initial sample order
        _orders = [
          OrderModel(
            id: 'ORD-94821',
            date: 'Oct 14, 2026',
            items: [
              OrderItem(
                productId: 'prod-1',
                productName: 'Aura Pro Wireless ANC Headphones',
                productImage:
                    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop',
                price: 249.99,
                quantity: 1,
              ),
            ],
            subtotal: 249.99,
            tax: 20.0,
            shipping: 0.0,
            discount: 0.0,
            total: 269.99,
            shippingAddress: ShippingAddress(
              fullName: 'Alex Rivera',
              email: 'alex.rivera@example.com',
              phone: '+1 (555) 349-2041',
              street: '742 Evergreen Terrace',
              city: 'San Francisco',
              state: 'CA',
              postalCode: '94107',
            ),
            status: 'Delivered',
            paymentMethod: 'Apple Pay',
            trackingNumber: 'TRK-98321495',
            estimatedDelivery: 'Delivered on Oct 17, 2026',
          ),
        ];
      }
      notifyListeners();
    } catch (e) {
      debugPrint('Error loading auth from prefs: $e');
    }
  }
}
