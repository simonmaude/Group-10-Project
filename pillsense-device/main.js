let Pins = require("pins");

// var fluffy = new Media({url: "./assets/fluffy.mp3",
//   width: 0, height: 0});
// application.add(fluffy);

// var sound = new Sound(mergeURI(application.url, "./assets/fluffy.wav"));

class AppBehavior extends Behavior {
    onLaunch(application) {
        application.shared = true;
        Pins.configure({
            led: {
                require: "Digital", // use built-in digital BLL
                pins: {
                    ground: { pin: 51, type: "Ground" },
                    digital: { pin: 52, direction: "output" },
                }
            },
            pill1Button: {
    			require: "Digital",
    			pins: {
        			power: {pin: 62, voltage: 3.3, type: "Power"},
        			ground: {pin: 63, type: "Ground"},
        			digital: {pin: 64, direction: "input"},
    			}
			}, 
            pill2Button: {
    			require: "Digital",
    			pins: {
        			power: {pin: 65, voltage: 3.3, type: "Power"},
        			ground: {pin: 66, type: "Ground"},
        			digital: {pin: 67, direction: "input"},
    			}
			},  
			ibuLevel: {
                require: "Analog",
                pins: {
                    power: { pin: 53, type: "Power", voltage: 3.3 },
                    analog: { pin: 54 },
                    ground: { pin: 55, type: "Ground" }
                }
            },				
    		aceLevel: {
                require: "Analog",
                pins: {
                    power: { pin: 56, type: "Power", voltage: 3.3 },
                    analog: { pin: 57 },
                    ground: { pin: 58, type: "Ground" }
                }
            },
			// analog: {
			// 	require: "analogBLL",
			// 	pins:{
			// 		analog: {pin: 59, direction: "input"},
			// 		power: {pin: 60, voltage: 3.3, type: "Power"},
			// 		ground: {pin: 61, type: "Ground"},
			// 	}
			// },
            // sounds: {
            //     require: "audioBLL",
            //     pins: {
            //         microphone: { sampleRate: 8000, channels: 1 },
            //         speaker: { sampleRate: 8000, channels: 1 }
            //     }
            // },					 			 
        },  success => {
            if (success) {
                Pins.share("ws", {zeroconf: true, name: "cat-feeder-device"});
                application.add(new MainContainer({ string: "Connected!", backgroundColor: "#2D9CDB" }));
            } else {
                   application.add(new MainContainer({ string: "Error, no connection", backgroundColor: "red" }));
               };
        });
    }
    onQuit(application) {
        application.shared = false;
    }
}
application.behavior = new AppBehavior();

// function onLoaded(media) {
//     media.start();
// }

// function onFinished(media) {
//     media.stop();
// }

Handler.bind("/dispenseTreatStart", Behavior({
    onInvoke: function(handler, message){
        trace(message + " TEST1\n")
        // json => { labelOne.string = "Dispensing Treat " + json.message; };
        labelOne.string = "Dispensing Treat";
    }
}));

Handler.bind("/dispenseTreatEnd", Behavior({
    onInvoke: function(handler, message){
        trace("TEST2\n")
        labelOne.string = "Connected!";
    }
}));


let labelOne;
let textStyle = new Style({ font: "bold 30px", color: "white" });


let MainContainer = Container.template($ => ({
    top: 0, bottom: 0, left: 0, right: 0,
    skin: new Skin({ fill: $.backgroundColor }),
    contents: [
        labelOne = Label($, {
            top: 0, bottom: 0, left: 0, right: 0,
            style: textStyle,  string: $.string, active: true, Behavior: class extends Behavior {
                                        onTouchEnded(container, id, x, y, ticks) {
                                            // onLoaded(fluffy);
                                            // Sound.volume = 1.0;  
                                            // sound.play();
                                            // trace("\nplaying " + sound.constructor.name + ' object\n');
        }}
        }),
    ],
}));
