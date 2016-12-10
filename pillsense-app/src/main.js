
/* Classes Setup */
import {
    User,
    Patient,
    Med
} from 'classes';

/* Transitions Setup */
import TRANSITION from 'transitions';

/* Pins Setup */
import Pins from "pins";
let remotePins;
let connected = false;
let deviceURL = "";

/* Keyboard Setup */
import KEYBOARD from 'keyboard';

/* Scroll Setup */
import {
    FieldScrollerBehavior,
    FieldLabelBehavior
} from 'field';

/* Buttons Setup */
import { 
    Button,
    ButtonBehavior 
} from 'buttons';

/* Scroller Setup */
import {
		VerticalScroller,
		VerticalScrollbar,
		TopScrollerShadow,
		BottomScrollerShadow
} from "scroller";

/* Skins and styles */
let blackSkin = new Skin({ fill: 'black' });
let blueSkin = new Skin({ fill: '#2D9CDB' });
let redSkin = new Skin({ fill: '#EB5757' });
let greenSkin = new Skin({ fill: '#27AE60' });
let whiteSkin = new Skin({ fill: 'white' });
let greySkin = new Skin({ fill: '#E6E6E6'});
let darkGreySkin = new Skin({ fill: '#808080'});
let appSkin = new Skin ({fill: '#ddd'});
let separatorSkin = new Skin({ fill: 'silver'});
let buttonSkin = new Skin ({fill: '#404040'});
let inactiveButtonSkin = new Skin ({fill: '#b2b2b2'});
let skyBlueSkin = new Skin ({fill: '#808080'});

let buttonStyle = new Style ({font: 'bold 20px', color: 'white'});
let inactiveStyle = new Style ({font: 'bold 20px', color: 'white'});
let titleStyle = new Style({font: 'bold 24px Spinnaker', color: 'white'});
let productNameStyle = new Style({  font: 'bold 18px', horizontal: 'left', vertical: 'middle', lines: 1 });
let productDescriptionStyle = new Style({  font: '16px', horizontal: 'left', vertical: 'middle', left: 1});
let productAmountStyle = new Style({  font: '16px', horizontal: 'left', vertical: 'middle', left: 1, skin: greySkin});
let explainStyle = new Style({  font: '12px', horizontal: 'left', vertical: 'middle', left: 1});
let capsStyle = new Style({ color: 'black', font: 'bold 20px', horizontal: 'right'});
let capsStyleDisconnect = new Style({ color: '#BDBDBD', font: 'bold 20px', horizontal: 'right'});
let labelStyle = new Style({ color: 'black', font: '20px', horizontal: 'left'});
let bigBoldLabelStyle = new Style({ color: 'black', font: 'bold 24px', horizontal: 'left'});
let boldLabelStyle = new Style({ color: 'black', font: 'bold 20px', horizontal: 'left'});
let editLabelStyle = new Style({ color: '#E6E6E6', font: 'bold 20px', horizontal: 'left'});
let textStyle = new Style({ color: 'black', font: '20px', horizontal: 'right'});
let splashLabelStyle = new Style({ color: 'white', font: 'bold 50px', horizontal: 'center', vertical: 'middle' });
let hugeLabelStyle = new Style({ color: 'black', font: 'bold 125px', horizontal: 'center', vertical: 'middle' });

let fieldStyle = new Style({ color: 'black', font: 'bold 24px', horizontal: 'left',
    vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5 });
let fieldHintStyle = new Style({ color: '#aaa', font: '20px', left: 5, right: 5, top: 5, bottom: 5 });
let fieldLabelSkin = new Skin({ fill: ['transparent', 'transparent', '#C0C0C0', '#acd473'] });
let nameInputSkin = new Skin({ borders: { left: 2, right: 2, top: 2, bottom: 2 }, stroke: 'gray' });


/* System variables*/
let dispenserPicture;
let dispenserLabel;
let dispenserLabelStyle = capsStyleDisconnect;
let ibuLevel;
let aceLevel;
let dispenseButton;
let lastNameLabel;
let popSwitch = true;
let currentScreen;
let devicePatient;
let currentPatient;
let currentPatientName;
let currentMed;
let currentTimeStamp;
let currentErrorMessage;
let currentPatientMessage;
let editFirst;
let editLast;
let editBirthday;
let editGender;
let editHeight;
let editWeight;
let textFieldInputs = {};
let doctorMessage = "";
let sendButton;
let receivedPatientMessage = "";
let receivedMessageLabel = new Label({ left:0, right:0, string:"", style: labelStyle});
let addMedName;
let refreshPic;
let sendPic;
let contactPic;


/* Assets */
let back = './assets/back.png';
let redBack = './assets/redBack.png';
let greenBack = './assets/greenBack.png';
let logo = './assets/logo.png';
let add = './assets/add.png';
let edit = './assets/edit.png';
let save = './assets/save.png';
let search = './assets/search.png';
let ok = './assets/save.png';
let contactPatientBlue = './assets/contactPatientBlue.png';
let contactPatientGreen = './assets/contactPatientGreen.png';
let contactPatientRed = './assets/contactPatientRed.png';
let contactPatientGrey = './assets/contactPatientGrey.jpg';
let contactPicture = contactPatientBlue;
let send = './assets/send.png';
let plus = './assets/plus.png';
let settingsPicture = './assets/settings.png';
let dispenser = './assets/dispenser.png';
let dispenserDisconnect = './assets/dispenser_disconnect.png';
let cat = './assets/cat.png';
let splash = './assets/splash.png'
let splashFilled = './assets/splashFilled.png'
let exclamation = './assets/exclamation.png' 
let tick = './assets/tick.png' 
let full = './assets/full.png';
let threeQuarter = './assets/threeQuarter.png';
let half = './assets/half.png';
let oneQuarter = './assets/oneQuarter.png';
let empty = './assets/empty.png';
let emptyDisconnect = './assets/empty_disconnect.png';
let myPatientsTitle = './assets/empty_disconnect.png';
let refreshPicURL = './assets/refreshbutton.jpg';
let sendPicURL = './assets/sendbutton.jpg';

/* Transitions */
class MainScreenBehavior extends Behavior {
	// onLaunch(application) {
 //          application.shared = true;
 //    }
 //    onQuit(application) {
 //          application.shared = false;
 //    }
    onTouchEnded(content) {
        KEYBOARD.hide();
        content.focus();
    }
	onTriggerTransition(container, name) {
		let toSplashScreen = new SplashScreen();
		let toSplashFilled =  new SplashScreenFilled();
		let toHome =  new HomeScreen();
		let toSettings =  new SettingsScreen();
		let toPatient =  new PatientScreen();
		let toPatientEdit =  new PatientEditScreen();
		let toAddMedication =  new AddMedicationScreen();
		let toAddPatient =  new AddPatientScreen();
		let toMessageScreen =  new MessageScreen();
		let popupErrorScreen = new PopUpErrorScreen({cont: container})
		let popupTickScreen = new PopUpTickScreen({cont: container})
		switch ( name ) {
			case "home":
				currentScreen = toHome;
				addAllPatients();
				container.run( new TRANSITION.CrossFade({ duration : 900 }), container.last, currentScreen );
				break;				
			case "toHomeFade":
				currentScreen = toHome;
				addAllPatients();
				container.run( new TRANSITION.CrossFade({ duration : 450 }), container.last, currentScreen );
				break;			
			case "logoToSplash":
				currentScreen = toSplashScreen;
				container.run( new TRANSITION.CrossFade({ duration : 900 }), container.last, currentScreen );
				break;
			case "splashFilled":
				currentScreen = toSplashFilled;
				container.run( new TRANSITION.CrossFade({ duration : 900 }), container.last, currentScreen );
				break;
			case "toSettingsLeft":
				currentScreen = toSettings;
				container.run( new TRANSITION.Push({ direction : "left", duration : 400 }), container.last, currentScreen );
				break;
			case "toSettingsRight":
				currentScreen = toSettings;
				container.run( new TRANSITION.Push({ direction : "right", duration : 400 }), container.last, currentScreen );
				break;
			case "toPatientLeft":
				currentScreen = toPatient;
				createPatientMedicineScreen(currentPatient);
				container.run( new TRANSITION.Push({ direction : "left", duration : 400 }), container.last, currentScreen );
				break;
			case "toPatientRight":
				currentScreen = toPatient;
				createPatientMedicineScreen(currentPatient);
				container.run( new TRANSITION.Push({ direction : "right", duration : 400 }), container.last, currentScreen );
				break;
			case "toAddPatientLeft":
				currentScreen = toAddPatient;
				container.run( new TRANSITION.Push({ direction : "left", duration : 400 }), container.last, currentScreen );
				break; 
			case "toAddPatientRight":
				currentScreen = toAddPatient;
				container.run( new TRANSITION.Push({ direction : "right", duration : 400 }), container.last, currentScreen );
				break; 		
			case "toHomeRight":
				currentScreen = toHome;
				addAllPatients();
				container.run( new TRANSITION.Push({ direction : "right", duration : 400 }), container.last, currentScreen );
				break;
			case "toHomeLeft":
				currentScreen = toHome;
				addAllPatients();
				container.run( new TRANSITION.Push({ direction : "left", duration : 400 }), container.last, currentScreen );
				break;
			case "toPatientEditLeft":
				currentScreen = toPatientEdit;
				container.run( new TRANSITION.Push({ direction : "left", duration : 400 }), container.last, currentScreen );
				break;				
			case "toAddMedicationLeft":
				currentScreen = toAddMedication;
				container.run( new TRANSITION.Push({ direction : "left", duration : 400 }), container.last, currentScreen );
				break;
			case "toMessageRight":
				currentScreen = toMessageScreen;
				container.run( new TRANSITION.Push({ direction : "right", duration : 400 }), container.last, currentScreen );
				break;	
			case "toMessagingFade":
				currentScreen = toMessageScreen ;
				container.run( new TRANSITION.CrossFade({ duration : 450 }), container.last, currentScreen );
				break;
			case "toPopUpTickFade":
				currentScreen = popupTickScreen;
				container.run( new TRANSITION.CrossFade({ duration : 450 }), container.last, currentScreen );
				break;	
			case "toPopUpExclamationFade":
				currentScreen = popupErrorScreen;
				container.run( new TRANSITION.CrossFade({ duration : 450 }), container.last, currentScreen );
				break;	

		}
	}
}

