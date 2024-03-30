// ignore_for_file: no_leading_underscores_for_local_identifiers, avoid_function_literals_in_foreach_calls, prefer_final_fields, avoid_print, unused_local_variable

import 'dart:async';
import 'package:final_routing_app/const.dart'; // Importing constants
import 'package:final_routing_app/sensors.dart';
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:location/location.dart'; // Location package for handling location
import 'package:flutter_polyline_points/flutter_polyline_points.dart'; // Package for polylines
import 'package:flutter_typeahead/flutter_typeahead.dart';

// Define MapPage widget
class MapPage extends StatefulWidget {
  const MapPage({Key? key}) : super(key: key);

  @override
  State<MapPage> createState() => _MapPageState(); // Create state for MapPage
}

// State class for MapPage widget>
class _MapPageState extends State<MapPage> {
  Location _locationController = Location(); // Location controller
  final Completer<GoogleMapController> _mapController =
      Completer<GoogleMapController>(); // Completer for GoogleMapController

  LatLng? _currentP; // Current position on the map
  final TextEditingController _searchController = TextEditingController();

  Map<PolylineId, Polyline> polylines = {}; // Polylines to be drawn on the map

  List<String> countries = [
    'United States',
    'Canada',
    'India',
    'Australia',
    'United Kingdom',
    'Germany',
    // Add more countries...
  ];

  // Initialize state
  @override
  void initState() {
    super.initState();
    getLocationUpdates();
    // Start listening for location updates
  }

  // Search functionality (implementation needed)
  void _searchLocation(String query) {}

  // Build the UI of the map page
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Scaffold(
          body: _currentP == null
              ? const Center(
                  child: Text(
                      "Loading ...."), // Show loading message if current position is null
                )
              : Stack(
                  children: [
                    GoogleMap(
                      zoomControlsEnabled: false,
                      onMapCreated: ((GoogleMapController controller) =>
                          _mapController
                              .complete(controller)), // Set up map controller
                      initialCameraPosition: CameraPosition(
                        target:
                            _currentP!, // Center map around current position
                        zoom: 13,
                      ),
                      markers:
                          _createMarkers(), // Call method to create markers
                      polylines: Set<Polyline>.of(
                          polylines.values), // Display polylines on the map
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      child: Container(
                        margin: const EdgeInsets.only(top: 50),
                        padding: const EdgeInsets.only(right: 16),
                        decoration: BoxDecoration(
                          color: Colors.grey[200],
                          borderRadius: BorderRadius.circular(24),
                        ),
                        child: Row(
                          children: [
                            IconButton(
                              icon: const Icon(Icons.search),
                              onPressed: () {},
                            ),
                            Expanded(
                              child: TypeAheadField(
                                textFieldConfiguration: TextFieldConfiguration(
                                  autofocus: true,
                                  controller: _searchController,
                                  decoration: const InputDecoration(
                                    hintText: 'Search country...',
                                  ),
                                ),
                                suggestionsCallback: (pattern) {
                                  return countries
                                      .where((country) => country
                                          .toLowerCase()
                                          .contains(pattern.toLowerCase()))
                                      .toList();
                                },
                                itemBuilder: (context, suggestion) {
                                  return ListTile(
                                    title: Text(suggestion),
                                  );
                                },
                                onSuggestionSelected: (suggestion) {
                                  // Handle when a suggestion is selected.
                                  _searchController.text = suggestion;
                                  print('Selected country: $suggestion');
                                },
                              ),
                            )
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
          floatingActionButton: Column(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              // Add some spacing between buttons
              FloatingActionButton(
                shape: const CircleBorder(),
                backgroundColor: Colors.white,
                child: const Icon(
                  Icons.share_location_outlined,
                  color: Colors.black,
                ),
                onPressed: () async {
                  _cameraToPosition(_currentP!);
                },
              ),
            ],
          ),
        ),
      ],
    );
  }

  // Animate camera to a specific position on the map
  Future<void> _cameraToPosition(LatLng pos) async {
    final GoogleMapController controller = await _mapController.future;
    CameraPosition _newCameraPosition = CameraPosition(
      target: pos,
      zoom: 13,
    );
    await controller.animateCamera(
      CameraUpdate.newCameraPosition(_newCameraPosition),
    );
  }

  // Request location updates
  Future<void> getLocationUpdates() async {
    bool _serviceEnabled;
    PermissionStatus _permissionGranted;
    _serviceEnabled = await _locationController.serviceEnabled();
    if (_serviceEnabled) {
      _serviceEnabled = await _locationController.requestService();
    } else {
      return;
    }
    _permissionGranted = await _locationController.hasPermission();
    if (_permissionGranted == PermissionStatus.denied) {
      _permissionGranted = await _locationController.requestPermission();
      if (_permissionGranted != PermissionStatus.granted) {
        return;
      }
    }

    // Listen for location changes
    _locationController.onLocationChanged
        .listen((LocationData currentLocation) {
      if (currentLocation.latitude != null &&
          currentLocation.longitude != null) {
        setState(() {
          _currentP =
              LatLng(currentLocation.latitude!, currentLocation.longitude!);
          // Animate camera to updated position
          getPolylinePoints(
              _currentP!); // Fetch polyline points for updated position
        });
      }
    });
  }

  // Fetch polyline points between current location and a destination
  Future<void> getPolylinePoints(LatLng currentLocation) async {
    List<LatLng> polylineCoordinates = [];
    PolylinePoints polylinePoints = PolylinePoints();
    PolylineResult result = await polylinePoints.getRouteBetweenCoordinates(
      google_map_api_key,
      PointLatLng(currentLocation.latitude, currentLocation.longitude),
      PointLatLng(sensorList[3].latitude,
          sensorList[3].longitude), // Use your destination coordinates here
      travelMode: TravelMode.walking,
    );
    if (result.points.isNotEmpty) {
      result.points.forEach((PointLatLng point) {
        polylineCoordinates.add(LatLng(point.latitude, point.longitude));
      });
      generatePolylineFromPoints(
          polylineCoordinates); // Generate polyline from points
    } else {
      print(result.errorMessage);
    }
  }

  // Generate polyline from a list of polyline coordinates
  void generatePolylineFromPoints(List<LatLng> polylineCoordinates) {
    PolylineId id = const PolylineId("poly");
    Polyline polyline = Polyline(
      polylineId: id,
      color: Colors.blue,
      points: polylineCoordinates,
      width: 8,
    );
    setState(() {
      polylines[id] = polyline; // Add polyline to map
    });
  }

  // Inside _MapPageState class
  Set<Marker> _createMarkers() {
    Set<Marker> markers = {};

    // Create marker for current position
    if (_currentP != null) {
      final Marker currentMarker = Marker(
        markerId: const MarkerId('current_position'),
        position: _currentP!,
        icon: BitmapDescriptor.defaultMarkerWithHue(
            BitmapDescriptor.hueAzure), // Change the hue to specify the color
      );
      markers.add(currentMarker);
    }

    // Create markers for sensor positions
    for (int i = 0; i < sensorList.length; i++) {
      final Marker marker = Marker(
        markerId: MarkerId(sensorList[i].name),
        position: sensorList[i].coordinates,
        icon: BitmapDescriptor.defaultMarker,
        onTap: () async {
          // Show custom info window when marker is tapped
          showModalBottomSheet(
            context: context,
            builder: (context) {
              return Container(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      sensorList[i].name,
                      style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Air Quality Status: ${sensorList[i].airQualityStatus}',
                    ),
                  ],
                ),
              );
            },
          );
        },
      );
      markers.add(marker);
    }

    return markers;
  }
}
