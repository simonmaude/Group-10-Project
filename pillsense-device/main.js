 let Pins = require("pins");
 
/*Buttons Import*/
import { 
    Button,
    ButtonBehavior 
} from "buttons";

/* Field Setup */
import {
    FieldScrollerBehavior,
    FieldLabelBehavior
} from 'field';

/* Keyboard Setup */
import {SystemKeyboard} from 'keyboard';

/* device url of the IAP140 app*/
var deviceURL = "";

/* variables */
var receivedMessage = "";
var patientMessage = "";
let refreshPic;
let sendPic;

/*assets */
let refreshPicURL = './assets/refreshbutton.png';
let sendPicURL = './assets/sendbutton.png';

/* skins*/
let nameInputSkin = new Skin({ borders: { left: 2, right: 2, top: 2, bottom: 2 }, stroke: 'gray' });
let fieldLabelSkin = new Skin({ fill: ['transparent', 'transparent', '#C0C0C0', '#acd473'] });

/* styles */
let labelStyle = new Style({ color: 'black', font: 'bold 20px', horizontal: 'left'});
let fieldStyle = new Style({ color: 'black', font: 'bold 24px', horizontal: 'left',
    vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5 });
let fieldHintStyle = new Style({ color: '#aaa', font: '24px', horizontal: 'left',
    vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5 });

function updateMessageBox(labelOrVar) {
	patientMessage = labelOrVar;
	return patientMessage;
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
                        onTouchBegin(Label){
                            SystemKeyboard.show();
                        }
                        onEdited(label) {
                            let data = this.data;
                            data.name = label.string;
                            patientMessage = updateMessageBox(data.name);
                            label.container.hint.visible = (data.name.length == 0);
                            trace(data.name+"\n");
                        }
                    },
                }),
                Label($, {
                    left: 4, right: 4, top: 4, bottom: 4, style: fieldHintStyle,
                    string: "", name: "hint"
                }),
            ]
        })
    ]
}));

var messageBox = new MessageField({string:"mongoos", name: "messageBox"});

/*Refresh Button Template*/ 
let RefreshButtonTemplate = Button.template($ => ({
    top: 0, bottom: 0, left: 0, right: 0,  width: (application.width / 2) - 10,
    contents: [
        refreshPic = Picture($, { left:0, top:0, bottom:0, url:refreshPicURL }),
    ],
    Behavior: class extends ButtonBehavior {
        onTap(button){
        	trace("refresh button in device tapped\n");
			if (deviceURL != "") new Message(deviceURL + "doctorMessage").invoke(Message.JSON).then(json => { receivedMessage = json.doctorMessage; }); //trace("device received message: "+json.doctorMessage+"\n");
			labelOne.string = "  last message: "+receivedMessage;
        }
        /*onTouchEnded(content) {
			KEYBOARD.hide();
       		system.keyboard.visible = false;
       		content.focus();
   		}*/
    }
}));

/*Send Button Template*/ 
let SendButtonTemplate = Button.template($ => ({
    top: 0, bottom: 0, left: 0, right: 0,  width: (application.width / 2) - 10,
    contents: [
        sendPic = Picture($, { left:0, top:0, bottom:0, url:sendPicURL }),
    ],
    Behavior: class extends ButtonBehavior {
        onTap(button){
        	trace("send button in device tapped\n");
        }
        onTouchEnded(content) {
			SystemKeyboard.hide();
       		// system.keyboard.visible = false;
        	content.focus();
    	}
    }
}));



// var fluffy = new Media({url: "./assets/fluffy.mp3",
//   width: 0, height: 0});
// application.add(fluffy);

// var sound = new Sound(mergeURI(application.url, "./assets/fluffy.wav"));