/* IAP140 Keyboard */
let MyField = Container.template($ => ({ 
    width: 200, height: 36, skin: nameInputSkin, contents: [
        Scroller($, { 
            left: 4, right: 4, top: 4, bottom: 4, active: true, 
            Behavior: FieldScrollerBehavior, clip: true, 
            contents: [
                Label($, { 
                    left: 0, top: 0, bottom: 0, skin: fieldLabelSkin, 
                    style: labelStyle, horizontal:"right", anchor: 'NAME',
                    editable: true, string: $.name,
                    Behavior: class extends FieldLabelBehavior {
                        onEdited(label) {
                            let data = this.data;
                            data.name = label.string;
                            textFieldInputs[$.ind] = data.name;
                            label.container.hint.visible = (data.name.length == 0);
                            // trace(Object.keys(this.data) + ", data.name: " + data.name+"\n");
                        }
                    },
                }),
                Label($, {
                    left: 4, right: 4, top: 4, bottom: 4, style: fieldHintStyle,
                    string: "Tap to add text...", name: "hint"
                }),
            ]
        })
    ]
}));



function updateMessageBox(labelOrVar) {
	doctorMessage = labelOrVar;
	return doctorMessage;
}

/* A Message Box Specific Field */
let MessageField = Container.template($ => ({ 
    width: application.width, height: 36, skin: nameInputSkin, contents: [
        Scroller($, { 
            left: 4, right: 4, top: 4, bottom: 4, active: true, 
            Behavior: FieldScrollerBehavior, clip: true, 
            contents: [
                Label($, { 
                    left: 0, top: 0, bottom: 0, skin: fieldLabelSkin, 
                    style: labelStyle, horizontal:"right", anchor: 'NAME',
                    editable: true, string: $.name,
                    Behavior: class extends FieldLabelBehavior {
                        onEdited(label) {
                            let data = this.data;
                            data.name = label.string;
                            doctorMessage = updateMessageBox(data.name);
                            label.container.hint.visible = (data.name.length == 0);
                            // trace(data.name+"\n");
                        }
                    },
                }),
                Label($, {
                    left: 4, right: 4, top: 4, bottom: 4, style: fieldHintStyle,
                    string: "Tap to add text...", name: "hint"
                }),
            ]
        })
    ]
}));

var messageBox = new MessageField({name: "  Mando"});

/*Refresh Button Template*/ 
let RefreshButtonTemplate = Button.template($ => ({
    top: 0, bottom: 0, left: 0, right: 0,
    contents: [
    	refreshPic = Picture($, { left:0, top:0, bottom:0, url:refreshPicURL }),
        //Label($, {left: 0, right: 0, string: $.textForLabel, style: labelStyle}),
        
    ],
    Behavior: class extends ButtonBehavior {
        onTap(button){
        	// trace("refresh button in app tapped\n");
			if (deviceURL != "") new Message(deviceURL + "patientMessage").invoke(Message.JSON).then(json => { receivedPatientMessage = json.patientMessage; }); //trace("device received message: "+json.doctorMessage+"\n");
			receivedMessageLabel.string = "last message: "+receivedPatientMessage;
			//receivedMessageLabel.string = receivedPatientMessage;
        }
    }
}));


/* Button Template*/ 
let SendButtonTemplate = Button.template($ => ({
    top: 0, bottom: 0, left: 0, right: 0,  width: (application.width / 2) - 10,
    contents: [
        sendPic = Picture($, { left:0, top:0, bottom:0, url:sendPicURL }),
    ],
    Behavior: class extends ButtonBehavior {
        onTap(button){
			// trace("messageBox: "+messageBox.text+"\n");
			// trace("doctor message: "+doctorMessage+"\n");
			/*Handler.bind("/doctorMessage", Behavior({
    			onInvoke: function(handler, message){
        			message.responseText = JSON.stringify({doctorMessage: doctorMessage});
        			message.status = 200;
    			}
			}));*/
			//if (deviceURL != "") new Message(deviceURL + "getDeviceMessage").invoke(Message.JSON).then(json => { receivedMessageLabel.string = json.messageVal; trace(json.messageVal+"\n");});
        }
    }
}));


/* Simulated User Login & Data*/

//BAD: 
let badTime = new Date();
badTime.setDate(badTime.getDate() -1);
// trace(badTime + " = BADTIME \n")

//GOOD:
let goodTime = new Date();
goodTime.setHours(goodTime.getHours() - 1); 
// trace(goodTime + " = GOODTIME \n")

let doctor = new User("Doctor_1", "password123");
doctor.patientsBad.push(new Patient("Alfie", "Nowell", "01/01/92", "Male", "6ft", "160lbs", false, "ibuprofen", badTime, "no message", "no message"));
doctor.patientsBad.push(new Patient("Amelia", "Carr",  "02/02/91", "Female", "5ft, 6in", "130lbs", false, "acetaminophen", badTime, "no message", "no message"));
doctor.patientsBad.push(new Patient("Archie", "Morrison",  "03/03/90", "Male", "6ft 3in", "180lbs", false, "prozac", badTime, "no message", "no message" ));
doctor.patientsGood.push(new Patient("Ava", "Shute",  "04/04/89", "Female", "5ft 2in", "140lbs", true, "ibuprofen", goodTime, "no message","no message" ));
doctor.patientsGood.push(new Patient("Abe", "Paley",  "05/05/88", "Declined to say", "5ft 6in", "165lbs", true, "acetaminophen", goodTime, "no message","no message"));
doctor.patientsGood.push(new Patient("Aaron", "Catteral",  "06/06/87", "Male", "5ft 11in", "174lbs", true, "prozac", goodTime, "no message","no message"));
doctor.patientsGood.push(new Patient("Anna", "Style",  "07/07/86", "Female", "5ft 10in", "168lbs", true, "ibuprofen", goodTime, "no message","no message"));

doctor.patientsBad[0].addMed(new Med("ibuprofen", "300", "mg", 4, "day", "None", "Can cause anemia, vomiting", badTime, "Patient missed deadline", "I was stuck in traffic"));
doctor.patientsBad[0].addMed(new Med("prozac", "20", "mg", 1, "day", "None", "Can cause anxiety", goodTime, "None", "None"));
doctor.patientsBad[1].addMed(new Med("prozac", "20", "mg", 1, "day", "None", "Can cause anxiety", badTime, "No Medication - need refill", "I am going to the pharmacy today"));
doctor.patientsBad[2].addMed(new Med("acetaminophen", "325", "mg", 3, "day", "None", "Can cause diarrhea", badTime, "No signal from the device", "None"));
doctor.patientsGood[0].addMed(new Med("ibuprofen", "300", "mg", 4, "day", "None", "Can cause anemia, vomiting", goodTime, "None", "None"));
doctor.patientsGood[1].addMed(new Med("ibuprofen", "300", "mg", 4, "day", "None", "Can cause anemia, vomiting", goodTime, "None", "None"));
doctor.patientsGood[1].addMed(new Med("dayquil", "40", "ml", 2, "day", "None", "Can cause sore throat", goodTime, "None", "None"));
doctor.patientsGood[2].addMed(new Med("acetaminophen", "325", "mg", 3, "day", "None", "Can cause diarrhea", goodTime, "None", "None"));
doctor.patientsGood[3].addMed(new Med("ibuprofen", "300", "mg", 4, "day", "None", "Can cause anemia, vomiting", goodTime, "None", "None"));
doctor.patientsGood[3].addMed(new Med("acetaminophen", "325", "mg", 3, "day", "None", "Can cause diarrhea", goodTime, "None", "None"));

currentPatient = doctor.patientsBad[0];
currentMed = currentPatient.meds[0];
devicePatient = doctor.patientsGood[0];


/* Dynamic Patient Rows Templates and Functions*/
function createPatientHomeScreen(patient) {
	if (patient.statusGood == true) {
		return new patientTemplate({height: 50, pat: patient, status: tick});
	} else {
		return new patientTemplate({height: 50, pat: patient, status: exclamation});
	}
}

let patientTemplate = Line.template($ => ({
    left: 0, right: 0, top:0, bottom:0, active: true,
    contents: [
        Label($, {left:0, right:0, height: $.height, active: true, style:labelStyle, string: '  ' + String($.pat.first) + ' ' + String($.pat.last),
			Behavior: class extends Behavior {
				onTouchEnded(container, id, x, y, ticks) {
				if (popSwitch){
						currentPatient = $.pat;
						currentPatientName = String($.pat.first) + ' ' + String($.pat.last);
					}	
					container.bubble( "onTriggerTransition", "toPatientLeft" );
				}
			}, 
    	}),
		Picture($, { left:0, top:0, bottom:0, url: $.status, active: true,
			Behavior: class extends Behavior {
				onTouchEnded(container, id, x, y, ticks) {
					if (popSwitch){
						popSwitch = false;
						currentScreen.active = false;
						currentPatient = $.pat;
						currentPatientName = String($.pat.first) + ' ' + String($.pat.last);
						if ($.status == exclamation) {
							container.bubble( "onTriggerTransition", "toPopUpExclamationFade" );
						} else {
							container.bubble( "onTriggerTransition", "toPopUpTickFade" );
						} 
					}
				}
			}, 
		}),
	]
}));

