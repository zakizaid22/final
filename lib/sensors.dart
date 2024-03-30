import 'package:google_maps_flutter/google_maps_flutter.dart';

class Sensor {
  final String name;
  final double latitude;
  final double longitude;
  final List<String> pollutants;
  final String dataUrl;
  final double? index1;
  final double? index2;
  final double? index3;
  final double? index4;
  final double? index5;
  final double? index6;
  final DateTime? timestamp;
  final String? airQualityStatus;
  final LatLng coordinates;

  Sensor({
    required this.name,
    required this.latitude,
    required this.longitude,
    required this.pollutants,
    required this.dataUrl,
    this.index1,
    this.index2,
    this.index3,
    this.index4,
    this.index5,
    this.index6,
    this.timestamp,
    this.airQualityStatus,
    required this.coordinates,
  });
}

List<String> sensorname = ['1', '2', '3'];
// Create a list to hold instances of Sensor class
List<Sensor> sensorList = [
  Sensor(
    name: "Molí del Sol",
    latitude: 39.4811060881372,
    longitude: -0.4087933161695803,
    pollutants: [
      "Dióxido de azufre (SO2)",
      "Monóxido de carbono (CO)",
      "Ozono",
      "Óxidos de nitrógeno totales (NOx)",
      "Monóxido de nitrógeno (NO)",
      "Dióxido de nitrógeno (NO2)",
      "Partículas PM10",
      "Partículas PM2.5",
      "Partículas PM1",
    ],
    dataUrl:
        "http://mapas.valencia.es/WebsMunicipales/uploads/atmosferica/3A.csv",
    index1: 2,
    index2: 8,
    index3: 68,
    index4: 0.3,
    index5: 12,
    index6: 4,
    timestamp: DateTime.parse("2024-03-01T11:20:09+01:00"),
    airQualityStatus: "Razonablemente Buena",
    coordinates: const LatLng(39.4811060881372, -0.4087933161695803),
  ),
  Sensor(
    name: "Francia",
    latitude: 39.45782688751831,
    longitude: -0.342986232422652,
    pollutants: [
      "Dióxido de azufre (SO2)",
      "Monóxido de carbono (CO)",
      "Ozono",
      "Óxidos de nitrógeno totales (NOx)",
      "Monóxido de nitrógeno (NO)",
      "Dióxido de nitrógeno (NO2)",
      "Velocidad de viento (Veloc.)",
      "Particulas PM10",
      "Particulas PM2.5",
    ],
    dataUrl:
        "http://mapas.valencia.es/WebsMunicipales/uploads/atmosferica/6A.csv",
    index1: 3,
    index2: 6,
    index3: 76,
    index4: 0.1,
    index5: 17,
    index6: 3,
    timestamp: DateTime.parse("2024-03-01T11:20:07+01:00"),
    airQualityStatus: "Buena",
    coordinates: const LatLng(39.45782688751831, -0.342986232422652),
  ),
  Sensor(
    name: "Cabanyal",
    latitude: 39.47439078535677,
    longitude: -0.32853481349274394,
    pollutants: [],
    dataUrl:
        "http://mapas.valencia.es/WebsMunicipales/uploads/atmosferica/1A.csv",
    index1: 18,
    timestamp: DateTime.parse("2024-03-01T11:20:14+01:00"),
    airQualityStatus: "Desfavorable",
    coordinates: const LatLng(39.47439078535677, -0.32853481349274394),
  ),
  Sensor(
    name: "Boulevar Sur",
    latitude: 39.45039600550536,
    longitude: -0.3963375643758562,
    pollutants: [
      "Dióxido de azufre (SO2)",
      "Ozono",
      "Óxidos de nitrógeno totales (NOx)",
      "Monóxido de nitrógeno (NO)",
      "Dióxido de nitrógeno (NO2)",
      "Partículas PM10",
      "Niquel (Ni)",
      "Arsénico (As)",
      "Plomo (Pb)",
      "Benzo(a)pireno (BaP)",
      "Cadmio (Cd)"
    ],
    dataUrl:
        "http://mapas.valencia.es/WebsMunicipales/uploads/atmosferica/7A.csv",
    index1: 1,
    index2: 5,
    index3: 68,
    timestamp: DateTime.parse("2024-03-01T11:20:08+01:00"),
    airQualityStatus: "Razonablemente Buena",
    coordinates: const LatLng(39.45039600550536, -0.3963375643758562),
  ),
  Sensor(
    name: "Dr. Lluch",
    latitude: 39.46668475546108,
    longitude: -0.3282894894027388,
    pollutants: [
      "Óxidos de nitrógeno totales (NOx)",
      "Monóxido de nitrógeno (NO)",
      "Dióxido de nitrógeno (NO2)",
      "Partículas PM10",
      "Partículas PM2.5",
      "Partículas PM1"
    ],
    dataUrl:
        "http://mapas.valencia.es/WebsMunicipales/uploads/atmosferica/4A.csv",
    index1: 4,
    index2: 17,
    index3: 3,
    timestamp: DateTime.parse("2024-03-01T11:20:14+01:00"),
    airQualityStatus: "Buena",
    coordinates: const LatLng(39.46668475546108, -0.3282894894027388),
  ),
  Sensor(
    name: "Universidad Politécnica",
    latitude: 39.47964449692915,
    longitude: -0.33740066052186946,
    pollutants: [
      "Dióxido de azufre (SO2)",
      "Ozono",
      "Óxidos de nitrógeno totales (NOx)",
      "Monóxido de nitrógeno (NO)",
      "Dióxido de nitrógeno (NO2)",
      "Partículas PM10",
      "Partículas PM2.5"
    ],
    dataUrl:
        "http://mapas.valencia.es/WebsMunicipales/uploads/atmosferica/1A.csv",
    index1: 1,
    index2: 3,
    index3: 72,
    index4: 12,
    index5: 3,
    timestamp: DateTime.parse("2024-03-01T11:20:12+01:00"),
    airQualityStatus: "Razonablemente Buena",
    coordinates: const LatLng(39.47964449692915, -0.33740066052186946),
  ),
  Sensor(
    name: "Viveros",
    latitude: 39.47964092480533,
    longitude: -0.36964822314381013,
    pollutants: [
      "Dióxido de azufre (SO2)",
      "Óxidos de nitrógeno totales (NOx)",
      "Monóxido de nitrógeno (NO)",
      "Dióxido de nitrógeno (NO2)",
      "Ozono",
      "Partículas PM2.5",
      "Partículas PM10",
      "Niquel (Ni)",
      "Arsénico (As)",
      "Plomo (Pb)",
      "Cadmio (Cd)"
    ],
    dataUrl:
        "http://mapas.valencia.es/WebsMunicipales/uploads/atmosferica/5A.csv",
    index1: 6,
    index2: 17,
    index3: 89,
    timestamp: DateTime.parse("2024-03-01T11:20:13+01:00"),
    airQualityStatus: "Razonablemente Buena",
    coordinates: const LatLng(39.47964092480533, -0.36964822314381013),
  ),
  Sensor(
    name: "Centro",
    latitude: 39.470547670260125,
    longitude: -0.37639765165532396,
    pollutants: [
      "Óxidos de nitrógeno totales (NOx)",
      "Monóxido de nitrógeno (NO)",
      "Dióxido de nitrógeno (NO2)",
      "Partículas PM10",
      "Partículas PM2.5"
    ],
    dataUrl:
        "https://mapas.valencia.es/WebsMunicipales/uploads/atmosferica/8A.csv",
    index1: 21,
    index2: 17,
    index3: 5,
    timestamp: DateTime.parse("2024-03-01T11:20:13+01:00"),
    airQualityStatus: "Buena",
    coordinates: const LatLng(39.470547670260125, -0.37639765165532396),
  ),
  Sensor(
    name: "Olivereta",
    latitude: 39.46924423509195,
    longitude: -0.40592344552906795,
    pollutants: [
      "Óxidos de nitrógeno totales (NOx)",
      "Monóxido de nitrógeno (NO)",
      "Dióxido de nitrógeno (NO2)",
      "Partículas PM10",
      "Partículas PM2.5"
    ],
    dataUrl:
        "http://mapas.valencia.es/WebsMunicipales/uploads/atmosferica/2A.csv",
    index1: 29,
    index2: 28,
    index3: 6,
    timestamp: DateTime.parse("2024-03-01T11:20:15+01:00"),
    airQualityStatus: "Razonablemente Buena",
    coordinates: const LatLng(39.46924423509195, -0.40592344552906795),
  ),
  Sensor(
    name: "Patraix",
    latitude: 39.45918908999643,
    longitude: -0.4014113292191286,
    pollutants: [
      "Óxidos de nitrógeno totales (NOx)",
      "Monóxido de nitrógeno (NO)",
      "Dióxido de nitrógeno (NO2)",
      "Partículas PM10",
      "Partículas PM2.5"
    ],
    dataUrl:
        "http://mapas.valencia.es/WebsMunicipales/uploads/atmosferica/2B.csv",
    index1: 30,
    index2: 24,
    index3: 7,
    timestamp: DateTime.parse("2024-03-01T11:20:15+01:00"),
    airQualityStatus: "Razonablemente Buena",
    coordinates: const LatLng(39.45918908999643, -0.4014113292191286),
  ),
  Sensor(
    name: "Pista de Silla",
    latitude: 39.45806095369672,
    longitude: -0.37664393657915707,
    pollutants: [
      "Dióxido de azufre (SO2)",
      "Monóxido de carbono (CO)",
      "Ozono",
      "Óxidos de nitrógeno totales (NOx)",
      "Monóxido de nitrógeno (NO)",
      "Dióxido de nitrógeno (NO2)",
      "Benceno (Benc)",
      "Tolueno (Tolue)",
      "Xileno (Xilen)",
      "Partículas PM10",
      "Partículas PM2.5",
      "Nivel de presión sonora (SPL)"
    ],
    dataUrl:
        "http://mapas.valencia.es/WebsMunicipales/uploads/atmosferica/4A.csv",
    index1: 2,
    index2: 11,
    index3: 70,
    index4: 0.7,
    index5: 22,
    index6: 5,
    timestamp: DateTime.parse("2024-03-01T11:20:09+01:00"),
    airQualityStatus: "Razonablemente Buena",
    coordinates: const LatLng(39.45806095369672, -0.37664393657915707),
  ),

  // Add more sensor instances here using the same format as above
];
