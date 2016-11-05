
import TRANSITION from 'transitions';

/* Pins Setup */
import Pins from "pins";

let remotePins;
let connected = false;
let deviceURL = "";

/* Skins and styles */
let blackSkin = new Skin({ fill: 'black' });
let blueSkin = new Skin({ fill: '#2D9CDB' });
let yellowSkin = new Skin({ fill: 'yellow' });
let whiteSkin = new Skin({ fill: 'white' });
var greySkin = new Skin({ fill: '#E6E6E6'});
var darkGreySkin = new Skin({ fill: '#808080'});


var appSkin = new Skin ({fill: '#ddd'});
var separatorSkin = new Skin({ fill: 'silver'});
var buttonSkin = new Skin ({fill: '#404040'});
var inactiveButtonSkin = new Skin ({fill: '#b2b2b2'});
var skyBlueSkin = new Skin ({fill: '#808080'});

var buttonStyle = new Style ({font: 'bold 20px', color: 'white'});
var inactiveStyle = new Style ({font: 'bold 20px', color: 'white'});
var titleStyle = new Style({font: 'bold 22px', color: 'white'});
var productNameStyle = new Style({  font: 'bold 18px', horizontal: 'left', vertical: 'middle', lines: 1 });
var productDescriptionStyle = new Style({  font: '16px', horizontal: 'left', vertical: 'middle', left: 1});
var productAmountStyle = new Style({  font: '16px', horizontal: 'left', vertical: 'middle', left: 1, skin: greySkin});
var explainStyle = new Style({  font: '12px', horizontal: 'left', vertical: 'middle', left: 1});

let capsStyle = new Style({ color: 'black', font: 'bold 20px', horizontal: 'right'});
let capsStyleDisconnect = new Style({ color: '#BDBDBD', font: 'bold 20px', horizontal: 'right'});
let labelStyle = new Style({ color: 'black', font: 'bold 20px', horizontal: 'left'});
let textStyle = new Style({ color: 'black', font: '20px', horizontal: 'right'});

let splashLabelStyle = new Style({ color: 'white', font: 'bold 50px', horizontal: 'center', vertical: 'middle' });
let hugeLabelStyle = new Style({ color: 'black', font: 'bold 125px', horizontal: 'center', vertical: 'middle' });

/* System Variables*/
let status = false;
let statusLabel; 
let statusString; 
let lastAteLabel;
let lastDrankLabel;
let feederPicture;
let feederLabel;
let feederLabelStyle = capsStyleDisconnect;
let foodLevel;
let waterLevel;
let treatLevel;
let treatCount = 5;
let level3;
let dispenseButton;
let start1Label;
let sliderEnd2;
let unitLabel;
let plusButton1;
let minusButton1;
let countButton1;
let plusButton2;
let minusButton2;
let countButton2;
let plusButton3;
let minusButton3;
let countButton3;
let plusButton4;
let minusButton4;
let countButton4;
let lastAteString = 'no current data  ';
let lastDrankString = 'no current data  ';
let scheduleStart1 = 700;
let scheduleEnd1 = 1000;
let scheduleStart2 = 1700;
let scheduleEnd2 = 2000;


/* Assets */
let back = './assets/back.png';
let settingsPicture = './assets/settings.png';
let feeder = './assets/feeder.png';
let feederDisconnect = './assets/feeder_disconnect.png';
let cat = './assets/cat.png';
let splash = './assets/splash.png'
let full = './assets/full.png';
let threeQuarter = './assets/threeQuarter.png';
let half = './assets/half.png';
let oneQuarter = './assets/oneQuarter.png';
let empty = './assets/empty.png';
let emptyDisconnect = './assets/empty_disconnect.png';


/* UI templates */
class MainScreenBehavior extends Behavior {
	onTriggerTransition(container, name) {
		let toHome =  new ScreenB();
		let toSettings =  new ScreenC();
		this.AtoB = !this.AtoB;
		switch ( name ) {
			case "home":
				container.run( new TRANSITION.CrossFade({ duration : 900 }), container.last, toHome );
				break;
			case "homeToSettings":
				container.run( new TRANSITION.Push({ direction : "right", duration : 400 }), container.last, toSettings );
				break;
			case "settingsToHome":
				container.run( new TRANSITION.Push({ direction : "left", duration : 400 }), container.last, toHome );
				break;
		}
	}
}


/* Screens */
let MainScreen = Container.template($ =>({ 
	left: 0, right: 0, top: 0, bottom: 0, active: true, skin: blueSkin, 
	Behavior: MainScreenBehavior, 
	contents: []
}));