var seperatorTemplate = Line.template($ => ({
	left: 0, right: 0, height: 1, skin: separatorSkin,
}));


var blackScreen = Line.template($ => ({
    left: 0, right: 0, top:0, bottom:0,
	contents: [
		Label($, {left:0, right:0, height: $.height, top: 0, style:labelStyle, skin: greySkin, string:'  ' })]
	}));	


function addAllPatients() {
	var i;
	for (i = 0; i < doctor.patientsBad.length; i++) {
		var curPatient = createPatientHomeScreen(doctor.patientsBad[i]);
		currentScreen.lel.homeScreenAddHere.add(curPatient);
		currentScreen.lel.homeScreenAddHere.add(new seperatorTemplate());
	}
	for (i = 0; i < doctor.patientsGood.length; i++) {
		var curPatient = createPatientHomeScreen(doctor.patientsGood[i]);
		currentScreen.lel.homeScreenAddHere.add(curPatient);
		currentScreen.lel.homeScreenAddHere.add(new seperatorTemplate());
	}
	var blankBottomLength = 536;
	currentScreen.lel.homeScreenAddHere.add( new blackScreen({height : blankBottomLength}));
}

function movePatient(patient) {
	for (var i = 0; i < doctor.patientsBad.length; i++) {
		if (doctor.patientsBad[i] == patient) {
			doctor.patientsBad.splice(i);
		    doctor.patientsGood.push(patient);
		    return;
		}
	}
	for (var i = 0; i < doctor.patientsGood.length; i++) {
		if (doctor.patientsGood[i] == patient) {
			doctor.patientsGood.splice(i);
		    doctor.patientsBad.push(patient);
		    return;
		}
	}
}

function patientCorrectPlace(patient, good) {
	// good is a boolean of good array or bad array
	if (good == true) {
		for (var i = 0; i < doctor.patientsGood.length; i++) {
			if (doctor.patientsGood[i] == patient) {
				return true;
			}
		}
		return false;
	}
	if (good == false) {
		for (var i = 0; i < doctor.patientsBad.length; i++) {
			if (doctor.patientsBad[i] == patient) {
				return true;
			}
		}
		return false;
	}
}


/* Screens */
let MainScreen = Container.template($ =>({ 
	left: 0, right: 0, top: 0, bottom: 0, active: true, skin: blueSkin, 
	Behavior: MainScreenBehavior, contents: []
}));


/* Logo Screen */
let LogoScreen = Container.template($ => ({ 
	left: 0, right: 0, top: 0, bottom: 0, skin: blueSkin, Behavior: MainScreenBehavior, active: true,
	Behavior: class extends Behavior {
		// onTouchEnded(container, id, x, y, ticks) {
		onDisplayed(container, id, x, y, ticks) {
			var date = new Date();
			var curDate;
			do { curDate = new Date(); } 
			while(curDate-date < 2000);
			container.bubble( "onTriggerTransition", "logoToSplash");
		}
	}, 
	contents: [Picture($, { left:0, right:0, top:40, bottom:0, url:logo }),]
}));

/* Splash Screen */
let SplashScreen = Container.template($ => ({ 
	left: 0, right: 0, top: 0, bottom: 0, skin: blueSkin, Behavior: MainScreenBehavior, active: true,
	Behavior: class extends Behavior {
		onTouchEnded(container, id, x, y, ticks) {container.bubble( "onTriggerTransition", "splashFilled");}
	}, 	
	contents: [Picture($, { left:0, right:0, top:40, bottom:0, url:splash }),]
}));


/* Splash Screen - Filled*/
let SplashScreenFilled = Container.template($ => ({ 
	left: 0, right: 0, top: 0, bottom: 0, skin: blueSkin, Behavior: MainScreenBehavior, active: true,
	Behavior: class extends Behavior {
		onTouchEnded(container, id, x, y, ticks) {container.bubble( "onTriggerTransition", "home");}
	}, 
	contents: [Picture($, { left:0, right:0, top:40, bottom:0, url:splashFilled }),]
}));


/* Pop Up Error Screen */
let PopUpErrorScreen = Container.template($ => ({
	skin: blackSkin, backgroundColor: "#2D9CDB", left: 0, right: 0, top: 0, bottom: 0, 
	contents: [
		Column($, {left: 1, right: 1, top: 1, bottom: 1, skin: whiteSkin,
			contents: [
				Container($, {left: 0, right: 0, height: 70, skin: redSkin,
					contents: [
						Picture($, { left:10, active: true, width:25, url: redBack, active: true, 
							Behavior: class extends Behavior {
								onTouchEnded(container, id, x, y, ticks) {
						            popSwitch = true;
						            container.bubble( "onTriggerTransition", "toHomeFade" );
								}
							},
						}),
						Label($, {left:82, right:50, height:50, style:titleStyle, string:'Error Details' }),
					]
        // Label($, {left:0, right:0, height: $.height, active: true, style:labelStyle, string: '  ' + String($.first) + ' ' + String($.last),
				}),	
				Line($, {left:10, right:10, height:60,}),
				Label($, {left:60, right:10, height:25, vertical: "middle", style:bigBoldLabelStyle, string: String(currentPatient.first) + ' ' + String(currentPatient.last) + ' failed',}),
				Label($, {left:60, right:10, height:25, vertical: "middle", style:bigBoldLabelStyle, string: 'to take ' + String(currentMed.name)}),
				// Label($, {left:60, right:10, height:25, vertical: "middle", style:bigBoldLabelStyle, string: 'at ' + String(currentPatient.lastTakenTime),}),
				Label($, {left:60, right:10, height:25, vertical: "middle", style:bigBoldLabelStyle, string: 'at ' + getTimeDateString(currentMed.lastTakenTime),}),
				Line($, {left:10, right:10, height:50,}),
				Label($, {left:10, right:10, height:30, style:boldLabelStyle, string: 'Error Message:',}),
				Label($, {left:10, right:10, height:30, style:labelStyle, string: String(currentMed.errorMessage),}),
				// Label($, {left:10, right:10, height:30, style:labelStyle, string: "Patient failed to take medication on time",}),
				Line($, {left:10, right:10, height:50,}),
				Label($, {left:10, right:10, height:30, style:boldLabelStyle, string: 'Patient\'s Message:',}),
				Label($, {left:10, right:10, height:30, style:labelStyle, editable: false, string: String(currentMed.patientMessage),}),
				// Label($, {left:10, right:10, height:30, style:labelStyle, editable: false, string: "no message recorded",}),
				Line($, {left:10, right:10, height:50,}),
				Picture($, { left:10, right: 10, active: true, width:25, url: contactPatientRed, active: true, 							
					Behavior: class extends Behavior {
						onTouchEnded(container, id, x, y, ticks) {
				            popSwitch = true; 
				            container.bubble( "onTriggerTransition", "toMessagingFade" );
						}
					},
				}),
			]
		}),
	],  
}));

/* Contact Patient Screen */
let ContactPatientScreen = Container.template($ => ({ 
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
								Label($, {left:0, right:0, height:70, top: 14, style:titleStyle, string:'Send Message to ' + String(currentPatientName), }),
								Picture($, { left:0, top:19, bottom:0, width:25, url: back, active: true,
									Behavior: class extends Behavior {
										onTouchEnded(container, id, x, y, ticks) {
											if (popSwitch) container.bubble( "onTriggerTransition", "home" );
										}
									}, 
								}),
							]
						}),
						Line($, { left: 0, right: 0, height: 10, }),
						Label($, {left:10, right:10, height:30, style:boldLabelStyle, string: 'Message:',}),
						Label($, {left:10, right:10, height:50, active: true, editable: true, style:editLabelStyle, string:'  enter text', 
									Behavior: class extends Behavior {onTouchEnded(label) {
				                            label.style = labelStyle,
										}
									}, 
								}),
						
					]
				})

			]
		})
	] 
}));

/* Pop Up Tick Screen */
let PopUpTickScreen = Container.template($ => ({
	skin: blackSkin, backgroundColor: "#2D9CDB", left: 0, right: 0, top: 0, bottom: 0,  
	contents: [
		Column($, {left: 1, right: 1, top: 1, bottom: 1, skin: whiteSkin,
			contents: [
				Container($, {left: 0, right: 0, height: 70, skin: greenSkin,
					contents: [
						Picture($, { left:10, active: true, width:25, url: greenBack, active: true, 
							Behavior: class extends Behavior {
								onTouchEnded(container, id, x, y, ticks) {
						            popSwitch = true;
						            container.bubble( "onTriggerTransition", "toHomeFade" );
								}
							},
						}),
						Label($, {left:82, right:50, height:50, style:titleStyle, string:'Details' }),
					]
				}),
				Line($, {left:10, right:10, height:60,}),
				Label($, {left:60, right:10, height:25, vertical: "middle", style:bigBoldLabelStyle, string: String(currentPatient.first) + ' ' + String(currentPatient.last) + ' last',}),
				Label($, {left:60, right:10, height:25, vertical: "middle", style:bigBoldLabelStyle, string: 'took ' + String(currentMed.name),}),
				// Label($, {left:60, right:10, height:25, vertical: "middle", style:bigBoldLabelStyle, string: 'at ' + String(currentPatient.lastTakenTime),}),
				Label($, {left:60, right:10, height:25, vertical: "middle", style:bigBoldLabelStyle, string: 'at ' + getTimeDateString(currentMed.lastTakenTime),}),
				Line($, {left:10, right:10, height:260,}),
				Picture($, { left:10, right: 10, active: true, width:25, url: contactPatientGreen, active: true, 							
					Behavior: class extends Behavior {
						onTouchEnded(container, id, x, y, ticks) {
				            popSwitch = true; 
				            container.bubble( "onTriggerTransition", "toMessagingFade" );
						}
					},
				}),	
			]
		}),
	],  
}));


