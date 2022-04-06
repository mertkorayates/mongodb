import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_blue/flutter_blue.dart';
import 'package:get/get.dart';


class Model extends GetxController{
  FlutterBlue flutterBlue = FlutterBlue.instance;
  final String SERVICE_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
  final String WIFI_STATUS_UUID = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
  final String TEMP_UUID = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";
  final String HEATER_UUID = "6e400004-b5a3-f393-e0a9-e50e24dcca9e";
  late BluetoothDevice baglanilanCihaz;
  var cihazId = "".obs;
  StreamController stream = StreamController<List<int>>();
  var veri = "0".obs;
  var kontrol = false.obs;
  Color renk = Colors.red;
  //var tempValueint =0.obs;
  var setValue = 20.obs;
  var baglantiDurumu = false.obs;
  var doubleValue = 0.0.obs;
  late BluetoothCharacteristic deviceChar;



  void cihazKesfet() async{
    try{
      flutterBlue.startScan(timeout: Duration(seconds: 3)).then((value) {
        try{
          flutterBlue.scanResults.listen((List<ScanResult> results) {
            results.forEach((element) {
              print("Gelen Deger = ${element.device.id.toString()}");
            });
            for (ScanResult result in results) {
              if (result.device.id.toString() == "34:AB:95:5B:88:2A") {
                print("ID VAR OLAN");
                baglanilanCihaz = result.device;
                if(result.device == null) {
                  throw("Cihaz Bulunamadı, işlemi tekrarlayınız");
                }
                flutterBlue.stopScan();
                cihazBaglan(baglanilanCihaz);
              }
            }
          });
        }catch(e){
          Get.snackbar("HATA", "Hata = ${e.toString()}",backgroundColor: Colors.red);
        }

      });
    }catch(e){
      Get.snackbar("HATA", "Hata = Cihaza Bulunamadı",backgroundColor: Colors.red);
    }

  }
  void cihazBaglan(BluetoothDevice device)async{
    try{
      await device.connect(autoConnect: true).then((a) {
        device.state.forEach((element) {
          if(BluetoothDeviceState.connected == element){
            servisIslemleri(device);

            Get.snackbar("Bağlandı", "Cihaz ile Bağlantı Kuruldu",backgroundColor: Colors.green.shade500);
          }
          if(BluetoothDeviceState.disconnected == element){

            kontrol.value = false;

            Get.snackbar("Baglanti Kesildi", "Baglanti Kesildi",backgroundColor: Colors.red.shade500);
            update();
          }
          if(BluetoothDeviceState.connecting == element){
            Get.snackbar("Baglanti Kuruluyor", "Lutfen Bekleyiniz");
          }
        });
        servisIslemleri(device);
      }).catchError((s){
        throw("Baglanılamadı");
        kontrol.value = false;
      });

    }catch(e){
      Get.snackbar("HATA", "Hata = ${e.toString()}");
    }
  }



  servisIslemleri(BluetoothDevice glcihaz) async {
    print("Servis Islemleri");
    try{
      print("Servis Islemleri");
      await glcihaz.discoverServices().then((value) {

        value.forEach((element) {
          print("serbice ıd = ${element.uuid.toString()}");
          if (element.uuid.toString() == SERVICE_UUID) {
            element.characteristics.forEach((characteristic) {
              deviceChar = characteristic;
              debugPrint("Gelen CHARRRR = ${characteristic.uuid.toString()}");
              if (characteristic.uuid.toString() == TEMP_UUID) {
                characteristic.setNotifyValue(true).then((value) {
                  if(value){

                    characteristic.value.listen((event) {
                      baglantiDurumu.value = true;
                      veri.value = utf8.decoder.convert(event);
                      //tempValueint.value = int.tryParse(veri.value,radix: 10)!;
                      doubleValue.value = double.parse( veri.value);

                    });
                  }
                });


              }
            });
          }
        });
      }).catchError((e)=> throw("Veri Getirelemedi"));
    }catch(e){
      kontrol.value = false;
      Get.snackbar("HATA", "Hata = Veri Getirelemedi",backgroundColor: Colors.red);
    }
  }

  writeHearter() async{
    try{
      if(deviceChar.uuid.toString() == HEATER_UUID){
        print("BAGLANDIIIIIIIIIIIIII");
        deviceChar.write(utf8.encode(setValue.value.toString()));
      }

    }catch(e){
      print(e);
    }

  }



  bleDisconnect()async{
    await baglanilanCihaz.disconnect();
    baglantiDurumu.value = false;
    doubleValue.value = 0;
    veri.value = "0";

  }





}