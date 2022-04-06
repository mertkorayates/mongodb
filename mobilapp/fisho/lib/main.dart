import 'dart:async';





import 'dart:ui';

import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/rendering.dart';
import 'package:vector_math/vector_math.dart' as vmath;
import 'dart:math' as math;
import 'package:fisho/Model/barcodeScanner.dart';
import 'package:fisho/Model/model.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';



void main()=>runApp(MyApp());


class MyApp extends StatefulWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  _MyAppState createState() => _MyAppState();
}
//34:AB:95:5B:88:2A
class _MyAppState extends State<MyApp> {

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      debugShowCheckedModeBanner: false,
      home: MyHomePage()
    );
  }
}


class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key}) : super(key: key);

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> with TickerProviderStateMixin {
  List<Color> gradientColors = [
    const Color(0xff23b6e6),
    const Color(0xff02d39a),
  ];

  bool showAvg = false;
  final _controller = Get.put(Model());

  late int sayi =0;
  late Timer sayac;
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Container(
          height: double.infinity,
          width: double.infinity,
          decoration: BoxDecoration(
              gradient: LinearGradient(begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                   Color(0xff192028),
                    Color(0xff191928),
                  ])
          ),
          child: Column(
            children: [
              SizedBox(height: MediaQuery.of(context).size.height/20,),
              Row(mainAxisAlignment: MainAxisAlignment.start, children: [
                SizedBox(width: 4,),
                Text("Fisho", style: TextStyle(fontSize: 33,
                    fontWeight: FontWeight.bold,
                    color: Colors.white70),),
              ],),
              Expanded(flex: 5, child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  Container(

                    height: 150,
                    width: 190,
                    decoration: BoxDecoration(
                        color: Color(0xff232d37),
                        borderRadius: BorderRadius.circular(15)
                    ),
                      child: Container(
                        child: Stack(

                          children: [



                            Align(alignment: Alignment.center,child: Obx((){
                              return Text("${_controller.veri.value.length <= 7 ? "0" : _controller.veri.value.substring(0,5) }°",style: TextStyle(color: Colors.white,fontSize: 33,fontWeight: FontWeight.w300));
                            })),

                            Align(alignment: Alignment.center,child: Container(width: 40,height: 40,child: Obx((){
                              return CustomPaint(painter:CustomCircularProgress(value: _controller.doubleValue.value == null || _controller.doubleValue.value <= 0 ? 0 : _controller.doubleValue.value ));
                            }))),


                          ],
                        )
                      ),
                  ),
                  Container(
                    decoration: BoxDecoration(
                        color: Color(0xff232d37),
                        borderRadius: BorderRadius.circular(15)
                    ),
                    height: 150,
                    width: 190,
                    child: Column(
                      children: [
                        SizedBox(height: MediaQuery.of(context).size.height/120,),
                        Text("Bağlantı Durumu",style: TextStyle(fontWeight: FontWeight.bold,color: Colors.black54),),
                        SizedBox(height: MediaQuery.of(context).size.height/60,),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceAround,
                          children: [
                            Icon(Icons.wifi_off,size: 90,color: Colors.white38,),
                            _controller.baglantiDurumu.value ? Icon(Icons.bluetooth_audio,size: 90,color: Colors.blueAccent,) : Icon(Icons.bluetooth_disabled,size: 90,color: Colors.white38,),

                          ],
                        ),

                      ],
                    )
                  ),
                ],
              )),

              Expanded(flex: 6, child: Container(
                margin: EdgeInsets.all(5),

                height: 200,
                width: double.infinity,
                decoration: BoxDecoration(
                    color: Color(0xff232d37),
                    borderRadius: BorderRadius.circular(25)
                ),
                child:   AspectRatio(
                  aspectRatio: 1.70,
                  child: Container(
                    decoration: const BoxDecoration(
                        borderRadius: BorderRadius.all(
                          Radius.circular(18),
                        ),
                        color: Color(0xff232d37)),
                    child: Padding(
                      padding: const EdgeInsets.only(
                          right: 18.0, left: 12.0, top: 24, bottom: 12),
                      child: LineChart(
                        showAvg ? avgData() : mainData(),
                      ),
                    ),
                  ),
                ),
              )),

              Expanded(flex: 5, child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  Container(
                      height: 130,
                      width: 170,
                    color: Color(0xff232d37),
                    child: Column(
                      children: [
                      Text("Sıcaklık Ayarı",style: TextStyle(fontWeight: FontWeight.bold,color: Colors.black54),),
                        SizedBox(height: MediaQuery.of(context).size.height/20 ,),
                        RaisedButton.icon(onPressed: () {
                          Get.dialog(AlertDialog(
                            backgroundColor: Colors.blueGrey,
                            actions: [
                              Container(
                                height: 200,
                                width: 250,

                                child: Column(
                                  children: [
                                    Text("Sıcaklık Ayarı",style: TextStyle(fontWeight: FontWeight.bold,fontSize: 16,color: Colors.black38),),
                                    Divider(height: 3,),
                                    Expanded(flex: 3,child: Row(
                                      mainAxisAlignment: MainAxisAlignment.spaceEvenly
                                      ,children: [
                                     Obx((){
                                       return  Text("${_controller.setValue.value}°",style: TextStyle(fontSize: 60,fontWeight: FontWeight.w500,color: Colors.black87),);
                                     }),
                                  Column(

                                  children: [
                                   GestureDetector(child: Icon(Icons.arrow_upward,size: 60,color: Colors.red.withOpacity(0.8),),onTap: () {
                                     _controller.setValue.value++;
                                   },),

                                   GestureDetector(child: Icon(Icons.arrow_downward,size: 60,color: Colors.blue),onTap: (){
                                     _controller.setValue.value--;
                                   },)

                                ],
                              )

                                    ],
                                    )),




                                    Expanded(flex: 1,child: Row(
                                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,

                                      children: [
                                        Container(decoration: BoxDecoration(
                                            borderRadius: BorderRadius.circular(33),
                                            color: Colors.white

                                        ),child: IconButton(onPressed: () {
                                        }, icon: Icon(Icons.cancel_outlined,size: 33,color: Colors.red,)),),
                                        Container(decoration: BoxDecoration(
                                            borderRadius: BorderRadius.circular(33),
                                            color: Colors.white

                                        ),child: IconButton(onPressed: () async{
                                          await _controller.writeHearter();
                                        }, icon: Icon(Icons.thermostat_sharp,size: 33,color: Colors.green,)),),


                                      ],



                                    ))


                                  ],
                                ),
                              )
                            ],
                          ));
                        }, icon: Icon(Icons.thermostat_sharp), label: Text("Sıcaklık"),color: Colors.green.shade600,),



                      ],
                    ),

                ),

                  Container(
                    color: Color(0xff232d37),
                    height: 130,
                    width: 170,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        Text("Cihaz Bağlantısı",style: TextStyle(fontWeight: FontWeight.bold,color: Colors.black54),),
                        SizedBox(height: MediaQuery.of(context).size.height/70 ,),
                        RaisedButton.icon(color: Colors.blue.shade800,onPressed: () {
                          AwesomeDialog(
                            context: context,
                            dialogType: DialogType.INFO_REVERSED,
                            borderSide: BorderSide(color: Colors.green, width: 1),
                            width: 380,
                            buttonsBorderRadius: BorderRadius.all(Radius.circular(2)),
                            headerAnimationLoop: false,
                            animType: AnimType.BOTTOMSLIDE,
                            title: 'Bağlantı',
                            desc: 'Lütfen cihaz üzerindeki QR kodu taratınız',
                            showCloseIcon: true,
                            btnOkText: "Tamam",
                            btnCancelText: "İptal",
                            btnCancelOnPress: () {},
                            btnOkOnPress: () {
                              Get.to(QRViewExample());
                            },
                          )..show();
                        }, icon: Icon(Icons.bluetooth_searching), label:Text("Bağlan")),
                        RaisedButton.icon(color: Colors.red.shade500,onPressed: () async{
                          AwesomeDialog(
                            context: context,
                            dialogType: DialogType.SUCCES,
                            borderSide: BorderSide(color: Colors.green, width: 1),
                            width: 380,
                            buttonsBorderRadius: BorderRadius.all(Radius.circular(2)),
                            headerAnimationLoop: false,
                            animType: AnimType.BOTTOMSLIDE,
                            body: Text("Cihaz ile bağlantı kesildi.",style: TextStyle(fontSize: 16),),
                            showCloseIcon: true,
                            btnOkText: "Tamam",
                            title: "Bağlantı",
                            btnOkColor: Colors.blueAccent,

                            btnOkOnPress: () {
                              Get.offAll(MyHomePage());
                            },
                          )..show();
                          await _controller.bleDisconnect();
                          setState(() {

                          });

                        }, icon: Icon(Icons.bluetooth_disabled), label:Text("Bağlantı Kes"))


                      ],
                    ),

                  ),
                ],
              )),
            ],
          ),
        )
    );
  }
  LineChartData mainData() {
    return LineChartData(
      gridData: FlGridData(
        show: true,
        drawVerticalLine: true,
        getDrawingHorizontalLine: (value) {
          return FlLine(
            color: const Color(0xff37434d),
            strokeWidth: 1,
          );
        },
        getDrawingVerticalLine: (value) {
          return FlLine(
            color: const Color(0xff37434d),
            strokeWidth: 1,
          );
        },
      ),
      titlesData: FlTitlesData(
        show: true,
        rightTitles: SideTitles(showTitles: false),
        topTitles: SideTitles(showTitles: false),
        bottomTitles: SideTitles(
          showTitles: true,
          reservedSize: 22,
          interval: 1,
          getTextStyles: (context, value) => const TextStyle(
              color: Color(0xff68737d),
              fontWeight: FontWeight.bold,
              fontSize: 16),
          getTitles: (value) {
            switch (value.toInt()) {
              case 1:
                return 'PZT';
              case 5:
                return 'ÇAR';
              case 10:
                return 'CUMA';

            }
            return '';
          },
          margin: 8,
        ),
        leftTitles: SideTitles(
          showTitles: true,
          interval: 1,
          getTextStyles: (context, value) => const TextStyle(
            color: Color(0xff67727d),
            fontWeight: FontWeight.bold,
            fontSize: 15,
          ),
          getTitles: (value) {
            switch (value.toInt()) {

              case 0:
                return '0°';
              case 1:
                return '20°';
              case 2:
                return '40°';
              case 3:
                return '60°';
              case 4:
                return '80°';
              case 5:
                return '100°';
              case 6:

            }
            return '';
          },
          reservedSize: 32,
          margin: 12,
        ),
      ),
      borderData: FlBorderData(
          show: true,
          border: Border.all(color: const Color(0xff37434d), width: 1)),
      minX: 0,
      maxX: 11,
      minY: 0,
      maxY: 6,
      lineBarsData: [
        LineChartBarData(
          spots: const [
            FlSpot(0, 3),
            FlSpot(2.6, 2),
            FlSpot(4.9, 5),
            FlSpot(6.8, 3.1),
            FlSpot(8, 4),
            FlSpot(9.5, 3),
            FlSpot(11, 4),
          ],
          isCurved: true,
          colors: gradientColors,
          barWidth: 5,
          isStrokeCapRound: true,
          dotData: FlDotData(
            show: false,
          ),
          belowBarData: BarAreaData(
            show: true,
            colors:
            gradientColors.map((color) => color.withOpacity(0.3)).toList(),
          ),
        ),
      ],
    );
  }

  LineChartData avgData() {
    return LineChartData(
      lineTouchData: LineTouchData(enabled: false),
      gridData: FlGridData(
        show: true,
        drawHorizontalLine: true,
        getDrawingVerticalLine: (value) {
          return FlLine(
            color: const Color(0xff37434d),
            strokeWidth: 1,
          );
        },
        getDrawingHorizontalLine: (value) {
          return FlLine(
            color: const Color(0xff37434d),
            strokeWidth: 1,
          );
        },
      ),
      titlesData: FlTitlesData(
        show: true,
        bottomTitles: SideTitles(
          showTitles: true,
          reservedSize: 22,
          getTextStyles: (context, value) => const TextStyle(
              color: Color(0xff68737d),
              fontWeight: FontWeight.bold,
              fontSize: 16),
          getTitles: (value) {
            switch (value.toInt()) {
              case 2:
                return 'MAR';
              case 5:
                return 'JUN';
              case 8:
                return 'SEP';
            }
            return '';
          },
          margin: 8,
          interval: 1,
        ),
        leftTitles: SideTitles(
          showTitles: true,
          getTextStyles: (context, value) => const TextStyle(
            color: Color(0xff67727d),
            fontWeight: FontWeight.bold,
            fontSize: 15,
          ),
          getTitles: (value) {
            switch (value.toInt()) {
              case 1:
                return '11';
              case 3:
                return '12';
              case 5:
                return '13';
            }
            return '';
          },
          reservedSize: 32,
          interval: 1,
          margin: 12,
        ),
        topTitles: SideTitles(showTitles: false),
        rightTitles: SideTitles(showTitles: false),
      ),
      borderData: FlBorderData(
          show: true,
          border: Border.all(color: const Color(0xff37434d), width: 1)),
      minX: 0,
      maxX: 11,
      minY: 0,
      maxY: 6,
      lineBarsData: [
        LineChartBarData(
          spots: const [
            FlSpot(0, 3.44),
            FlSpot(2.6, 3.44),
            FlSpot(4.9, 3.44),
            FlSpot(6.8, 3.44),
            FlSpot(8, 3.44),
            FlSpot(9.5, 3.44),
            FlSpot(11, 3.44),
          ],
          isCurved: true,
          colors: [
            ColorTween(begin: gradientColors[0], end: gradientColors[1])
                .lerp(0.2)!,
            ColorTween(begin: gradientColors[0], end: gradientColors[1])
                .lerp(0.2)!,
          ],
          barWidth: 5,
          isStrokeCapRound: true,
          dotData: FlDotData(
            show: false,
          ),
          belowBarData: BarAreaData(show: true, colors: [
            ColorTween(begin: gradientColors[0], end: gradientColors[1])
                .lerp(0.2)!
                .withOpacity(0.1),
            ColorTween(begin: gradientColors[0], end: gradientColors[1])
                .lerp(0.2)!
                .withOpacity(0.1),
          ]),
        ),
      ],
    );
  }
}



