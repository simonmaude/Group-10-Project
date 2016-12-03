
/* Classes Setup */
import {
    User,
    Patient,
    Med,
    ibuprofen,
    acetaminophen,
    dayquil,
    prozac
} from 'classes';

/* Transitions Setup */
import TRANSITION from 'transitions';

/* Pins Setup */
import Pins from "pins";
let remotePins;
let connected = false;
let deviceURL = "";

/* Keyboard Setup */
import KEYBOARD from './keyboard';

/* Scroll Setup */
import {
    FieldScrollerBehavior,
    FieldLabelBehavior
} from 'field';

/* Scroller Setup */
// import THEME from './theme';
// import SCROLLER from = './scroller';


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
let titleStyle = new Style({font: 'bold 26px', color: 'white'});
let productNameStyle = new Style({  font: 'bold 18px', horizontal: 'left', vertical: 'middle', lines: 1 });
let productDescriptionStyle = new Style({  font: '16px', horizontal: 'left', vertical: 'middle', left: 1});
let productAmountStyle = new Style({  font: '16px', horizontal: 'left', vertical: 'middle', left: 1, skin: greySkin});
let explainStyle = new Style({  font: '12px', horizontal: 'left', vertical: 'middle', left: 1});
let capsStyle = new Style({ color: 'black', font: 'bold 20px', horizontal: 'right'});
let capsStyleDisconnect = new Style({ color: '#BDBDBD', font: 'bold 20px', horizontal: 'right'});
let labelStyle = new Style({ color: 'black', font: '20px', horizontal: 'left'});
let boldLabelStyle = new Style({ color: 'black', font: 'bold 20px', horizontal: 'left'});
let editLabelStyle = new Style({ color: '#E6E6E6', font: 'bold 20px', horizontal: 'left'});
let textStyle = new Style({ color: 'black', font: '20px', horizontal: 'right'});
let splashLabelStyle = new Style({ color: 'white', font: 'bold 50px', horizontal: 'center', vertical: 'middle' });
let hugeLabelStyle = new Style({ color: 'black', font: 'bold 125px', horizontal: 'center', vertical: 'middle' });

let fieldStyle = new Style({ color: 'black', font: 'bold 24px', horizontal: 'left',
    vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5 });
let fieldHintStyle = new Style({ color: '#aaa', font: '24px', horizontal: 'left',
    vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5 });
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
let popupErrorScreen;
let popupTickScreen;
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

/* Assets */
let back = './assets/back.png';
let redBack = './assets/redBack.png';
let greenBack = './assets/greenBack.png';
let logo = './assets/logo.png';
let add = './assets/add.png';
let edit = './assets/edit.png';
let save = './assets/save.png';
let ok = './assets/save.png';
let contactPatientBlue = './assets/contactPatientBlue.png';
let contactPatientGreen = './assets/contactPatientGreen.png';
let contactPatientRed = './assets/contactPatientRed.png';
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

