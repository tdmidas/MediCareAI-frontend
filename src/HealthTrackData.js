import axios from "axios";
async function fetchAndUpdateHealthData() {
	try {
		const userId = localStorage.getItem("userId");
		const response = await axios.get(`http://localhost:5000/api/health/overall/${userId}`);
		const { bmi, diaBloodPressure, glucose, sysBloodPressure } = response.data;

		// Update the value field in HealthTrackData
		HealthTrackData.find((item) => item.name === "Huyết áp").value = diaBloodPressure + "/" + sysBloodPressure;
		HealthTrackData.find((item) => item.name === "Chỉ số BMI").value = bmi;
		HealthTrackData.find((item) => item.name === "Đường huyết").value = glucose;

		console.log("Health data updated successfully:", HealthTrackData);
	} catch (error) {
		console.error("Error fetching health data:", error);
	}
}

// Call the function to fetch and update health data
fetchAndUpdateHealthData();
const HealthTrackData = [
	{
		id: 1,
		name: "Huyết áp",
		picture: require("./assets/blood-pressure.png"),
		measure: "mmHg",
		value: 0,
		color: "#c0f1ef",
	},
	{
		id: 2,
		name: "Đường huyết",
		picture: require("./assets/blood-sugar.png"),
		measure: "mmol/L",
		value: 0,
		color: "#f5dec4",
	},
	{
		id: 3,
		name: "Chỉ số BMI",
		picture: require("./assets/bmi.png"),
		measure: "BMI",
		value: 0,
		color: "#caffe0",
	},
];

export default HealthTrackData;
