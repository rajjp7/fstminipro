import 'package:flutter/material.dart';
import '../data/sample_data.dart';
import '../models/product.dart';
import '../theme/app_theme.dart';
import '../widgets/product_card.dart';

class SearchListingScreen extends StatefulWidget {
  final String initialCategory;
  final String initialQuery;

  const SearchListingScreen({
    super.key,
    this.initialCategory = 'all',
    this.initialQuery = '',
  });

  @override
  State<SearchListingScreen> createState() => _SearchListingScreenState();
}

class _SearchListingScreenState extends State<SearchListingScreen> {
  late String _selectedCategory;
  late TextEditingController _searchController;
  String _sortBy = 'featured';
  bool _inStockOnly = false;

  @override
  void initState() {
    super.initState();
    _selectedCategory = widget.initialCategory;
    _searchController = TextEditingController(text: widget.initialQuery);
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  List<Product> get _filteredProducts {
    var list = sampleProducts.where((p) {
      if (_selectedCategory != 'all' && p.category != _selectedCategory) {
        return false;
      }
      final query = _searchController.text.trim().toLowerCase();
      if (query.isNotEmpty) {
        final matchName = p.name.toLowerCase().contains(query);
        final matchDesc = p.description.toLowerCase().contains(query);
        final matchCat = p.category.toLowerCase().contains(query);
        if (!matchName && !matchDesc && !matchCat) return false;
      }
      if (_inStockOnly && p.stockAvailability <= 0) {
        return false;
      }
      return true;
    }).toList();

    if (_sortBy == 'price_low') {
      list.sort((a, b) => a.price.compareTo(b.price));
    } else if (_sortBy == 'price_high') {
      list.sort((a, b) => b.price.compareTo(a.price));
    } else if (_sortBy == 'rating') {
      list.sort((a, b) => b.rating.compareTo(a.rating));
    }

    return list;
  }

  @override
  Widget build(BuildContext context) {
    final products = _filteredProducts;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Catalog & Search'),
      ),
      body: Column(
        children: [
          // Search Input
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 8, 16, 8),
            child: TextField(
              controller: _searchController,
              onChanged: (_) => setState(() {}),
              decoration: InputDecoration(
                hintText: 'Search products by name or category...',
                prefixIcon: const Icon(Icons.search, size: 20),
                suffixIcon: _searchController.text.isNotEmpty
                    ? IconButton(
                        icon: const Icon(Icons.clear, size: 18),
                        onPressed: () {
                          _searchController.clear();
                          setState(() {});
                        },
                      )
                    : null,
              ),
            ),
          ),

          // Category Chips Horizontal Scroll
          SizedBox(
            height: 44,
            child: ListView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 16),
              children: [
                _buildCategoryChip('All', 'all'),
                ...sampleCategories.map((c) => _buildCategoryChip(c.name, c.slug)),
              ],
            ),
          ),

          // Sort and In-Stock Row
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  '${products.length} Products',
                  style: const TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.bold,
                    color: AppColors.textSecondary,
                  ),
                ),

                Row(
                  children: [
                    // In-stock toggle
                    InkWell(
                      onTap: () {
                        setState(() {
                          _inStockOnly = !_inStockOnly;
                        });
                      },
                      child: Row(
                        children: [
                          Icon(
                            _inStockOnly
                                ? Icons.check_box
                                : Icons.check_box_outline_blank,
                            size: 18,
                            color: _inStockOnly
                                ? AppColors.accentEmerald
                                : AppColors.textMuted,
                          ),
                          const SizedBox(width: 4),
                          const Text('In Stock', style: TextStyle(fontSize: 12)),
                        ],
                      ),
                    ),
                    const SizedBox(width: 14),

                    // Sort dropdown
                    DropdownButton<String>(
                      value: _sortBy,
                      underline: const SizedBox(),
                      icon: const Icon(Icons.arrow_drop_down, size: 18),
                      style: const TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                        color: AppColors.textPrimary,
                      ),
                      items: const [
                        DropdownMenuItem(
                            value: 'featured', child: Text('Featured')),
                        DropdownMenuItem(
                            value: 'price_low', child: Text('Price: Low')),
                        DropdownMenuItem(
                            value: 'price_high', child: Text('Price: High')),
                        DropdownMenuItem(
                            value: 'rating', child: Text('Top Rated')),
                      ],
                      onChanged: (val) {
                        if (val != null) {
                          setState(() {
                            _sortBy = val;
                          });
                        }
                      },
                    ),
                  ],
                ),
              ],
            ),
          ),

          // Products Grid
          Expanded(
            child: products.isEmpty
                ? Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(Icons.search_off,
                            size: 48, color: AppColors.textMuted),
                        const SizedBox(height: 12),
                        const Text(
                          'No products found',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: AppColors.textPrimary,
                          ),
                        ),
                        const SizedBox(height: 4),
                        const Text(
                          'Try adjusting your search or category filters',
                          style: TextStyle(
                            fontSize: 12,
                            color: AppColors.textSecondary,
                          ),
                        ),
                        const SizedBox(height: 16),
                        OutlinedButton(
                          onPressed: () {
                            setState(() {
                              _selectedCategory = 'all';
                              _searchController.clear();
                              _inStockOnly = false;
                              _sortBy = 'featured';
                            });
                          },
                          child: const Text('Reset Filters'),
                        ),
                      ],
                    ),
                  )
                : GridView.builder(
                    padding: const EdgeInsets.all(16),
                    itemCount: products.length,
                    gridDelegate:
                        const SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 2,
                      childAspectRatio: 0.65,
                      crossAxisSpacing: 12,
                      mainAxisSpacing: 12,
                    ),
                    itemBuilder: (context, index) {
                      return ProductCardWidget(product: products[index]);
                    },
                  ),
          ),
        ],
      ),
    );
  }

  Widget _buildCategoryChip(String label, String slug) {
    final isSelected = _selectedCategory == slug;
    return Padding(
      padding: const EdgeInsets.only(right: 8.0),
      child: FilterChip(
        selected: isSelected,
        label: Text(label),
        labelStyle: TextStyle(
          color: isSelected ? Colors.white : AppColors.textPrimary,
          fontSize: 12,
          fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
        ),
        backgroundColor: Colors.white,
        selectedColor: AppColors.primary,
        checkmarkColor: Colors.white,
        side: BorderSide(
          color: isSelected ? AppColors.primary : AppColors.border,
        ),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        onSelected: (_) {
          setState(() {
            _selectedCategory = slug;
          });
        },
      ),
    );
  }
}