/* Home Screen */
let HomeScreen = Container.template($ => ({ 
	left: 0, right: 0, top: 0, skin: whiteSkin, 
	Behavior: MainScreenBehavior, 
	contents: [
		Container($, {left: 0, right: 0, name: 'lel',
			contents: [ 		
				Column($, {left: 0, right: 0, name: 'homeScreenAddHere',
					contents: [ 
					/* HOME */
						Container($, {left: 0, right: 0, skin: blueSkin,
							contents: [
								Label($, {left:0, right:0, height: 70, top: 0, style:titleStyle, string:'My Patients' }),
								Picture($, { left: 10, top: 5, bottom:0, width: 32, url: settingsPicture, active: true,
									Behavior: class extends Behavior {
										onTouchEnded(container, id, x, y, ticks) {
											if (popSwitch) container.bubble( "onTriggerTransition", "toSettingsRight" );
										}
									}, 
								}),
								Picture($, { right:10, top:3, active: true, bottom:0, width: 32, url: add, active: true, 
									Behavior: class extends Behavior {
										onTouchEnded(container, id, x, y, ticks) {
											if (popSwitch) container.bubble( "onTriggerTransition", "toAddPatientLeft");
										}
									},  
								}),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),	
					]
				})
			]
		})
	] 
}));
	


// /* Add Patient Screen */
// let AddPatientScreen = Container.template($ => ({ 
// 	left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin, 
// 	Behavior: MainScreenBehavior, 
// 	contents: [
// 		Container($, {left: 0, right: 0,
// 			contents: [ 		
// 				Column($, {left: 0, right: 0,
// 					Behavior: class extends Behavior {
// 						onTouchEnded(content) {
// 			        		//SystemKeyboard.hide();
// 			        		trace("hide keyboard moom \n");
// 			        		//SystemKeyBoard.hide();
// 			        		content.focus();
// 		    			}
// 		    		},
//     				contents: [ 
// 					/* ADD PATIENT TITLE */
// 						Container($, {left: 0, right: 0, skin: blueSkin,
// 							contents: [
// 								Label($, {left:10, right:40, height:70, top: 30, style:titleStyle, string:'Add Patient' }),
// 								Picture($, { left:10, top:30, active: true, bottom:0, width:(application.width * 0.1), url: back, active: true, 
// 									Behavior: class extends Behavior {
// 										onTouchEnded(container, id, x, y, ticks) {
// 											if (popSwitch) container.bubble( "onTriggerTransition", "toHomeRight");
// 										}
// 									},  
// 								}),
// 								Picture($, { right:10, top:30, active: true, bottom:0, width:(application.width * 0.25), url: save, active: true, 
// 									Behavior: class extends Behavior {
// 										onTouchEnded(container, id, x, y, ticks) {
// 											var newPatient = new Patient("John", "Doe", "01/01/1989", "Male", "6ft", "169 lbs", true, "None");
// 											doctor.patientsGood.push(newPatient);
// 											if (popSwitch) container.bubble( "onTriggerTransition", "toHomeRight");
// 										}
// 									},  
// 								}),
// 							]
// 						}),
// 						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
// 					/* FIRST NAME */
// 						Line($, {left: 0, right: 0, top:0, bottom:0,
// 							contents: [
// 								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  First Name:' }),
// 								Label($, {right:25, height:(application.height / 10), top: 0, active: true, editable: true, style:editLabelStyle, string:'  enter text', 
// 									Behavior: class extends Behavior {onTouchEnded(label) {
// 				                            label.string = "John",
// 				                            label.style = labelStyle,
// 										}
// 									}, 
// 								}),
// 							]
// 						}),
// 						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
// 					/* LAST NAME */
// 						Line($, {left: 0, right: 0, top:0, bottom:0,
// 							contents: [
// 								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Last Name:' }),
// 								Label($, {right:25, height:(application.height / 10), top: 0, active: true, editable: true, style:editLabelStyle, string:'  enter text', 
// 									Behavior: class extends Behavior {onTouchEnded(label) {
// 				                            label.string = "Doe",
// 				                            label.style = labelStyle,
// 										}
// 									}, 
// 								}),
// 							]
// 						}),
// 						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
// 					/* BIRTHDAY */
// 						Line($, {left: 0, right: 0, top:0, bottom:0,
// 							contents: [
// 								Label($, {left:0, right:0, height:(application.height / 10), top: 0, active: true, style:labelStyle, string:'  Birthday:'}), 
// 								Label($, {right:25, height:(application.height / 10), top: 0, active: true, editable: true, style:editLabelStyle, string:'  enter text', 
// 									Behavior: class extends Behavior {onTouchEnded(label) {
// 				                            label.string = "01/01/1989",
// 				                            label.style = labelStyle,
// 										}
// 									}, 
// 								}),
// 							]
// 						}),
// 						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),	
// 					/* GENDER */
// 						Line($, {left: 0, right: 0, top:0, bottom:0,
// 							contents: [
// 								Label($, {left:0, right:0, height:(application.height / 10), top: 0, active: true, style:labelStyle, string:'  Gender:'}), 
// 								Label($, {right:25, height:(application.height / 10), top: 0, active: true, editable: true, style:editLabelStyle, string:'  enter text', 
// 									Behavior: class extends Behavior {onTouchEnded(label) {
// 				                            label.string = "Male",
// 				                            label.style = labelStyle,
// 										}
// 									}, 
// 								}),
// 							]
// 						}),
// 						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
// 					/* HEIGHT */
// 						Line($, {left: 0, right: 0, top:0, bottom:0,
// 							contents: [
// 								Label($, {left:0, right:0, height:(application.height / 10), top: 0, active: true, style:labelStyle, string:'  Height:'}), 
// 								Label($, {right:25, height:(application.height / 10), top: 0, active: true, editable: true, style:editLabelStyle, string:'  enter text', 
// 									Behavior: class extends Behavior {onTouchEnded(label) {
// 				                            label.string = "6ft",
// 				                            label.style = labelStyle,
// 										}
// 									}, 
// 								}),
// 							]
// 						}),
// 						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
// 					/* WEIGHT */
// 						Line($, {left: 0, right: 0, top:0, bottom:0,
// 							contents: [
// 								Label($, {left:0, right:0, height:(application.height / 10), top: 0, active: true, style:labelStyle, string:'  Weight:'}), 
// 								Label($, {right:25, height:(application.height / 10), top: 0, active: true, editable: true, style:editLabelStyle, string:'  enter text', 
// 									Behavior: class extends Behavior {onTouchEnded(label) {
// 				                            label.string = "169 lbs",
// 				                            label.style = labelStyle,
// 										}
// 									}, 
// 								}),
// 							]
// 						}),
// 						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
// 					/* ADD MEDICATION */
// 						Line($, {left: 0, right: 0, top:0, bottom:0,
// 							contents: [
// 								Picture($, { left:0, top:0, bottom:0, url:plus, active: true, 
// 									Behavior: class extends Behavior {
// 										onTouchEnded(container, id, x, y, ticks) {
// 											container.bubble( "onTriggerTransition", "toAddMedicationLeft");
// 										}
// 									},  									
// 								}),
// 								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Add Medication' }),
// 							]
// 						}),
// 						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
// 		/* BLANK SPACE */
// 						Line($, {left: 0, right: 0, top:0, bottom:0,
// 							contents: [
// 								Label($, {left:0, right:0, height:(application.height * 0.22), top: 0, style:labelStyle, skin: greySkin, string:'  ' }),
// 							]
// 						}),	
// 					]
// 				})

// 			]
// 		})
// 	] 
// }));


/* Patient Edit Screen */
let AddPatientScreen = Container.template($ => ({ 
	left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin, 
	Behavior: MainScreenBehavior, 
	contents: [
		Container($, {left: 0, right: 0, 
			contents: [ 		
				Column($, {left: 0, right: 0, active: true, 
					Behavior: class extends Behavior {
						onTouchEnded(content) {
			        		//SystemKeyboard.hide();
			        		trace("hide keyboard moom \n");
			        		//SystemKeyBoard.hide();
			        		content.focus();
		    			}
    				},
					contents: [ 
					/* PATIENT X TITLE */
						Container($, {left: 0, right: 0, skin: blueSkin, 
							contents: [
								Label($, {left:0, right:0, height:(application.height / 8), top: 30, style:titleStyle, string:'Add Patient' }),
								Picture($, { left:0, top:30, active: true, bottom:0, width:(application.width * 0.1), url: back, active: true, 
									Behavior: class extends Behavior {
										onTouchEnded(container, id, x, y, ticks) {
											container.bubble( "onTriggerTransition", "toHomeRight");
										}
									},  
								}),
								Picture($, { right:10, top:30, active: true, bottom:0, width:(application.width * 0.25), url: save, active: true, 
									Behavior: class extends Behavior {
										onTouchEnded(container, id, x, y, ticks) {
											var newPatient = new Patient(textFieldInputs.first, textFieldInputs.last, textFieldInputs.birthday, textFieldInputs.gender,
												textFieldInputs.height, textFieldInputs.weight, true, "None");
											currentPatient.first = textFieldInputs.first;
											currentPatient.last = textFieldInputs.last;
											currentPatient.birthday = textFieldInputs.birthday;
											currentPatient.gender = textFieldInputs.gender;
											currentPatient.height = textFieldInputs.height;
											currentPatient.weight = textFieldInputs.weight;
											currentPatientName = currentPatient.first + ' ' + currentPatient.last;
											doctor.patientsGood.push(newPatient); 
											container.bubble( "onTriggerTransition", "toHomeRight");
										}
									},  
								}),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* FIRST NAME */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, active: true, style:labelStyle, string:'  First Name:', 
									Behavior: class extends Behavior {
										onTouchEnded(content) {
											KEYBOARD.hide();
        									//SystemKeyboard.hide();
        									system.keyboard.visible = false;
        									//SystemKeyBoard.hide();
        									content.focus();
    									}
    								},
    							}),
								editFirst = new MyField({name: "John", ind: 'first'}),
								// new MyField({name: "John"}),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* LAST NAME */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, active: true, style:labelStyle, string:'  Last Name:', 
									Behavior: class extends Behavior {
										onTouchEnded(content) {
											KEYBOARD.hide();
        									//SystemKeyboard.hide();
        									system.keyboard.visible = false;
        									//SystemKeyBoard.hide();
        									content.focus();
    									}
    								},
    							}),

								editLast =  new MyField({name: "Doe", ind: 'last'}),
								// new MyField({name: "Doe"}),

							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* BIRTHDAY */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, active: true, style:labelStyle, string:'  Birthday:', 
									Behavior: class extends Behavior {
										onTouchEnded(content) {
											KEYBOARD.hide();
        									//SystemKeyboard.hide();
        									system.keyboard.visible = false;
        									//SystemKeyBoard.hide();
        									content.focus();
    									}
    								},
    							}),

								editBirthday = new MyField({name: "02/14/96", ind: 'birthday'}),
								// new MyField({name: "01/01/92"}),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),	
					/* GENDER */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, active: true, style:labelStyle, string:'  Gender:', 
									Behavior: class extends Behavior {
										onTouchEnded(content) {
											KEYBOARD.hide();
        									//SystemKeyboard.hide();
        									system.keyboard.visible = false;
        									//SystemKeyBoard.hide();
        									content.focus();
    									}
    								},
    							}),

								editGender = new MyField({name: "male", ind: 'gender'}),
								// new MyField({name: "Male"}),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* HEIGHT */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, active: true, style:labelStyle, string:'  Height:', 
									Behavior: class extends Behavior {
										onTouchEnded(content) {
											KEYBOARD.hide();
        									//SystemKeyboard.hide();
        									system.keyboard.visible = false;
        									//SystemKeyBoard.hide();
        									content.focus();
    									}
    								},
    							}),

								editHeight = new MyField({name: "6 ft", ind: 'height'}),
								// new MyField({name: "6ft"}),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* WEIGHT */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, active: true, style:labelStyle, string:'  Weight:', 
									Behavior: class extends Behavior {
										onTouchEnded(content) {
											KEYBOARD.hide();
        									//SystemKeyboard.hide();
        									system.keyboard.visible = false;
        									//SystemKeyBoard.hide();
        									content.focus();
    									}
    								},
    							}),

								editWeight = new MyField({name: "172 lbs", ind: 'weight'}),
								// new MyField({name: "169lbs"}),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* ADD MEDICATION */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Picture($, { left:0, top:0, bottom:0, url:plus, active: true, 
									Behavior: class extends Behavior {
										onTouchEnded(container, id, x, y, ticks) {
											container.bubble( "onTriggerTransition", "toAddMedicationLeft");
											SystemKeyboard.hide();
											container.focus();
										}
									},  									
								}),
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Add Medication' }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
		/* BLANK SPACE */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height * 0.22), top: 0, style:labelStyle, skin: greySkin, string:'  ' }),
							]
						}),	
					]
				})

			]
		})
	] 
}));


