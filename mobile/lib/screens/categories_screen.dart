import 'package:flutter/material.dart';
import '../data/sample_data.dart';
import '../widgets/category_card.dart';

class CategoriesScreen extends StatelessWidget {
  const CategoriesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('All Categories'),
      ),
      body: ListView.separated(
        padding: const EdgeInsets.all(16),
        itemCount: sampleCategories.length,
        separatorBuilder: (_, __) => const SizedBox(height: 14),
        itemBuilder: (context, index) {
          final cat = sampleCategories[index];
          return CategoryCardWidget(category: cat);
        },
      ),
    );
  }
}
