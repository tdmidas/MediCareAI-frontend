import doctorImg01 from "../assets/doctor-img01.png";
import doctorImg02 from "../assets/doctor-img02.png";
import doctorImg03 from "../assets/doctor-img03.png";
import doctorImg04 from "../assets/doctor-img04.png";
import doctorImg05 from "../assets/doctor-img05.png";
import doctorImg06 from "../assets/doctor-1.png";

// Function to generate random time slots
const generateRandomTimeSlots = () => {
	const timeSlots = ["Morning", "Afternoon"];
	const randomTime = timeSlots[Math.floor(Math.random() * timeSlots.length)];
	const startHour = Math.floor(Math.random() * (17 - 8 + 1)) + 8; // Random start hour between 8 and 17 (5 PM)
	const endHour = startHour + Math.floor(Math.random() * (4 - 1 + 1)) + 1; // Random duration of 1 to 4 hours
	return [{ time: randomTime, startHour, endHour }];
};

const doctors = [
	{
		id: "01",
		name: "Dr. Thruptis",
		speciality: "Surgeon",
		avgRating: 4.8,
		totalRating: 272,
		photo: doctorImg01,
		totalPatients: 500,
		date: "23 June, 2008",
		education: "PHD in Surgeon",
		hospital: "Kangaroo Hospital.",
		short: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, alias!",
		full: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, alias! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, alias! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, alias! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, alias!",
		availableTimes: [
			{ time: "Morning", startHour: 8, endHour: 12 },
			{ time: "Afternoon", startHour: 13, endHour: 17 },
		],
		price: 200,
	},
	{
		id: "02",
		name: "Dr. D K Gupta",
		speciality: "Neurologist",
		avgRating: 4.8,
		totalRating: 272,
		photo: doctorImg02,
		date: "23 June, 2008",
		totalPatients: 1500,
		hospital: "Flex Hospital",
		education: "PHD in Neurologist",
		short: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, alias!",
		availableTimes: [
			{ time: "Morning", startHour: 9, endHour: 11 },
			{ time: "Afternoon", startHour: 16, endHour: 17 },
		],
		price: 230,
	},
	{
		id: "03",
		name: "Dr. Jennie Nguyen",
		speciality: "Gynaecology",
		avgRating: 4.8,
		totalRating: 272,
		photo: doctorImg03,
		totalPatients: 1000,
		date: "23 June, 2008",
		education: "PHD in Gynaecology",
		hospital: "Flex Hospital",
		short: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, alias!",
		availableTimes: generateRandomTimeSlots(),
		price: 350,
	},
	{
		id: "04",
		name: "Dr. Thiago",
		speciality: "Surgeon",
		avgRating: 4.8,
		totalRating: 272,
		photo: doctorImg04,
		totalPatients: 500,
		date: "23 June, 2008",
		education: "PHD in Surgeon",
		hospital: "Kangaroo Hospital.",
		short: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, alias!",
	},
	{
		id: "05",
		name: "Dr. Wendy Hill",
		speciality: "Neurologist",
		avgRating: 4.8,
		totalRating: 272,
		photo: doctorImg05,
		date: "23 June, 2008",
		totalPatients: 1500,
		hospital: "Flex Hospital",
		education: "PHD in Neurologist",
		short: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, alias!",
		availableTimes: generateRandomTimeSlots(),
		price: 170,
	},
	{
		id: "06",
		name: "Dr. Justin ",
		speciality: "Gynaecology",
		avgRating: 4.8,
		totalRating: 272,
		photo: doctorImg06,
		totalPatients: 1000,
		date: "23 June, 2008",
		education: "PHD in Gynaecology",
		hospital: "Flex Hospital",
		short: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, alias!",
		availableTimes: generateRandomTimeSlots(),
		price: 220,
	},
];

export default doctors;