function createPatientMedicineScreen(patient) {
	var i;
	for (i = 0; i < patient.meds.length; i++) {
		var curMed = patient.meds[i];
		// trace("createPatientMedicineScreen says: " + patient.first + " " + curMed.name + ' \n' );
		var takenMed = checkTaken(patient, curMed);
		if (takenMed == true) {
			currentScreen.patientFirst.patientSecond.add(new medicineTemplate({height: (application.height / 10), curMed: curMed, url: tick}));
		}
		else {
			currentScreen.patientFirst.patientSecond.add(new medicineTemplate({height: (application.height / 10), curMed: curMed, url: exclamation}));
		}
		currentScreen.patientFirst.patientSecond.add(new seperatorTemplate());
	}
	currentScreen.patientFirst.patientSecond.add(new addMedTemplate());
	currentScreen.patientFirst.patientSecond.add( new blackScreen({height : 536}));
}


// height, curMed, url
let medicineTemplate = Line.template($ => ({
    left: 0, right: 0, top:0, bottom:0, active: true,
    contents: [
    	Label($, {left:0, right:0, height: $.height, top: 0, style:labelStyle, string: "   " + $.curMed.name}),
		Picture($, { right:0, top:0, bottom:0, url: $.url, active: true,
		Behavior: class extends Behavior {
				onTouchEnded(container) {
					if (popSwitch){
						popSwitch = false;
						currentScreen.active = false;
						currentPatientName = String(currentPatient.first) + ' ' + String(currentPatient.last);
						currentMed = $.curMed;
						if ($.url == exclamation) {
							container.bubble( "onTriggerTransition", "toPopUpExclamationFade" );
						} else {
							container.bubble( "onTriggerTransition", "toPopUpTickFade" );
						} 
					}
				}
			}}),
	]
}));

let addMedTemplate = Line.template($ =>  ({
	left: 0, right: 0, top:0, bottom:0,
	contents: [
		Picture($, { left:0, top:0, bottom:0, url:plus, active: true, 
			Behavior: class extends Behavior {
				onTouchEnded(container, id, x, y, ticks) {
					container.bubble( "onTriggerTransition", "toAddMedicationLeft");
				}
			},  									
		}),
		Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Add Medication' }),
	]
}));


/* Patient Screen */
let PatientScreen = Container.template($ => ({ 
	left: 0, right: 0, top: 0, skin: whiteSkin, 
	Behavior: MainScreenBehavior, 
	contents: [
		Container($, {left: 0, right: 0, name: "patientFirst",
			contents: [ 		
				Column($, {left: 0, right: 0, name: "patientSecond",
					contents: [ 
					/* PATIENT X TITLE */
						Container($, {left: 0, right: 0, skin: blueSkin,
							contents: [
								Label($, {left:10, right:40, height: 55, top: 10, style:titleStyle, string:currentPatientName }),
								Picture($, { left:10, top:12, active: true, bottom:0, width:(application.width * 0.1), url: back, active: true, 
									Behavior: class extends Behavior {
										onTouchEnded(container, id, x, y, ticks) {
											container.bubble( "onTriggerTransition", "toHomeRight");
										}
									},  
								}),
								Picture($, { right:10, top:12, active: true, bottom:0, width:(application.width * 0.25), url: edit, active: true, 
									Behavior: class extends Behavior {
										onTouchEnded(container, id, x, y, ticks) {
											container.bubble( "onTriggerTransition", "toPatientEditLeft");
										}
									},  
								}),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* AGE */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  DOB:' }),
								Label($, {right:25, height:(application.height / 10), top: 0, style:labelStyle, string:'  ' + currentPatient.birthday }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* GENDER */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Gender:' }),
								Label($, {right:25, height:(application.height / 10), top: 0, style:labelStyle, string:'  ' + currentPatient.gender }),
							] 
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* HEIGHT */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Height:' }),
								Label($, {right:25, height:(application.height / 10), top: 0, style:labelStyle, string:'  ' + currentPatient.height }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* WEIGHT */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Weight:' }),
								Label($, {right:25, height:(application.height / 10), top: 0, style:labelStyle, string:'  ' + currentPatient.weight }),
							]
						}),
						Line($, { left: 0, right: 0, height: 3, skin: separatorSkin }),
					/* MEDICATION TITLE */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, height:(application.height / 10), top: 0, style:boldLabelStyle, string:'  MEDICATIONS:' }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					
		// 			/* IBRUPROFEN */
		// 				Line($, {left: 0, right: 0, top:0, bottom:0,
		// 					contents: [
		// 						Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Ibuprofen' }),
		// 						Picture($, { right:0, top:0, bottom:0, url:tick }),
		// 					]
		// 				}),
		// 				Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
		// 			/* ACETAMINOPHEN */
		// 				Line($, {left: 0, right: 0, top:0, bottom:0,
		// 					contents: [
		// 						Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Acetaminophen' }),
		// 						Picture($, { right:0, top:0, bottom:0, url:exclamation }),
		// 					]
		// 				}),
		// 				Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
		// 			/* ADD MEDICATION */
		// 				Line($, {left: 0, right: 0, top:0, bottom:0,
		// 					contents: [
		// 						Picture($, { left:0, top:0, bottom:0, url:plus, active: true, 
		// 							Behavior: class extends Behavior {
		// 								onTouchEnded(container, id, x, y, ticks) {
		// 									container.bubble( "onTriggerTransition", "toAddMedicationLeft");
		// 								}
		// 							},  									
		// 						}),
		// 						Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Add Medication' }),
		// 					]
		// 				}),
		// 				Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
		// /* BLANK SPACE */
		// 				Line($, {left: 0, right: 0, top:0, bottom:0,
		// 					contents: [
		// 						Label($, {left:0, right:0, height:(application.height * 0.15), top: 0, style:labelStyle, skin: greySkin, string:'  ' }),
		// 					]
		// 				}),	
					
					]
				})

			]
		})
	] 
}));


