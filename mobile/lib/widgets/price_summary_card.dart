import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../theme/app_theme.dart';
import '../providers/cart_provider.dart';

class PriceSummaryCard extends StatefulWidget {
  final bool showCoupon;

  const PriceSummaryCard({super.key, this.showCoupon = true});

  @override
  State<PriceSummaryCard> createState() => _PriceSummaryCardState();
}

class _PriceSummaryCardState extends State<PriceSummaryCard> {
  final _couponController = TextEditingController();
  String? _couponError;

  @override
  void dispose() {
    _couponController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final cart = context.watch<CartProvider>();
    final amountForFree = cart.freeShippingThreshold - cart.subtotal;
    final progress = (cart.subtotal / cart.freeShippingThreshold).clamp(0.0, 1.0);

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Order Summary',
            style: TextStyle(
              fontSize: 15,
              fontWeight: FontWeight.bold,
              color: AppColors.textPrimary,
            ),
          ),
          const SizedBox(height: 12),

          // Free shipping bar
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: AppColors.surfaceMuted,
              borderRadius: BorderRadius.circular(12),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    const Icon(Icons.local_shipping_outlined,
                        size: 16, color: AppColors.accentEmerald),
                    const SizedBox(width: 6),
                    Expanded(
                      child: Text(
                        amountForFree > 0
                            ? 'Add \$${amountForFree.toStringAsFixed(2)} for Free Shipping'
                            : 'You unlocked Free Standard Shipping!',
                        style: const TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.bold,
                          color: AppColors.textPrimary,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                ClipRRect(
                  borderRadius: BorderRadius.circular(4),
                  child: LinearProgressIndicator(
                    value: progress,
                    minHeight: 5,
                    backgroundColor: Colors.white,
                    valueColor: const AlwaysStoppedAnimation<Color>(
                        AppColors.accentEmerald),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 14),

          // Rows
          _buildRow('Subtotal', '\$${cart.subtotal.toStringAsFixed(2)}'),
          if (cart.discount > 0)
            _buildRow(
              'Discount (${cart.discountCode})',
              '-\$${cart.discount.toStringAsFixed(2)}',
              isGreen: true,
            ),
          _buildRow(
            'Estimated Shipping',
            cart.shipping == 0 ? 'FREE' : '\$${cart.shipping.toStringAsFixed(2)}',
            isGreen: cart.shipping == 0,
          ),
          _buildRow('Estimated Tax (8%)', '\$${cart.tax.toStringAsFixed(2)}'),
          const Divider(height: 20, color: AppColors.border),

          // Coupon section
          if (widget.showCoupon) ...[
            if (cart.discountCode.isNotEmpty)
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
                decoration: BoxDecoration(
                  color: AppColors.accentEmerald.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'Coupon: ${cart.discountCode}',
                      style: const TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                        color: AppColors.accentEmerald,
                      ),
                    ),
                    InkWell(
                      onTap: () => cart.removeCoupon(),
                      child: const Text(
                        'Remove',
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.bold,
                          color: AppColors.accentRose,
                        ),
                      ),
                    ),
                  ],
                ),
              )
            else
              Row(
                children: [
                  Expanded(
                    child: SizedBox(
                      height: 40,
                      child: TextField(
                        controller: _couponController,
                        decoration: const InputDecoration(
                          hintText: 'Coupon (e.g. AURA20)',
                          contentPadding:
                              EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                        ),
                        textCapitalization: TextCapitalization.characters,
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  SizedBox(
                    height: 40,
                    child: ElevatedButton(
                      onPressed: () {
                        if (_couponController.text.trim().isEmpty) return;
                        final success =
                            cart.applyCoupon(_couponController.text);
                        if (!success) {
                          setState(() {
                            _couponError = 'Invalid code. Try AURA20';
                          });
                        } else {
                          setState(() {
                            _couponError = null;
                            _couponController.clear();
                          });
                        }
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.primary,
                        padding: const EdgeInsets.symmetric(horizontal: 14),
                      ),
                      child: const Text('Apply', style: TextStyle(fontSize: 12)),
                    ),
                  ),
                ],
              ),
            if (_couponError != null)
              Padding(
                padding: const EdgeInsets.only(top: 4.0),
                child: Text(
                  _couponError!,
                  style: const TextStyle(color: AppColors.accentRose, fontSize: 11),
                ),
              ),
            const Divider(height: 20, color: AppColors.border),
          ],

          // Total
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                'Total',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  color: AppColors.textPrimary,
                ),
              ),
              Text(
                '\$${cart.total.toStringAsFixed(2)}',
                style: const TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.w900,
                  color: AppColors.textPrimary,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildRow(String label, String value, {bool isGreen = false}) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 3.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: const TextStyle(fontSize: 12, color: AppColors.textSecondary),
          ),
          Text(
            value,
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.bold,
              color: isGreen ? AppColors.accentEmerald : AppColors.textPrimary,
            ),
          ),
        ],
      ),
    );
  }
}