/* Splash Screen */
let ScreenA = Container.template($ => ({ 
	left: 0, right: 0, top: 0, bottom: 0, skin: blueSkin, 
	Behavior: MainScreenBehavior, 
	active: true,
	Behavior: class extends Behavior {
		onTouchEnded(container, id, x, y, ticks) {
			container.bubble( "onTriggerTransition", "home");
		}
	}, 
	contents: [
		Picture($, { left:0, right:0, top:40, bottom:0, url:splash }),

	]
}));


/* Settings Screen */
let ScreenC = Container.template($ => ({ 
	left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin, 
	contents: [
Container($, {left: 0, right: 0,
			contents: [ 		
				Column($, {left: 0, right: 0,
					contents: [ 
		/* SETTINGS */
						Container($, {left: 0, right: 0, skin: blueSkin,
							contents: [

								Picture($, { left:0, top:10, active: true, bottom:0, width:(application.width * 0.1), url: back,
									Behavior: MainScreenBehavior, 
									Behavior: class extends Behavior {
										onTouchEnded(container, id, x, y, ticks) {
											container.bubble( "onTriggerTransition", "settingsToHome");
										}
									},  
								}),
								Label($, {left:0, right:0, top: 10, height:(application.height / 7), top: 0, style:titleStyle, string:'Settings' }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
		/* SCHEDULE 1 TITLE */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, skin: greySkin, style:labelStyle, string:'  Schedule 1:' }),
							]
						}),						
						Line($, { left: 0, right: 0, height: 3, skin: separatorSkin }),
		/* SCHEDULE 1 START */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Start:' }),
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  ' }),
								// start1Label = Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:textStyle, string: '7' }),
								minusButton1 = new Label({ left: 5, style: buttonStyle, skin: darkGreySkin, active: true, string: ' - ', behavior: Behavior({
									onTouchEnded(label, id, x,  y, ticks) {	
									scheduleStart1 -= 100;	
									if (scheduleStart1 > 999) countButton1.string = scheduleStart1.toString().slice(0, 2) + ":00";
									else countButton1.string = scheduleStart1.toString().slice(0, 1) + ":00";
									}
								})}),
								countButton1 = new Label({ left: 5, style: textStyle, active: true, string: scheduleStart1.toString().slice(0, 1) + ":00"}),
								plusButton1 = new Label({ left: 5, style: buttonStyle, skin: darkGreySkin, active: true, string: ' + ', behavior: Behavior({
			
									onTouchEnded(label, id, x,  y, ticks) {
									scheduleStart1 += 100;	
									if (scheduleStart1 > 999) countButton1.string = scheduleStart1.toString().slice(0, 2) + ":00";
									else countButton1.string = scheduleStart1.toString().slice(0, 1) + ":00";
										}
									})
								}),
								Label($, {right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  ' }),
								]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
		/* SCHEDULE 1 END*/
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  End:' }),
								// start1Label = Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:textStyle, string: '7' }),
								minusButton2 = new Label({ left: 5, style: buttonStyle, skin: darkGreySkin, active: true, string: ' - ', behavior: Behavior({
									onTouchEnded(label, id, x,  y, ticks) {	
									scheduleEnd1 -= 100;	
									if (scheduleEnd1 > 999) countButton2.string = scheduleEnd1.toString().slice(0, 2) + ":00";
									else countButton2.string = scheduleEnd1.toString().slice(0, 1) + ":00";
									}
								})}),								
								countButton2 = new Label({ left: 5, style: textStyle, active: true, string: scheduleEnd1.toString().slice(0, 2) + ":00"}),
								plusButton2 = new Label({ left: 5, style: buttonStyle, skin: darkGreySkin, active: true, string: ' + ', behavior: Behavior({
									onTouchEnded(label, id, x,  y, ticks) {
									scheduleEnd1 += 100;	
									if (scheduleEnd1 > 999) countButton2.string = scheduleEnd1.toString().slice(0, 2) + ":00";
									else countButton2.string = scheduleEnd1.toString().slice(0, 1) + ":00";
									}})
								}),
								Label($, {right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  ' }),
							]
						}),
						Line($, { left: 0, right: 0, height: 3, skin: separatorSkin }),
		/* SCHEDULE 2 TITLE */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, skin: greySkin, style:labelStyle, string:'  Schedule 2:' }),
							]
						}),						
						Line($, { left: 0, right: 0, height: 3, skin: separatorSkin }),
		/* SCHEDULE 2 START */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Start:' }),
									minusButton3 = new Label({ left: 5, style: buttonStyle, skin: darkGreySkin, active: true, string: ' - ', behavior: Behavior({
										
										onTouchEnded(label, id, x,  y, ticks) {	
										scheduleStart2 -= 100;	
										if (scheduleStart2 > 999) countButton3.string = scheduleStart2.toString().slice(0, 2) + ":00";
										else countButton3.string = scheduleStart2.toString().slice(0, 1) + ":00";
										}
									})}),
									countButton3 = new Label({ left: 5, style: textStyle, active: true, string: scheduleStart2.toString().slice(0, 2) + ":00"}),
									plusButton3 = new Label({ left: 5, style: buttonStyle, skin: darkGreySkin, active: true, string: ' + ', behavior: Behavior({
									
										onTouchEnded(label, id, x,  y, ticks) {
										scheduleStart2 += 100;	
										if (scheduleStart2 > 999) countButton3.string = scheduleStart2.toString().slice(0, 2) + ":00";
										else countButton3.string = scheduleStart2.toString().slice(0, 1) + ":00";
										}
									})
								}),
								Label($, {right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  ' }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
		/* SCHEDULE 2 END */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  End:' }),
								// start1Label = Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:textStyle, string: '7' }),
									minusButton4 = new Label({ left: 5, style: buttonStyle, skin: darkGreySkin, active: true, string: ' - ', behavior: Behavior({
										
										onTouchEnded(label, id, x,  y, ticks) {	
										scheduleEnd2 -= 100;	
										if (scheduleEnd2 > 999) countButton4.string = scheduleEnd2.toString().slice(0, 2) + ":00";
										else countButton4.string = scheduleEnd2.toString().slice(0, 1) + ":00";
										}
									})}),								
									countButton4 = new Label({ left: 5, style: textStyle, active: true, string: scheduleEnd2.toString().slice(0, 2) + ":00"}),
									plusButton4 = new Label({ left: 5, style: buttonStyle, skin: darkGreySkin, active: true, string: ' + ', behavior: Behavior({
									
										onTouchEnded(label, id, x,  y, ticks) {
										scheduleEnd2 += 100;	
										if (scheduleEnd2 > 999) countButton4.string = scheduleEnd2.toString().slice(0, 2) + ":00";
										else countButton4.string = scheduleEnd2.toString().slice(0, 1) + ":00";
										}
									})
								}),
								Label($, {right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  ' }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
		/* BLANK SPACE */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height * 0.3), top: 0, style:labelStyle, string:'  ' }),
							]
						}),						
					]			
				})
			]
		})
	]
}));