/* Patient Edit Screen */
let PatientEditScreen = Container.template($ => ({ 
	left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin, 
	Behavior: MainScreenBehavior, 
	contents: [
		Container($, {left: 0, right: 0, 
			contents: [ 		
				Column($, {left: 0, right: 0, active: true, 
					Behavior: class extends Behavior {
						onTouchEnded(content) {
			        		//SystemKeyboard.hide();
			        		trace("hide keyboard moom \n");
			        		//SystemKeyBoard.hide();
			        		content.focus();
		    			}
    				},
					contents: [ 
					/* PATIENT X TITLE */
						Container($, {left: 0, right: 0, skin: blueSkin, 
							contents: [
								Label($, {left:0, right:0, height:(application.height / 8), top: 30, style:titleStyle, string:'Edit Patient' }),
								Picture($, { left:0, top:30, active: true, bottom:0, width:(application.width * 0.1), url: back, active: true, 
									Behavior: class extends Behavior {
										onTouchEnded(container, id, x, y, ticks) {
											container.bubble( "onTriggerTransition", "toHomeRight");
										}
									},  
								}),
								Picture($, { right:10, top:30, active: true, bottom:0, width:(application.width * 0.25), url: save, active: true, 
									Behavior: class extends Behavior {
										onTouchEnded(container, id, x, y, ticks) {
											currentPatient.first = textFieldInputs.first;
											currentPatient.last = textFieldInputs.last;
											currentPatient.birthday = textFieldInputs.birthday;
											currentPatient.gender = textFieldInputs.gender;
											currentPatient.height = textFieldInputs.height;
											currentPatient.weight = textFieldInputs.weight;
											currentPatientName = currentPatient.first + ' ' + currentPatient.last;
											container.bubble( "onTriggerTransition", "toPatientRight");
										}
									},  
								}),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* FIRST NAME */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, active: true, style:labelStyle, string:'  First Name:', 
									Behavior: class extends Behavior {
										onTouchEnded(content) {
											KEYBOARD.hide();
        									//SystemKeyboard.hide();
        									system.keyboard.visible = false;
        									//SystemKeyBoard.hide();
        									content.focus();
    									}
    								},
    							}),
								editFirst = new MyField({name: currentPatient.first, ind: 'first'}),
								// new MyField({name: "John"}),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* LAST NAME */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, active: true, style:labelStyle, string:'  Last Name:', 
									Behavior: class extends Behavior {
										onTouchEnded(content) {
											KEYBOARD.hide();
        									//SystemKeyboard.hide();
        									system.keyboard.visible = false;
        									//SystemKeyBoard.hide();
        									content.focus();
    									}
    								},
    							}),

								editLast =  new MyField({name: currentPatient.last, ind: 'last'}),
								// new MyField({name: "Doe"}),

							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* BIRTHDAY */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, active: true, style:labelStyle, string:'  Birthday:', 
									Behavior: class extends Behavior {
										onTouchEnded(content) {
											KEYBOARD.hide();
        									//SystemKeyboard.hide();
        									system.keyboard.visible = false;
        									//SystemKeyBoard.hide();
        									content.focus();
    									}
    								},
    							}),

								editBirthday = new MyField({name: currentPatient.birthday, ind: 'birthday'}),
								// new MyField({name: "01/01/92"}),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),	
					/* GENDER */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, active: true, style:labelStyle, string:'  Gender:', 
									Behavior: class extends Behavior {
										onTouchEnded(content) {
											KEYBOARD.hide();
        									//SystemKeyboard.hide();
        									system.keyboard.visible = false;
        									//SystemKeyBoard.hide();
        									content.focus();
    									}
    								},
    							}),

								editGender = new MyField({name: currentPatient.gender, ind: 'gender'}),
								// new MyField({name: "Male"}),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* HEIGHT */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, active: true, style:labelStyle, string:'  Height:', 
									Behavior: class extends Behavior {
										onTouchEnded(content) {
											KEYBOARD.hide();
        									//SystemKeyboard.hide();
        									system.keyboard.visible = false;
        									//SystemKeyBoard.hide();
        									content.focus();
    									}
    								},
    							}),

								editHeight = new MyField({name: currentPatient.height, ind: 'height'}),
								// new MyField({name: "6ft"}),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* WEIGHT */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, active: true, style:labelStyle, string:'  Weight:', 
									Behavior: class extends Behavior {
										onTouchEnded(content) {
											KEYBOARD.hide();
        									//SystemKeyboard.hide();
        									system.keyboard.visible = false;
        									//SystemKeyBoard.hide();
        									content.focus();
    									}
    								},
    							}),

								editWeight = new MyField({name: currentPatient.weight, ind: 'weight'}),
								// new MyField({name: "169lbs"}),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* ADD MEDICATION */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Picture($, { left:0, top:0, bottom:0, url:plus, active: true, 
									Behavior: class extends Behavior {
										onTouchEnded(container, id, x, y, ticks) {
											container.bubble( "onTriggerTransition", "toAddMedicationLeft");
											SystemKeyboard.hide();
											container.focus();
										}
									},  									
								}),
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Add Medication' }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
		/* BLANK SPACE */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height * 0.22), top: 0, style:labelStyle, skin: greySkin, string:'  ' }),
							]
						}),	
					]
				})

			]
		})
	] 
}));


