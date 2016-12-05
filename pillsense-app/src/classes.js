export class User {

	constructor(username, password) {
		this.username = username;
		this.password = password;
		this.patientsBad = [];
		this.patientsGood = [];
	}

	addPatient(patient) {
		this.patientsGood.push(patient);
	}
}

// Instantiate new objects with 'new'
//var person = new Person("Bob", "M");


export class Patient {

	constructor(first, last, birthday, gender, height, weight, status, lastTaken) {
		this.meds = [];
		this.first = first;
	    this.last = last;
	    this.birthday = birthday;
	    this.gender = gender;
	    this.height = height;
	    this.weight = weight;
	    this.statusGood = status;
		this.lastTaken = lastTaken;
	}
	
	addMed(med) {
		this.meds.push(med);
	}

	getFirst() {
		// trace(this.first + " from getFirst \n")
		return this.first;
	}
	
	getLast() {
		return this.last;
	}
}

export class Med {

	constructor(name, dosageAmount, unit, freq, dayWeek, intake, side, lastTakenTime, errorMessage, patientMessage) {
		this.conflicts = {"ibuprofen" : ["dayquil"], "acetaminophen": ["dayquil"], "dayquil" : ["ibuprofen", "acetaminophen"]};
		this.name = name;
	    this.dosageAmount = dosageAmount;
	    this.unit = unit;
	    this.freq = freq;
	    this.dayWeek = dayWeek;
	    this.intake = intake;
	    this.side = side;
		this.lastTakenTime = lastTakenTime;
		this.errorMessage = errorMessage;
		this.patientMessage = patientMessage;
	}
}


//export var ibuprofen = new Med();
//ibuprofen.create("ibuprofen", "300", "mg", 4, "day", "None", "Can cause anemia, vomiting");

//export var acetaminophen = new Med();
//acetaminophen.create("acetaminophen", "325", "mg", 3, "day", "None", "Can cause diarrhea");

//export var dayquil = new Med();
//dayquil.create("dayquil", "40", "ml", 2, "day", "None", "Can cause sore throat");

//export var prozac = new Med();
//prozac.create("prozac", "20", "mg", 1, "day", "None", "Can cause anxiety");