/* Transitions */
class MainScreenBehavior extends Behavior {
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
		let toContactPatient =  new ContactPatientScreen();
		switch ( name ) {
			case "home":
				currentScreen = toHome;
				addAllPatients();
				container.run( new TRANSITION.CrossFade({ duration : 900 }), container.last, currentScreen );
				break;			
			case "logoToSplash":
				currentScreen = toSplashScreen;
				container.run( new TRANSITION.CrossFade({ duration : 900 }), container.last, currentScreen );
				break;
			case "splashFilled":
				currentScreen = toSplashFilled;
				container.run( new TRANSITION.CrossFade({ duration : 900 }), container.last, currentScreen );
				break;
			case "homeToSettings":
				currentScreen = toSettings;
				container.run( new TRANSITION.Push({ direction : "right", duration : 400 }), container.last, currentScreen );
				break;
			case "homeToPatient":
				currentScreen = toPatient;
				container.run( new TRANSITION.Push({ direction : "left", duration : 400 }), container.last, currentScreen );
				break;
			case "homeToJohnDoe":
				currentScreen = toJohnDoe;
				container.run( new TRANSITION.Push({ direction : "left", duration : 400 }), container.last, currentScreen );
				break;
			case "homeToAddPatient":
				currentScreen = toAddPatient;
				container.run( new TRANSITION.Push({ direction : "left", duration : 400 }), container.last, currentScreen );
				break; 		
			case "addPatientToHome":
				currentScreen = toHome;
				addAllPatients();
				container.run( new TRANSITION.Push({ direction : "right", duration : 400 }), container.last, currentScreen );
				break;
			case "settingsToHome":
				currentScreen = toHome;
				addAllPatients();
				container.run( new TRANSITION.Push({ direction : "left", duration : 400 }), container.last, currentScreen );
				break;			
			case "patientToHome":
				currentScreen = toHome;
				addAllPatients();
				container.run( new TRANSITION.Push({ direction : "right", duration : 400 }), container.last, currentScreen );
				break;
			case "patientToPatientEdit":
				currentScreen = toPatientEdit;
				container.run( new TRANSITION.Push({ direction : "left", duration : 400 }), container.last, currentScreen  );
				break;
			case "patientEditToPatient":
				currentScreen = toPatient;
				container.run( new TRANSITION.Push({ direction : "right", duration : 400 }), container.last, currentScreen );
				break;				
			case "patientEditToJohnDoe":
				currentScreen = toJohnDoe;
				container.run( new TRANSITION.Push({ direction : "right", duration : 400 }), container.last, currentScreen );
				break;			
			case "patientToAddMedication":
				currentScreen = toAddMedication;
				container.run( new TRANSITION.Push({ direction : "left", duration : 400 }), container.last, currentScreen );
				break;
			case "addMedicationToPatient":
				currentScreen = toPatient;
				container.run( new TRANSITION.Push({ direction : "right", duration : 400 }), container.last, currentScreen );
				break;
			case "toContactPatient":
				trace("toContactPatient Reached\n")
				currentScreen = toContactPatient;
				container.run( new TRANSITION.Push({ direction : "right", duration : 400 }), container.last, currentScreen );
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
                            label.container.hint.visible = (data.name.length == 0);
                            trace(data.name+"\n");
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


/* Simulated User Login & Data*/
let doctor = new User("Doctor_1", "password123");
doctor.patientsBad.push(new Patient("Alfie", "YOLO", "01/01/92", "Male", "6ft", "160lbs", false, "ibuprofen", getTimeDate(), "no message", "no message"));
doctor.patientsBad.push(new Patient("Amelia", "LOL",  "02/02/91", "Female", "5ft, 6in", "130lbs", false, "acetaminophen", getTimeDate(), "no message", "no message"));
doctor.patientsBad.push(new Patient("Archie", "ROFL",  "03/03/90", "Male", "6ft 3in", "180lbs", false, "prozac", getTimeDate(), "no message", "no message" ));
doctor.patientsGood.push(new Patient("Ava", "GG",  "04/04/89", "Female", "5ft 2in", "140lbs", true, "ibuprofen", getTimeDate(), "no message","no message" ));
doctor.patientsGood.push(new Patient("Abe", "NVM",  "05/05/88", "Declined to say", "5ft 6in", "165lbs", true, "acetaminophen", getTimeDate(), "no message","no message"));
doctor.patientsGood.push(new Patient("Aaron", "TBH",  "06/06/87", "Male", "5ft 11in", "174lbs", true, "prozac", getTimeDate(), "no message","no message"));
doctor.patientsGood.push(new Patient("Anna", "CBA",  "07/07/86", "Female", "5ft 10in", "168lbs", true, "ibuprofen", getTimeDate(), "no message","no message"));
currentPatient = doctor.patientsBad[0];


/* Dynamic Patient Rows Templates and Functions*/
function createPatientHomeScreen(patient) {
	if (patient.statusGood == true) {
		return new patientTemplate({height: (application.height / 10), pat: patient, status: tick});
	} else {
		return new patientTemplate({height: (application.height / 10), pat: patient, status: exclamation});
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
					container.bubble( "onTriggerTransition", "homeToPatient" );
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
							popupErrorScreen = new PopUpErrorScreen()
							application.add(popupErrorScreen);
						} else {
							popupTickScreen = new PopUpTickScreen()
							application.add(popupTickScreen);
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
	var blankBottomLength = application.height - (60 * (doctor.patientsBad.length + doctor.patientsGood.length));
	currentScreen.lel.homeScreenAddHere.add( new blackScreen({height : blankBottomLength}));
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
	skin: blackSkin, backgroundColor: "#2D9CDB", width: 300, height: 400, 
	contents: [
		Column($, {left: 1, right: 1, top: 1, bottom: 1, skin: whiteSkin,
			contents: [
				Container($, {left: 0, right: 0, height: 50, skin: redSkin,
					contents: [
						Picture($, { left:10, active: true, width:25, url: redBack, active: true, 
							Behavior: class extends Behavior {
								onTouchEnded(container, id, x, y, ticks) {
						            popSwitch = true;
									currentScreen.active = true;
						            application.remove(popupErrorScreen);
								}
							},
						}),
						Label($, {left:82, right:50, height:50, style:titleStyle, string:'Error Details' }),
					]
        // Label($, {left:0, right:0, height: $.height, active: true, style:labelStyle, string: '  ' + String($.first) + ' ' + String($.last),
				}),	
				Line($, {left:10, right:10, height:20,}),
				Label($, {left:60, right:10, height:25, vertical: "middle", style:boldLabelStyle, string: String(currentPatient.first) + ' ' + String(currentPatient.last) + ' failed',}),
				Label($, {left:60, right:10, height:25, vertical: "middle", style:boldLabelStyle, string: 'to take ' + String(currentPatient.lastTaken),}),
				Label($, {left:60, right:10, height:25, vertical: "middle", style:boldLabelStyle, string: 'at ' + String(currentPatient.lastTakenTime),}),
				Line($, {left:10, right:10, height:50,}),
				Label($, {left:10, right:10, height:30, style:boldLabelStyle, string: 'Error Message:',}),
				Label($, {left:10, right:10, height:30, style:labelStyle, string: String(currentPatient.errorMessage),}),
				Line($, {left:10, right:10, height:10,}),
				Label($, {left:10, right:10, height:30, style:boldLabelStyle, string: 'Patient\'s Message:',}),
				Label($, {left:10, right:10, height:30, style:labelStyle, editable: false, string: String(currentPatient.patientMessage),}),
				Picture($, { left:10, right: 10, active: true, width:25, url: contactPatientRed, active: true, 							
					Behavior: class extends Behavior {
						onTouchEnded(container, id, x, y, ticks) {
				            popSwitch = true; 
							currentScreen.active = true;
				            application.remove(popupErrorScreen);
				            container.bubble( "onTriggerTransition", "toContactPatient" );
						}
					},
				}),
			]
		}),
	],  
}));


/* Pop Up Tick Screen */
let PopUpTickScreen = Container.template($ => ({
	skin: blackSkin, backgroundColor: "#2D9CDB", width: 300, height: 400, 
	contents: [
		Column($, {left: 1, right: 1, top: 1, bottom: 1, skin: whiteSkin,
			contents: [
				Container($, {left: 0, right: 0, height: 50, skin: greenSkin,
					contents: [
						Picture($, { left:10, active: true, width:25, url: greenBack, active: true, 
							Behavior: class extends Behavior {
								onTouchEnded(container, id, x, y, ticks) {
						            popSwitch = true;
									currentScreen.active = true;
						            application.remove(popupTickScreen);
								}
							},
						}),
						Label($, {left:82, right:50, height:50, style:titleStyle, string:'Details' }),
					]
				}),
				Line($, {left:10, right:10, height:20,}),
				Label($, {left:60, right:10, height:25, vertical: "middle", style:boldLabelStyle, string: String(currentPatient.first) + ' ' + String(currentPatient.last) + ' last',}),
				Label($, {left:60, right:10, height:25, vertical: "middle", style:boldLabelStyle, string: 'took ' + String(currentPatient.lastTaken),}),
				Label($, {left:60, right:10, height:25, vertical: "middle", style:boldLabelStyle, string: 'at ' + String(currentPatient.lastTakenTime),}),
				Line($, {left:10, right:10, height:180,}),
				Picture($, { left:10, right: 10, active: true, width:25, url: contactPatientGreen, active: true, 							
					Behavior: class extends Behavior {
						onTouchEnded(container, id, x, y, ticks) {
				            popSwitch = true; 
							currentScreen.active = true;
				            application.remove(popupTickScreen);
				            container.bubble( "onTriggerTransition", "toContactPatient" );
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

/* Home Screen */
let HomeScreen = Container.template($ => ({ 
	left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin, 
	Behavior: MainScreenBehavior, 
	contents: [
		Container($, {left: 0, right: 0, name: 'lel',
			contents: [ 		
				Column($, {left: 0, right: 0, name: 'homeScreenAddHere',
					contents: [ 
					/* HOME */
						Container($, {left: 0, right: 0, skin: blueSkin,
							contents: [
								Label($, {left:0, right:0, height:70, top: 14, style:titleStyle, string:'My Patients' }),
								Picture($, { left:0, top:19, bottom:0, width:(application.width * 0.1), url: settingsPicture, active: true,
									Behavior: class extends Behavior {
										onTouchEnded(container, id, x, y, ticks) {
											if (popSwitch) container.bubble( "onTriggerTransition", "homeToSettings" );
										}
									}, 
								}),
								Picture($, { right:10, top:18, active: true, bottom:0, width:(application.width * 0.1), url: add, active: true, 
									Behavior: class extends Behavior {
										onTouchEnded(container, id, x, y, ticks) {
											if (popSwitch) container.bubble( "onTriggerTransition", "homeToAddPatient");
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
	


/* Add Patient Screen */
let AddPatientScreen = Container.template($ => ({ 
	left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin, 
	Behavior: MainScreenBehavior, 
	contents: [
		Container($, {left: 0, right: 0,
			contents: [ 		
				Column($, {left: 0, right: 0,
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
								Label($, {left:0, right:0, height:70, top: 30, style:titleStyle, string:'Add Patient' }),
								Picture($, { left:0, top:30, active: true, bottom:0, width:(application.width * 0.1), url: back, active: true, 
									Behavior: class extends Behavior {
										onTouchEnded(container, id, x, y, ticks) {
											if (popSwitch) container.bubble( "onTriggerTransition", "patientToHome");
										}
									},  
								}),
								Picture($, { right:10, top:30, active: true, bottom:0, width:(application.width * 0.25), url: save, active: true, 
									Behavior: class extends Behavior {
										onTouchEnded(container, id, x, y, ticks) {
											// CODE THAT COPIES NEW PATIENT TO DATASTRUCTURE
											if (popSwitch) container.bubble( "onTriggerTransition", "patientToHome");
										}
									},  
								}),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* FIRST NAME */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  First Name:' }),
								Label($, {right:25, height:(application.height / 10), top: 0, active: true, editable: true, style:editLabelStyle, string:'  enter text', 
									Behavior: class extends Behavior {onTouchEnded(label) {
				                            label.string = "John",
				                            label.style = labelStyle,
										}
									}, 
								}),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* LAST NAME */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Last Name:' }),
								Label($, {right:25, height:(application.height / 10), top: 0, active: true, editable: true, style:editLabelStyle, string:'  enter text', 
									Behavior: class extends Behavior {onTouchEnded(label) {
				                            label.string = "Doe",
				                            label.style = labelStyle,
										}
									}, 
								}),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* BIRTHDAY */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, active: true, style:labelStyle, string:'  Birthday:'}), 
								Label($, {right:25, height:(application.height / 10), top: 0, active: true, editable: true, style:editLabelStyle, string:'  enter text', 
									Behavior: class extends Behavior {onTouchEnded(label) {
				                            label.string = "01/01/1989",
				                            label.style = labelStyle,
										}
									}, 
								}),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),	
					/* GENDER */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, active: true, style:labelStyle, string:'  Gender:'}), 
								Label($, {right:25, height:(application.height / 10), top: 0, active: true, editable: true, style:editLabelStyle, string:'  enter text', 
									Behavior: class extends Behavior {onTouchEnded(label) {
				                            label.string = "Male",
				                            label.style = labelStyle,
										}
									}, 
								}),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* HEIGHT */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, active: true, style:labelStyle, string:'  Height:'}), 
								Label($, {right:25, height:(application.height / 10), top: 0, active: true, editable: true, style:editLabelStyle, string:'  enter text', 
									Behavior: class extends Behavior {onTouchEnded(label) {
				                            label.string = "6ft",
				                            label.style = labelStyle,
										}
									}, 
								}),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* WEIGHT */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, active: true, style:labelStyle, string:'  Weight:'}), 
								Label($, {right:25, height:(application.height / 10), top: 0, active: true, editable: true, style:editLabelStyle, string:'  enter text', 
									Behavior: class extends Behavior {onTouchEnded(label) {
				                            label.string = "169 lbs",
				                            label.style = labelStyle,
										}
									}, 
								}),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* ADD MEDICATION */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Picture($, { left:0, top:0, bottom:0, url:plus, active: true, 
									Behavior: class extends Behavior {
										onTouchEnded(container, id, x, y, ticks) {
											container.bubble( "onTriggerTransition", "patientToAddMedication");
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



/* Patient Screen */
let PatientScreen = Container.template($ => ({ 
	left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin, 
	Behavior: MainScreenBehavior, 
	contents: [
		Container($, {left: 0, right: 0,
			contents: [ 		
				Column($, {left: 0, right: 0,
					contents: [ 
					/* PATIENT X TITLE */
						Container($, {left: 0, right: 0, skin: blueSkin,
							contents: [
								Label($, {left:10, right:40, height:70, top: 40, style:titleStyle, string:currentPatientName }),
								Picture($, { left:0, top:45, active: true, bottom:0, width:(application.width * 0.1), url: back, active: true, 
									Behavior: class extends Behavior {
										onTouchEnded(container, id, x, y, ticks) {
											container.bubble( "onTriggerTransition", "patientToHome");
										}
									},  
								}),
								Picture($, { right:10, top:45, active: true, bottom:0, width:(application.width * 0.25), url: edit, active: true, 
									Behavior: class extends Behavior {
										onTouchEnded(container, id, x, y, ticks) {
											container.bubble( "onTriggerTransition", "patientToPatientEdit");
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
					/* IBRUPROFEN */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Ibuprofen' }),
								Picture($, { right:0, top:0, bottom:0, url:tick }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* ACETAMINOPHEN */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Acetaminophen' }),
								Picture($, { right:0, top:0, bottom:0, url:exclamation }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* ADD MEDICATION */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Picture($, { left:0, top:0, bottom:0, url:plus, active: true, 
									Behavior: class extends Behavior {
										onTouchEnded(container, id, x, y, ticks) {
											container.bubble( "onTriggerTransition", "patientToAddMedication");
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
								Label($, {left:0, right:0, height:(application.height * 0.15), top: 0, style:labelStyle, skin: greySkin, string:'  ' }),
							]
						}),	
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
											container.bubble( "onTriggerTransition", "patientToHome");
										}
									},  
								}),
								Picture($, { right:10, top:30, active: true, bottom:0, width:(application.width * 0.25), url: save, active: true, 
									Behavior: class extends Behavior {
										onTouchEnded(container, id, x, y, ticks) {
											currentPatient.first = String(editFirst.name);
											trace(currentPatient.first + "\n")
											currentPatient.last = String(editLast.name);
											currentPatient.birthday = String(editBirthday.name);
											currentPatient.gender = String(editGender.name);
											currentPatient.height = String(editHeight.name);
											currentPatient.weight = String(editWeight.name);
											container.bubble( "onTriggerTransition", "patientEditToPatient");
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
								editFirst = new MyField({name: String(currentPatient.getFirst())}),
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

								editLast =  new MyField({name: currentPatient.last}),
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

								editBirthday = new MyField({name: currentPatient.birthday}),
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

								editGender = new MyField({name: currentPatient.gender}),
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

								editHeight = new MyField({name: currentPatient.height}),
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

								editWeight = new MyField({name: currentPatient.weight}),
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
											container.bubble( "onTriggerTransition", "patientToAddMedication");
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

//////////////////////////////////////////////////////////////////////////////
let AddMedicationScreen = Container.template($ => ({ 
	left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin, 
	Behavior: MainScreenBehavior, 
	contents: [
		Container($, {left: 0, right: 0,
			contents: [ 		
				Column($, {left: 0, right: 0,
					contents: [ 
/* PATIENT X TITLE */
						Container($, {left: 0, right: 0, skin: blueSkin,
							contents: [
								Label($, {left:0, right: 20, height:70, top: 30, style:titleStyle, string:'Add Medication' }),
								Picture($, { left:0, top:30, active: true, bottom:0, width:(application.width * 0.1), url: back, active: true, 
									Behavior: class extends Behavior {
										onTouchEnded(container, id, x, y, ticks) {
											container.bubble( "onTriggerTransition", "addMedicationToPatient");
										}
									},  
								}),
								Picture($, { right:10, top:30, active: true, bottom:0, width:(application.width * 0.25), url: save, active: true, 
									Behavior: class extends Behavior {
										onTouchEnded(container, id, x, y, ticks) {
											currentPatient.add("ibuprofen");
											container.bubble( "onTriggerTransition", "addMedicationToPatient");
										}
									},  
								}),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* Medicine Name */

						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Medicine Name' }),
							]
						}),
						Line($, {height:(application.height / 15), left: 0, right: 0, top:0, bottom:0, active: true,
							contents: [
								Label($, {active: true, editable: true, left: 50, right: 20, style:editLabelStyle, string:'', 
												
											}),
								Label($, {active: true, editable: true, left: 60, right: 20, style:editLabelStyle, string:'Medicine', 
												Behavior: class extends Behavior {onTouchEnded(label) {
							                            this.left = 50,
							                            label.string = "Ibuprofen",
							                            label.style = labelStyle,
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
						Line($, {height:(application.height / 15), left: 0, right: 0, top:0, bottom:0, active: true,
							contents: [
								Label($, {active: true, editable: true, left: 40, right: 20, style:editLabelStyle, string:'amount', 
												Behavior: class extends Behavior {onTouchEnded(label) {
							                            label.string = "300",
							                            label.style = labelStyle,
													}
												}, 
											}),
								Label($, {active: true, editable: true, left: 40, right: 20, style:editLabelStyle, string:'', 
												
											}),
								Label($, {active: true, editable: true, left: 40, right: 20, style:editLabelStyle, string:'unit', 
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
						Line($, {height:(application.height / 15), left: 0, right: 0, top:0, bottom:0, active: true,
							contents: [
								Label($, {active: true, editable: true, left: 40, right: 20, style:editLabelStyle, string:'X times', 
												Behavior: class extends Behavior {onTouchEnded(label) {
							                            label.string = "3 times",
							                            label.style = labelStyle,
													}
												}, 
											}),
								Label($, {active: true, editable: true, left: 40, right: 20, style:editLabelStyle, string:'per', 
												
											}),
								Label($, {active: true, editable: true, left: 40, right: 20, style:editLabelStyle, string:'day', 
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
						Line($, {height:(application.height / 7.5), left: 0, right: 0, top:0, bottom:0, active: true,
							contents: [
								Label($, {active: true, editable: true, left: 40, right: 20, style:editLabelStyle, string:'None', 
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
						Line($, {height:(application.height / 7.5), left: 0, right: 0, top:0, bottom:0, active: true,
							contents: [
								Label($, {active: true, editable: true, left: 40, right: 20, style:editLabelStyle, string:'None', 
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
/////////////////////////////////////////////////////////////



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
											container.bubble( "onTriggerTransition", "settingsToHome");
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
								dispenserLabel = Label($, {left:0, right:0, height:(application.height / 8), width:(application.width * 0.85), top: 0, style:dispenserLabelStyle, string:' DISPENSER 1  ' }),
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
					/* DEVICE TITLE */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Picture($, { left:0, top:0, bottom:0, width:(application.width * 0.15), url:dispenserDisconnect}),
								Label($, {left:0, right:0, height:(application.height / 8), width:(application.width * 0.85), top: 0, style:dispenserLabelStyle, string:' DISPENSER 2  ' }),
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
				/* BLANK SPACE */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height * 0.2), top: 0, style:labelStyle, skin: greySkin, string:'  ' }),
							]
						}),						
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
    let str = "";
    let currentTime = new Date()
    let hours = currentTime.getHours()
    let minutes = currentTime.getMinutes()
    let seconds = currentTime.getSeconds()
    let date = currentTime.getDate()
    let month = currentTime.getMonth()

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
function updatedispenserConnection(conn) {
	connected = conn;
	if (conn) {
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


/* Pins discovery helper function */
function discovery() {
    trace("Trying to connect to remote pins\n");
	let discoveryInstance = Pins.discover(
        connectionDesc => {
            
            if (connectionDesc.name == "pillsense-device") {
                trace("Connected to remote pins\n");
                updatedispenserConnection(true);
                remotePins = Pins.connect(connectionDesc);
                remotePins.repeat("/pill1Button/read", 500, function(result1) {
			    	  
				});

				remotePins.repeat("/pill2Button/read", 500, function(result2) {

				});

		        remotePins.repeat("/ibuLevel/read", 500, function(result) {
				   	let level1 = empty;
				   	if (result >= 0.85) level1 = full;
				   	else if (result >= 0.60) level1 = threeQuarter;
				   	else if (result >= 0.35) level1 = half;
				   	else if (result >= 0.1) level1 = oneQuarter;
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
		application.add( mainScreen );
		mainScreen.add( logoScreen );
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