/* Home Screen */
let ScreenB = Container.template($ => ({ 
	left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin, 
	Behavior: MainScreenBehavior, 
	contents: [
		Container($, {left: 0, right: 0,
			contents: [ 		
				Column($, {left: 0, right: 0,
					contents: [ 
					/* HOME */
						Container($, {left: 0, right: 0, skin: blueSkin,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 7), top: 30, style:titleStyle, string:'My Patients' }),
								Picture($, { left:0, top:30, bottom:0, width:(application.width * 0.1), url: settingsPicture, active: true,
			Behavior: class extends Behavior {
				onTouchBegan(container, id, x, y, ticks) {
					container.bubble( "onTriggerTransition", "homeToSettings" );

				}
			}, 

								}),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					// /* CAT TITLE */
					// 	Line($, {left: 0, right: 0, top:0, bottom:0,
					// 		contents: [
					// 			Picture($, { left:0, top:0, bottom:0, width:(application.width * 0.1), url: cat }),
					// 			Label($, {left:0, right:0, height:(application.height / 8), width:(application.width * 0.9), top: 0, style:capsStyle, string:' FLUFFY  ' }),
					// 		]
					// 	}),						
					// 	Line($, { left: 0, right: 0, height: 3, skin: separatorSkin }),
					// /* FEEDING STATUS */
					// 	Line($, {left: 0, right: 0, top:0, bottom:0,
					// 		contents: [
					// 			Label($, {left:0, right:0, height:(application.height / 10), width:(application.width * 0.3), top: 0, style:labelStyle, string:'  Status:' }),
					// 			statusLabel = Label($, {left:0, right:0, height:(application.height / 10), width:(application.width * 0.7), top: 0, style:textStyle, string: ' disconnected  '}),
					// 		]
					// 	}),
					// 	Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					// /* LAST ATE */
					// 	Line($, {left: 0, right: 0, top:0, bottom:0,
					// 		contents: [
					// 			Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Last ate:' }),
					// 			lastAteLabel = Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:textStyle, string: lastAteString }),
					// 		]
					// 	}),
					// 	Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					// /* PAST 24 */
					// 	Line($, {left: 0, right: 0, top:0, bottom:0,
					// 		contents: [
					// 			Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Last drank:' }),
					// 				lastDrankLabel = Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:textStyle, string: lastDrankString }),
					// 		]
					// 	}),
					// 	Line($, { left: 0, right: 0, height: 3, skin: separatorSkin }),
					// /* FEEDER TITLE */
					// 	Line($, {left: 0, right: 0, top:0, bottom:0,
					// 		contents: [
					// 			feederPicture = Picture($, { left:0, top:0, bottom:0, width:(application.width * 0.15), url:feeder }),
					// 			feederLabel = Label($, {left:0, right:0, height:(application.height / 8), width:(application.width * 0.85), top: 0, style:feederLabelStyle, string:' FEEDER 1  ' }),
					// 		]
					// 	}),						
					// 	Line($, { left: 0, right: 0, height: 3, skin: separatorSkin }),
					/* CAT FOOD */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Patient A:' }),
								foodLevel = Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* WATER */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Patient Z' }),
								waterLevel = Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* CAT FOOD */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Patient R:' }),
								foodLevel = Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* WATER */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Patient X:' }),
								waterLevel = Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* CAT FOOD */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Patient B:' }),
								foodLevel = Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* WATER */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Patient C:' }),
								waterLevel = Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* WATER */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Patient D:' }),
								waterLevel = Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
		/* BLANK SPACE */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height * 0.22), top: 0, style:labelStyle, skin: greySkin, string:'  ' }),
							]
						}),	
 		// /* BUTTONS */
					// 	Line($, {left: 0, right: 0, top:0, bottom:0,
					// 		contents: [
					// 			Label($, {left:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Treats:' }),
					// 			dispenseButton = Label($, {left: 50, width: (application.width / 3) - 10 , height:(application.height / 10), skin: buttonSkin, 
					// 				style: buttonStyle, active: true, string:'DISPENSE', 
					// 				Behavior: class extends Behavior {
					// 					onTouchEnded(container, id, x, y, ticks) {
					// 					    if (connected && treatCount > 0){
					// 					        remotePins.invoke("/led/read", function(result) {
					// 							   	if (!result) {
					// 							   		// remotePins.invoke("sounds/playRecording");
					// 							   		new MessageWithObject("/flashLED", "").invoke();
					// 								}
					// 							});	
					// 						   	level3 = empty;
					// 						   	if (treatCount > 4) level3 = full;
					// 						   	else if (treatCount > 3) level3 = threeQuarter;
					// 						   	else if (treatCount > 2) level3 = half;
					// 						   	else if (treatCount > 1) level3 = oneQuarter;
					// 						   	treatLevel.url = level3;	
					// 						   	treatCount--;						        
					// 					    } else {
					// 					    	trace("cannot dispense when not connected or out of treats\n");
					// 					    }    
					// 					};
					// 			   }
					// 			}),
					// 			treatLevel = Picture($, {left: 39, right: 0, top:0, bottom:0, url:level3 }),
					// 		]
					// 	})
					]
				})

			]
		})
	] 
}));

