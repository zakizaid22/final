import 'package:flutter/material.dart';
import 'map_page.dart'; // Import your MapPage widget here

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Routing Application',
      theme: ThemeData(
          // Your theme data here
          ),
      // ignore: prefer_const_constructors
      home: MapPage(), // MapPage wrapped inside MaterialApp
    );
  }
}
