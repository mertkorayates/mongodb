
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'Model/model.dart';


class Valuescreen extends StatefulWidget {
  const Valuescreen({Key? key}) : super(key: key);

  @override
  _ValuescreenState createState() => _ValuescreenState();
}

class _ValuescreenState extends State<Valuescreen> {
  final _controller = Get.put(Model());
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text("Gelen Value = ${_controller.veri.value}"),
      ),
    );
  }
}