/* LED Flash function */
Handler.bind("/flashLED", {
    onInvoke: function(handler, message){
    	remotePins.invoke("/led/write", 1);
    	if (deviceURL != "") new MessageWithObject(deviceURL + "dispenseTreatStart", JSON.stringify( { message: level3 } )).invoke();
    	handler.wait(1500);
    },
    onComplete: function(handler, message) {
    	remotePins.invoke("/led/write", 0);
    	if (deviceURL != "") new MessageWithObject(deviceURL + "dispenseTreatEnd", "").invoke();
    }
});

/* Timings helper function */
function getTimeDate(switcher) {
    var str = "";

    var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    var seconds = currentTime.getSeconds()
    var date = currentTime.getDate()
    var month = currentTime.getMonth()

    if (minutes < 10) {
        minutes = "0" + minutes
    }
    if (seconds < 10) {
        seconds = "0" + seconds
    }
    str += hours + ":" + minutes + ":" + seconds + ", " + (month+1) + "/" + date + '  ';
	if (switcher){
	    return ((parseInt(hours, 10) * 100) + parseInt(minutes)); 
	}
	return str;	
}
	
/* Connection Updater for Labels */
function updateFeederConnection(conn) {
	connected = conn;
	if (conn) {
		feederLabelStyle = capsStyle;
		feederLabel.style = feederLabelStyle;
		waterLevel.url = empty;
		foodLevel.url = empty;
	   	level3 = empty;
	   	trace(treatCount + "\n")
	   	if (treatCount >= 4) level3 = full;
	   	else if (treatCount >= 3) level3 = threeQuarter;
	   	else if (treatCount >= 2) level3 = half;
	   	else if (treatCount >= 1) level3 = oneQuarter;
	   	treatLevel.url = level3;	
		// dispenseButton.skin = buttonSkin;
		// dispenseButton.style = buttonStyle;
		// dispenseButton.string = 'DISPENSE TREAT';
	} else {
		feederLabelStyle = capsStyleDisconnect;
		feederLabel.style = feederLabelStyle;
		waterLevel.url = emptyDisconnect;
		foodLevel.url = emptyDisconnect;
		treatLevel.url = emptyDisconnect;
		// dispenseButton.skin = inactiveButtonSkin;
		// dispenseButton.style = inactiveStyle;
		// dispenseButton.string = 'DISCONNECTED';
	}
}