/* Add Medication Screen */
let AddMedicationScreen = Container.template($ => ({ 
	left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin, 
	Behavior: MainScreenBehavior, 
	contents: [
		Container($, {left: 0, right: 0, name: "addMedFirst",
			contents: [ 		
				Column($, {left: 0, right: 0, name: "addMedSecond",
					Behavior: class extends Behavior {
						onTouchEnded(content) {
			        		//SystemKeyboard.hide();
			        		trace("hide keyboard moom \n");
			        		//SystemKeyBoard.hide();
			        		content.focus();
		    			}
    				},
					contents: [ 
/* PATIENT X TITLE */
						Container($, {left: 0, right: 0, skin: blueSkin,
							contents: [
								Label($, {left:0, right: 20, height:70, top: 55, style:titleStyle, string:'Add Medication' }),
								Picture($, { left:0, top:55, active: true, bottom:0, width:(application.width * 0.1), url: back, active: true, 
									Behavior: class extends Behavior {
										onTouchEnded(container, id, x, y, ticks) {
											container.bubble( "onTriggerTransition", "toPatientRight");
										}
									},  
								}),
								Picture($, { right:5, top:55, active: true, bottom:0, width:(application.width * 0.25), url: save, active: true, 
									Behavior: class extends Behavior {
										onTouchEnded(container, id, x, y, ticks) {
											// trace(currentPatient.first + "\n");	
                                            // constructor(name, dosageAmount, unit, freq, dayWeek, intake, side, lastTakenTime, errorMessage, patientMessage)
                                            
											var newMed = new Med(addMedName, currentScreen.addMedFirst.addMedSecond.dosageAmount.dosageAmountString.string, 
												currentScreen.addMedFirst.addMedSecond.dosageAmount.dosageUnitString.string,
												parseInt(currentScreen.addMedFirst.addMedSecond.frequencyBox.frequencyTimes.string.substring(0, 1)),
												currentScreen.addMedFirst.addMedSecond.frequencyBox.frequencyDay.string,
												currentScreen.addMedFirst.addMedSecond.intakeInstructions.intakeInstructionsString.string,
												currentScreen.addMedFirst.addMedSecond.sideEffects.sideEffectsString.string,
												new Date(),
												"None",
												"None");
											
											// ADD MED TIME

											currentPatient.addMed(newMed);
											container.bubble( "onTriggerTransition", "toPatientRight");
										}
									},  
								}),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* Medicine Name */

						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Medicine:', 
									Behavior: class extends Behavior {
										onTouchEnded(content) {
											KEYBOARD.hide();
        									//SystemKeyboard.hide();
        									system.keyboard.visible = false;
        									//SystemKeyBoard.hide();
        									content.focus();
    									}
    								},
    							}),
								new MyField({name: ' ', ind: 'medName'}),
							]
						}),
						Line($, {height:(application.height / 12), left: 0, right: 0, top:0, bottom:0, active: true,
							contents: [
								Label($, {active: true, editable: true, left: 10, bottom: 8, right: 10, style:fieldHintStyle, string:' Enter med code to search ', 
									Behavior: class extends Behavior {
										onTouchEnded(content) {
											KEYBOARD.hide();
        									//SystemKeyboard.hide();
        									system.keyboard.visible = false;
        									//SystemKeyBoard.hide();
        									content.focus();
    									}
    								},			
											}),
								Picture($, { right:0, top:0, active: true, bottom:8, height: 50, width: 100, url: search, active: true, 
									Behavior: class extends Behavior {
										onTouchEnded(container, id, x, y, ticks) {
											trace(textFieldInputs.medName + "\n");
											if (textFieldInputs.medName == "ibu" || textFieldInputs.medName == "ibuprofen") {
												addMedName = "ibuprofen";
												currentScreen.addMedFirst.addMedSecond.dosageAmount.dosageAmountString.string = "300";
												currentScreen.addMedFirst.addMedSecond.dosageAmount.dosageAmountString.style = labelStyle;
												currentScreen.addMedFirst.addMedSecond.dosageAmount.dosageUnitString.string = "mg";
												currentScreen.addMedFirst.addMedSecond.dosageAmount.dosageUnitString.style = labelStyle;
												currentScreen.addMedFirst.addMedSecond.frequencyBox.frequencyTimes.string = "4 times";
												currentScreen.addMedFirst.addMedSecond.frequencyBox.frequencyTimes.style = labelStyle;
												currentScreen.addMedFirst.addMedSecond.frequencyBox.frequencyDay.string = "day";
												currentScreen.addMedFirst.addMedSecond.frequencyBox.frequencyDay.style = labelStyle;
												currentScreen.addMedFirst.addMedSecond.intakeInstructions.intakeInstructionsString.string = "None";
												currentScreen.addMedFirst.addMedSecond.intakeInstructions.intakeInstructionsString.style = labelStyle;
												currentScreen.addMedFirst.addMedSecond.sideEffects.sideEffectsString.string = "Can cause anemia, vomiting";
												currentScreen.addMedFirst.addMedSecond.sideEffects.sideEffectsString.style = labelStyle;
											}
											if (textFieldInputs.medName == "acet" || textFieldInputs.medName == "acetaminophen") {
												addMedName = "acetaminophen";
												currentScreen.addMedFirst.addMedSecond.dosageAmount.dosageAmountString.string = "325";
												currentScreen.addMedFirst.addMedSecond.dosageAmount.dosageAmountString.style = labelStyle;
												currentScreen.addMedFirst.addMedSecond.dosageAmount.dosageUnitString.string = "mg";
												currentScreen.addMedFirst.addMedSecond.dosageAmount.dosageUnitString.style = labelStyle;
												currentScreen.addMedFirst.addMedSecond.frequencyBox.frequencyTimes.string = "3 times";
												currentScreen.addMedFirst.addMedSecond.frequencyBox.frequencyTimes.style = labelStyle;
												currentScreen.addMedFirst.addMedSecond.frequencyBox.frequencyDay.string = "day";
												currentScreen.addMedFirst.addMedSecond.frequencyBox.frequencyDay.style = labelStyle;
												currentScreen.addMedFirst.addMedSecond.intakeInstructions.intakeInstructionsString.string = "None";
												currentScreen.addMedFirst.addMedSecond.intakeInstructions.intakeInstructionsString.style = labelStyle;
												currentScreen.addMedFirst.addMedSecond.sideEffects.sideEffectsString.string = "Can cause diarrhea";
												currentScreen.addMedFirst.addMedSecond.sideEffects.sideEffectsString.style = labelStyle;
											}
											if (textFieldInputs.medName == "day" || textFieldInputs.medName == "dayquil") {
												addMedName = "dayquil";
												currentScreen.addMedFirst.addMedSecond.dosageAmount.dosageAmountString.string = "40";
												currentScreen.addMedFirst.addMedSecond.dosageAmount.dosageAmountString.style = labelStyle;
												currentScreen.addMedFirst.addMedSecond.dosageAmount.dosageUnitString.string = "ml";
												currentScreen.addMedFirst.addMedSecond.dosageAmount.dosageUnitString.style = labelStyle;
												currentScreen.addMedFirst.addMedSecond.frequencyBox.frequencyTimes.string = "2 times";
												currentScreen.addMedFirst.addMedSecond.frequencyBox.frequencyTimes.style = labelStyle;
												currentScreen.addMedFirst.addMedSecond.frequencyBox.frequencyDay.string = "day";
												currentScreen.addMedFirst.addMedSecond.frequencyBox.frequencyDay.style = labelStyle;
												currentScreen.addMedFirst.addMedSecond.intakeInstructions.intakeInstructionsString.string = "None";
												currentScreen.addMedFirst.addMedSecond.intakeInstructions.intakeInstructionsString.style = labelStyle;
												currentScreen.addMedFirst.addMedSecond.sideEffects.sideEffectsString.string = "Can cause sore throat";
												currentScreen.addMedFirst.addMedSecond.sideEffects.sideEffectsString.style = labelStyle;
											}
											if (textFieldInputs.medName == "pro" || textFieldInputs.medName == "prozac") {
												addMedName = "prozac";
												currentScreen.addMedFirst.addMedSecond.dosageAmount.dosageAmountString.string = "20";
												currentScreen.addMedFirst.addMedSecond.dosageAmount.dosageAmountString.style = labelStyle;
												currentScreen.addMedFirst.addMedSecond.dosageAmount.dosageUnitString.string = "mg";
												currentScreen.addMedFirst.addMedSecond.dosageAmount.dosageUnitString.style = labelStyle;
												currentScreen.addMedFirst.addMedSecond.frequencyBox.frequencyTimes.string = "1 time";
												currentScreen.addMedFirst.addMedSecond.frequencyBox.frequencyTimes.style = labelStyle;
												currentScreen.addMedFirst.addMedSecond.frequencyBox.frequencyDay.string = "day";
												currentScreen.addMedFirst.addMedSecond.frequencyBox.frequencyDay.style = labelStyle;
												currentScreen.addMedFirst.addMedSecond.intakeInstructions.intakeInstructionsString.string = "None";
												currentScreen.addMedFirst.addMedSecond.intakeInstructions.intakeInstructionsString.style = labelStyle;
												currentScreen.addMedFirst.addMedSecond.sideEffects.sideEffectsString.string = "Can cause anxiety";
												currentScreen.addMedFirst.addMedSecond.sideEffects.sideEffectsString.style = labelStyle;
											}
										}
									},  
								}),
							],
						}),

						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* Dosage */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Dosage' }),
							]
						}),
						Line($, {height:(application.height / 15), left: 0, right: 0, top:0, bottom:0, active: true, name: "dosageAmount",
							contents: [
								Label($, {active: true, editable: true, left: 40, width: 30, right: 40, style:editLabelStyle, string:'amount', name: "dosageAmountString",
												Behavior: class extends Behavior {onTouchEnded(label) {
							                            label.string = "300",
							                            label.style = labelStyle,
													}
												}, 
											}),
								//Label($, {active: true, editable: true, left: 0, right: 20, style:editLabelStyle, string:'', 
												
								//			}),
								Label($, {active: true, editable: true, left: 85, right: 20, style:editLabelStyle, string:'unit', name: "dosageUnitString",
												Behavior: class extends Behavior {onTouchEnded(label) {
							                            label.string = "mg",
							                            label.style = labelStyle,
													}
												}, 
											}),
							],
						}),

						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* Frequency */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 15), top: 0, style:labelStyle, string:'  Frequency' }),
							]
						}),
						Line($, {height:(application.height / 15), left: 0, right: 0, top:0, bottom:0, active: true, name: "frequencyBox",
							contents: [
								Label($, {active: true, editable: true, left: 40, right: 50, style:editLabelStyle, string:'times', name: "frequencyTimes",
												Behavior: class extends Behavior {onTouchEnded(label) {
							                            label.string = "3 times",
							                            label.style = labelStyle,
													}
												}, 
											}),
								Label($, {active: true, editable: true, left: 0, right: 20, style:editLabelStyle, string:'per', 
												
											}),
								Label($, {active: true, editable: true, left: 30, right: 20, style:editLabelStyle, string:'day', name: "frequencyDay",
												Behavior: class extends Behavior {onTouchEnded(label) {
							                            label.string = "day",
							                            label.style = labelStyle,
													}
												}, 
											}),
							],
						}),

						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* Intake Directions */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 15), top: 0, style:labelStyle, string:'  Intake Instructions' }),
							]
						}),
						Line($, {height:(application.height / 7.5), left: 0, right: 0, top:0, bottom:0, active: true, name: "intakeInstructions",
							contents: [
								Label($, {active: true, editable: true, left: 40, right: 20, style:editLabelStyle, string:'None', name: "intakeInstructionsString",
												Behavior: class extends Behavior {onTouchEnded(label) {
							                            label.string = "None",
							                            label.style = labelStyle,
													}
												}, 
											}),
							],
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 15), top: 0, style:labelStyle, string:'  Side Effects / Warnings' }),
							]
						}),
						Line($, {height:(application.height / 7.5), left: 0, right: 0, top:0, bottom:0, active: true, name: "sideEffects",
							contents: [
								Label($, {active: true, editable: true, left: 40, right: 20, style:editLabelStyle, string:'None', name: "sideEffectsString",
												Behavior: class extends Behavior {onTouchEnded(label) {
							                            label.string = "None",
							                            label.style = labelStyle,
													}
												}, 
											}),
							],
						}),


		/* BLANK SPACE */

						
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height * 0.10), top: 0, style:labelStyle, skin: greySkin, string:'  ' }),
							]
						}),
						
					]
				})

			]
		})
	] 
}));



/* Settings Screen */
let SettingsScreen = Container.template($ => ({ 
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
											container.bubble( "onTriggerTransition", "toHomeLeft");
										}
									},  
								}),
								Label($, {left:0, right:0, top: 10, height:70, top: 0, style:titleStyle, string:'Settings' }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* DEVICE TITLE */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								dispenserPicture = Picture($, { left:0, top:0, bottom:0, width:(application.width * 0.15), url:dispenserDisconnect}),
								dispenserLabel = Label($, {left:0, right:0, height:(application.height / 8), width:(application.width * 0.85), top: 0, style:dispenserLabelStyle, string:' Alfie Nowell DISPENSER ' }),
							]
						}),						
						Line($, { left: 0, right: 0, height: 3, skin: separatorSkin }),
					/* PILL NAME 1 */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Ibuprofen levels:' }),
								ibuLevel = Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* PILL NAME 2 */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Acetaminophen levels:' }),
								aceLevel = Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
						contactPic = Picture($, { left:0, right:0, height:50, active: true, url: contactPicture,
							Behavior: MainScreenBehavior, 
							Behavior: class extends Behavior {
								onTouchEnded(container, id, x, y, ticks) {
									container.bubble( "onTriggerTransition", "toMessageRight");
									trace("pic touched\n");
								}
							},  
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* DEVICE TITLE */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Picture($, { left:0, top:0, bottom:0, width:(application.width * 0.15), url:dispenserDisconnect}),
								Label($, {left:0, right:0, height:(application.height / 8), width:(application.width * 0.85), top: 0, style:dispenserLabelStyle, string:' Ava Shute DISPENSER  ' }),
							]
						}),						
						Line($, { left: 0, right: 0, height: 3, skin: separatorSkin }),
					/* PILL NAME 1 */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Diazepam levels:' }),
								Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* PILL NAME 2 */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Haloperidol levels:' }),
								Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
						Picture($, { left:0, right: 0, height: 50, url: contactPatientGrey,}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
									
				/* BLANK SPACE */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height * 0.02), top: 0, style:labelStyle, skin: greySkin, string:'  ',}),	
							],
							Behavior: class extends Behavior {
								onTouchEnded(container, id, x, y, ticks) {
									container.bubble( "onTriggerTransition", "toMessageRight");
									trace("line touched\n");
								}
							}, 	
						}),						
					]			
				})
			]
		})
	]
}));