class AppBehavior extends Behavior {
	onDisplayed(application) {
        application.discover("pillsense.app");
        trace("attempted to discover pillsense app\n");
    }
    onLaunch(application) {
        application.shared = true;
        Pins.configure({
            led1: {
                require: "Digital", // use built-in digital BLL
                pins: {
                    ground: { pin: 51, type: "Ground" },
                    digital: { pin: 52, direction: "output" },
                }
            },            
            led2: {
                require: "Digital", // use built-in digital BLL
                pins: {
                    ground: { pin: 53, type: "Ground" },
                    digital: { pin: 54, direction: "output" },
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
        },  success => {
            if (success) {
                Pins.share("ws", {zeroconf: true, name: "pillsense-device"});
                application.add(new MainContainer({ string: "Connected!", backgroundColor: "white" }));
                Pins.repeat("/pill1Button/read", 20, result => {
                	//trace("pill1Button mangos\n");
                	//trace(deviceURL+"\n");
                	
                	//if (deviceURL != "") new Message(deviceURL + "doctorMessage").invoke(Message.JSON).then(json => { receivedMessage = json.doctorMessage; }); //trace("device received message: "+json.doctorMessage+"\n");
                
            	});
    
            } else {
                   application.add(new MainContainer({ string: "Error, no connection", backgroundColor: "red" }));
               };
        });
    }
    onQuit(application) {
        application.shared = false;
        application.forget("pillsense.app");
    }
}
application.behavior = new AppBehavior();

Handler.bind("/discover", Behavior({
    onInvoke: function(handler, message){
        trace("Found the app.\n");   
        deviceURL = JSON.parse(message.requestText).url
    }
}));

Handler.bind("/forget", Behavior({
	onInvoke: function(handler, message) {
		deviceURL = "";
	}
}));

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

Handler.bind("/patientMessage", Behavior({
    onInvoke: function(handler, message){
        message.responseText = JSON.stringify({patientMessage: patientMessage});
        message.status = 200;
    }
}));



let textStyle = new Style({ font: "bold 30px", color: "white" });
var labelOne = new Label({ top: 10, bottom: 10, left: 0, right: 0, height: 36, style: labelStyle,  string: "  last message: ", active: true,});



let MainContainer = Container.template($ => ({
    top: 0, bottom: 0, left: 0, right: 0,
    skin: new Skin({ fill: $.backgroundColor }),
    	Behavior: class extends Behavior {
			onTouchEnded(content) {
				SystemKeyboard.hide();
       			// system.keyboard.visible = false;
       			content.focus();
   			}
   		},
    contents: [
    	Column($, {left: 0, right: 0, top:0, bottom:0, height: application.height / 4, width: application.width / 4,
    		Behavior: class extends Behavior {
				onTouchEnded(content) {
					SystemKeyboard.hide();
       				// system.keyboard.visible = false;
        			content.focus();
    			}
    		},
			contents: [
				Line($, {left: 0, right: 0, top:0, bottom:0, height: application.height / 4, width: application.width / 4,
					contents: [
    					labelOne,
    				]
    			}),
				Line($, {left: 25, right: 25, top:10, bottom:10, height: application.height / 4, width: application.width / 4,
					Behavior: class extends Behavior {
						onTouchEnded(content) {
							SystemKeyboard.hide();
       						// system.keyboard.visible = false;
        					content.focus();
    					}
    				},
					contents: [
    					new RefreshButtonTemplate({ textForLabel: "Refresh", width: 10 }),
    				]
    			}),
    			Line($, {left: 0, right: 0, top:0, bottom:0, height: application.height / 4, width: application.width / 4,
					contents: [
    					messageBox = new MessageField({string:"mongoos", name: "enter text here"}),
    				]
    			}),
    				Line($, {left: 25, right: 25, top:10, bottom:10, height: application.height / 4, width: application.width / 4,
					contents: [
    					new SendButtonTemplate({ textForLabel: "Send", width: 10 }),
    				]
    			}),

    		]
    	}),
    	Column($, {left: 0, right: 0, top:0, bottom:0, height: application.height / 4, width: application.width / 4,
    		Behavior: class extends Behavior {
				onTouchEnded(content) {
					SystemKeyboard.hide();
       				// system.keyboard.visible = false;
        			content.focus();
    			}
    		},
			contents: [
			
    		]
    	}),
    	/*Column($, {left: 0, right: 0, top:0, bottom:0, height: application.height / 2, width: application.width / 2,
			contents: [
        		labelOne = Label($, { top: 10, bottom: 10, left: 0, right: 0, height: application.height / 2, style: textStyle,  string: $.string, active: true, 
        			Behavior: class extends Behavior {
            			onTouchEnded(container, id, x, y, ticks) {
							trace("label touch\n");
        				}
        			}
        		}),
        	]
        }),*/
       
        	
    ],
}));