/* Application sharing functions */
Handler.bind("/discover", Behavior({
    onInvoke: function(handler, message){
        trace("Found the cat feeder device.\n");  
        deviceURL = JSON.parse(message.requestText).url;  
    }
}));

Handler.bind("/forget", Behavior({
    onInvoke: function(handler, message){
        deviceURL = "";
    }
}));


/* Pins discovery helper function */
function discovery() {
	let discoveryInstance = Pins.discover(
        connectionDesc => {
            
            if (connectionDesc.name == "cat-feeder-device") {
                updateFeederConnection(true);
                trace("Connecting to remote pins\n");
                remotePins = Pins.connect(connectionDesc);
                let foodActive = false;
                let waterActive = false;
                remotePins.repeat("/foodButton/read", 500, function(result1) {
			      	let timeNow = getTimeDate(true);
				    if ((timeNow > scheduleStart1 && timeNow < scheduleEnd1) || (timeNow > scheduleStart2 && timeNow < scheduleEnd2)) {
						if (result1) {
					      statusLabel.string = ' feeding  ';
					      lastAteString = getTimeDate(false);
					      lastAteLabel.string = lastAteString;
					      foodActive = true;
						} else {
				      		if (!waterActive) statusLabel.string = ' not present  ';
					    	foodActive = true;
						}     
				    } else {
				    	if (!waterActive) {
				      		if ((timeNow < 2400 && timeNow > scheduleEnd2) || (timeNow < scheduleStart1)) statusString = 'Next Scheduled Feed: ' + scheduleStart1.toString();
				      		else statusString = 'Next Scheduled Feed: ' + scheduleStart2.toString();
				      		statusLabel.string = statusString.slice(0, (statusString.length -2)) + ":00  ";
				        }
				      foodActive = false;
				    }
				});

				remotePins.repeat("/waterButton/read", 500, function(result2) {
			      	let timeNow = getTimeDate(true);
				    if (result2) {
				        statusLabel.string = ' drinking  ';
				        lastDrankString = getTimeDate(false);
				        lastDrankLabel.string = lastDrankString;
				        waterActive = true;
				    } else {
				    	waterActive = false;
				    }
				});

		        remotePins.repeat("/foodLevel/read", 500, function(result) {
				   	let level1 = empty;
				   	if (result >= 0.85) level1 = full;
				   	else if (result >= 0.60) level1 = threeQuarter;
				   	else if (result >= 0.35) level1 = half;
				   	else if (result >= 0.1) level1 = oneQuarter;
				   	foodLevel.url = level1;
				});

		        remotePins.repeat("/waterLevel/read", 500, function(result) {
				   	let level2 = empty;
				   	if (result >= 0.85) level2 = full;
				   	else if (result >= 0.60) level2 = threeQuarter;
				   	else if (result >= 0.35) level2 = half;
				   	else if (result >= 0.1) level2 = oneQuarter;
				   	waterLevel.url = level2;
				});
            }
        }, 
        connectionDesc => {
            if (connectionDesc.name == "cat-feeder-device") {
                updateFeederConnection(false);
                trace("Disconnected from remote pins\n");
                remotePins = undefined;

            }
        }
    )
}


/* Application set-up */
let mainScreen = new MainScreen({});
let screenA = new ScreenA();

class AppBehavior extends Behavior {
	onLaunch(application) {
		application.add( mainScreen );
		mainScreen.add( screenA );
        discovery();
    } 
    onDisplayed(application) {
        application.discover("pillsense-device.app");
    }
    onQuit(application) {
        application.forget("pillsense-device.app");
    }
}
application.behavior = new AppBehavior();