/* Messaging Screen */
let MessageScreen = Container.template($ => ({ 
	left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin, 
	contents: [
		Container($, {left: 0, right: 0,
			contents: [ 		
				Column($, {left: 0, right: 0,
					contents: [ 
					/* MESSAGING */
						Container($, {left: 0, right: 0, skin: blueSkin,
							contents: [
								Picture($, { left:0, top:0, active: true, bottom:0, width:(application.width * 0.1), url: back,
									Behavior: MainScreenBehavior, 
									Behavior: class extends Behavior {
										onTouchEnded(container, id, x, y, ticks) {
											container.bubble( "onTriggerTransition", "toSettingsLeft");
										}
									},  
								}),
								Label($, {left:0, right:0, top: 0, height:(application.height / 8), top: 0, style:titleStyle, string:'Messaging' }),
							]
						}),
						Line($, {left: 0, right: 0, top:0, bottom:0, height: application.height/5+70,
							contents: [
								//button
								//on touch ended, send a message to device using handler.bind
								//sendButton
								receivedMessageLabel = new Label({ left:0, right:0, string:"  No Message", style: labelStyle})					
							]
							
						}),
						Line($, {left: 25, right: 25, top:0, bottom:0, height: 50, width: 100,
							contents: [
								// where the error occurs
								//messageBox
								new RefreshButtonTemplate({ textForLabel: "Refresh", width: 10})
								
								
							]
						}),	
						Line($, {left: 0, right: 0, top:0, bottom:0, height: application.height/5+70,
							contents: [
								// where the error occurs
								//messageBox
								messageBox = new MessageField({string:"mongoos", name: "Enter Text Here"})
								
							]
						}),
						Line($, {left: 25, right: 25, top:0, bottom:25, height: 50, width: 100,
							contents: [
								//button
								//on touch ended, send a message to device using handler.bind
								//sendButton
								new SendButtonTemplate({ textForLabel: "Send", width: 10, align: "center" })							
							]
							
						}),	
						// Line($, {left: 0, right: 0, top:0, bottom:0,
						// 	contents: [
						// 		Label($, {left:0, right:0, height:(application.height * 0.02), top: 0, style:labelStyle, skin: greySkin, string:'  ',}),	
						// 	],	
						// }),						
					]			
				})
			]
		})
	]
}));



/* DEVICE INTERACTION */
/* LED Flash function */
Handler.bind("/flashLED", {
    onInvoke: function(handler, message){
    	remotePins.invoke("/led1/write", 1);
    	if (deviceURL != "") new MessageWithObject(deviceURL + "dispenseTreatStart", JSON.stringify( { message: level3 } )).invoke();
    	handler.wait(1500);
    },
    onComplete: function(handler, message) {
    	remotePins.invoke("/led1/write", 0);
    	if (deviceURL != "") new MessageWithObject(deviceURL + "dispenseTreatEnd", "").invoke();
    }
});

/* Timings helper function */
function getTimeDateString(currentTime) {
    let str = "";
    let hours = currentTime.getHours()
    let minutes = currentTime.getMinutes()
    let seconds = currentTime.getSeconds()
    let date = currentTime.getDate()
    let month = currentTime.getMonth()
    let year = currentTime.getYear()
    let day = currentTime.getDay()

    if (minutes < 10) {
        minutes = "0" + minutes
    }
    if (seconds < 10) {
        seconds = "0" + seconds
    }
    str += hours + ":" + minutes + ":" + seconds + ", " + (month+1) + "/" + date;
	return str;	
}

/* Timings helper function */
function getTimeDateInt(currentTime) {
    let hours = currentTime.getHours()
    let minutes = currentTime.getMinutes()
    let seconds = currentTime.getSeconds()
    let date = currentTime.getDate()
    let month = currentTime.getMonth()
    let year = currentTime.getYear()
    let day = currentTime.getDay()
	return ((parseInt(year, 10) * 100000000) + (parseInt(month, 10) * 1000000) + (parseInt(day, 10) * 10000) +  (parseInt(hours, 10) * 100) + parseInt(minutes)); 
}
	
/* Connection Updater for Labels */
function updatedispenserConnection(conn) {
	devicePatient = doctor.patientsBad[0];
	connected = conn;
	if (conn) {
		contactPicture = contactPatientBlue;
		contactPic.url = contactPatientBlue;
		dispenserPicture.url = dispenser;
		dispenserLabelStyle = capsStyle;
		dispenserLabel.style = dispenserLabelStyle;
		aceLevel.url = empty;
		ibuLevel.url = empty;
		// dispenseButton.skin = buttonSkin;
		// dispenseButton.style = buttonStyle;
		// dispenseButton.string = 'DISPENSE TREAT';
	} else {
		dispenserLabelStyle = capsStyleDisconnect;
		dispenserLabel.style = dispenserLabelStyle;
		aceLevel.url = emptyDisconnect;
		ibuLevel.url = emptyDisconnect;
		// dispenseButton.skin = inactiveButtonSkin;
		// dispenseButton.style = inactiveStyle;
		// dispenseButton.string = 'DISCONNECTED';
	}
}

/* Application sharing functions */
Handler.bind("/discover", Behavior({
    onInvoke: function(handler, message){
        trace("Handler found the dispenser device.\n");  
        deviceURL = JSON.parse(message.requestText).url;  
    }
}));

Handler.bind("/forget", Behavior({
    onInvoke: function(handler, message){
        deviceURL = "";
    }
}));


Handler.bind("/doctorMessage", Behavior({
    onInvoke: function(handler, message){
        message.responseText = JSON.stringify({doctorMessage: doctorMessage});
        message.status = 200;
    }
}));

function checkTaken(patient, med){
	let timeNow = new Date();
	trace(patient.meds[0].lastTakenTime + "\n")
	let medIndex = patient.meds.indexOf(med);
	let freq = patient.meds[medIndex].freq;
	let nextTaken = getTimeDateInt(patient.meds[medIndex].lastTakenTime) + (2400/freq);
	timeNow = getTimeDateInt(timeNow);
	return (timeNow < nextTaken);
}


/* Pins discovery helper function */
function discovery() {

    trace("Trying to connect to remote pins\n");
	let discoveryInstance = Pins.discover(
        connectionDesc => {
            
            if (connectionDesc.name == "pillsense-device") {
                trace("Connected to remote pins\n");
                remotePins = Pins.connect(connectionDesc);
                remotePins.repeat("/pill1Button/read", 500, function(result) {
	                updatedispenserConnection(true);

	devicePatient.statusGood = true;
			 //    	if (devicePatient.meds.length <= 1){
			 //    		devicePatient.lastTaken = devicePatient.med[0].name;
			 //    		devicePatient.med[0].lastTakenTime = new Date();
			 //    	}   
			 //    	for (var i = 0; i < patientsGood.length; i++) {
			 //    		if (!patientCorrectPlace(patientsGood[i], devicePatient.statusGood)) movePatient(patientsGood[i]);
			 //    	};
			 //    	for (var i = 0; i < patientsBad.length; i++) {
			 //    		if (!patientCorrectPlace(patientsBad[i], devicePatient.statusGood)) movePatient(patientsBad[i]);
			 //    	};
				});

				// remotePins.repeat("/pill2Button/read", 500, function(result2) {
				// 	if (devicePatient.meds.length <= 2){
			 //    		devicePatient.lastTaken = devicePatient.med[1].name;
			 //    		devicePatient.med[1].lastTakenTime = new Date();
			 //    	}   
				// });

    //             remotePins.repeat("/pill3Button/read", 500, function(result3) {
			 //    	 if (devicePatient.meds.length <= 3){
			 //    		devicePatient.lastTaken = devicePatient.med[2].name;
			 //    		devicePatient.med[2].lastTakenTime = new Date();
			 //    	}    
				// });

				// remotePins.repeat("/pill4Button/read", 500, function(result4) {
				// 	if (devicePatient.meds.length <= 4){
				// 		devicePatient.lastTaken = devicePatient.med[3].name;
			 //    		devicePatient.med[3].lastTakenTime = new Date();		    		
			 //    	}   
				// });

				// remotePins.repeat("/pill5Button/read", 500, function(result5) {
				// 	if (devicePatient.meds.length <= 5){
			 //    		devicePatient.lastTaken = devicePatient.med[4].name;
			 //    		devicePatient.med[4].lastTakenTime = new Date();
			 //    	}   
				// });

		        remotePins.repeat("/ibuLevel/read", 500, function(result) {
				   	let level1 = empty;
				   	if (result >= 0.85) level1 = full;
				   	else if (result >= 0.60) level1 = threeQuarter;
				   	else if (result >= 0.35) level1 = half;
				   	else if (result >= 0.1) level1 = oneQuarter;
				   	else {
				   		devicePatient.statusGood = false;
				   		// let medIndex = getIndex(devicePatient.meds[])
					}
				   	ibuLevel.url = level1;
				});

		        remotePins.repeat("/aceLevel/read", 500, function(result) {
				   	let level2 = empty;
				   	if (result >= 0.85) level2 = full;
				   	else if (result >= 0.60) level2 = threeQuarter;
				   	else if (result >= 0.35) level2 = half;
				   	else if (result >= 0.1) level2 = oneQuarter;
				   	aceLevel.url = level2;
				});
            }
        }, 
        connectionDesc => {
            if (connectionDesc.name == "pillsense-device") {
                updatedispenserConnection(false);
                trace("Disconnected from remote pins\n");
                remotePins = undefined;
            }
        }
    )
}


/* Application set-up */
let mainScreen = new MainScreen({});
let logoScreen = new LogoScreen();

class AppBehavior extends Behavior {
	onLaunch(application) {
		application.shared = true;
		application.add( mainScreen );
		mainScreen.add( logoScreen );
        discovery();
    } 
    onDisplayed(application) {
        application.discover("pillsense-device.app");
    }
    onQuit(application) {
        application.forget("pillsense-device.app");
		application.shared = false;
    }
}
application.behavior = new AppBehavior();