class CustomCircularProgress extends CustomPainter {
  final double value;

  CustomCircularProgress({required this.value});

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);

    canvas.drawArc(
      Rect.fromCenter(center: center, width: 130, height: 130),
      vmath.radians(140),
      vmath.radians(260),
      false,
      Paint()
        ..style = PaintingStyle.stroke
        ..color = Colors.black12
        ..strokeCap = StrokeCap.round
        ..strokeWidth = 17,
    );
    canvas.saveLayer(
      Rect.fromCenter(center: center, width: 150, height: 150),
      Paint(),
    );

     Gradient gradient = SweepGradient(
      startAngle: 1.25 * math.pi / 2,
      endAngle: 5.5 * math.pi / 2,
      // endAngle: 5.5 * math.pi / 2,
      tileMode: TileMode.repeated,
      colors: <Color>[
        Colors.blueAccent,
        Colors.red,
      ],
    );
    canvas.drawArc(
      Rect.fromCenter(center: center, width: 130, height: 130),
      vmath.radians(140),
      vmath.radians(2.6 * value),
      false,
      Paint()
        ..style = PaintingStyle.stroke
        ..strokeCap = StrokeCap.round
        ..shader = gradient
            .createShader(Rect.fromLTWH(0.0, 0.0, size.width, size.height))
        ..strokeWidth = 17,
    );
    canvas.restore();
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}

