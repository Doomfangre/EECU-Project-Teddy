let choice = {};
const medicare = document.getElementById("medicare");
const socialSecurity = document.getElementById("SS");
const federalTax = document.getElementById("federal");
const stateTax = document.getElementById("state");
const careerInfo = document.getElementById("career");

async function getCareers() {
    const url = "https://eecu-data-server.vercel.app/data";
    try {
        const response = await fetch(url);
        const jobs = await response.json();
        createOptions(jobs);
        return jobs;
    } catch (error) {
        console.error("Error fetching careers data:", error);
        return [];
    }
}

function createOptions(careers) {
    const dropdown = document.getElementById("careers");

    // Create the options
    careers.forEach((career, index) => {
        const option = document.createElement("option");
        option.innerHTML = `${career.Occupation}: $${career.Salary}`;
        option.value = index; // Store the array index as the value
        option.classList.add("option");
        dropdown.appendChild(option);
    });

    // Listen for the dropdown value to change
    dropdown.addEventListener("change", (event) => {
        const selectedIndex = event.target.value;
        
        // Update the choice object using the selected index
        choice.Occupation = careers[selectedIndex].Occupation;
        choice.Salary = careers[selectedIndex].Salary;
        
        saveChoice(choice);
        displayCareerInfo(choice);
        console.log(choice);
    });
}

function saveChoice(choice) {
    let savedChoice = JSON.stringify(choice);
    localStorage.setItem("choices", savedChoice);
    console.log("Choice saved:", choice);
}

function loadChoice() {
    let savedChoices = JSON.parse(localStorage.getItem("choices")) || {};
    choice = savedChoices;
}

function displayCareerInfo(choice) {
    careerInfo.innerHTML = `Occupation: ${choice.Occupation}<br>Salary: $${choice.Salary}`;
}

let currentChart = null;

document.getElementById("but").addEventListener("click", () => {
    const canvas = document.getElementById("chartCanvas");
    const house = document.getElementById("housing").value;
    const essen = document.getElementById("essentials").value;
    const student = document.getElementById("student-loans").value;
    const life = document.getElementById("life-style").value;
    const future = document.getElementById("future-proofing").value;

    // Destroy old chart if it exists (common Chart.js gotcha)
    if (currentChart) currentChart.destroy();
  
    // Build chart config based on type
    const config = doughnutte (house, essen, student, life, future);
  
    currentChart = new Chart(canvas, config);
  });

// DOUGHNUT
function doughnutte(one, two, three, four, five) {
    

 return {
      type: "doughnut",
      data: {
        labels: ["Housing (%)", "Essentials (%)", "Student Loans (%)", "Life-style (%)", "Life-Style (%)"],
        datasets: [{ label: "Rider mix", data: [one, two, three, four, five] }]
      },
      options: {
        plugins: {
          title: { display: true, text: `Total Deduction: ${one} (${two}) ${three} ${four} ${five}` }
        }
      }
    };
  }
  
document.getElementById("chartCanvas").innerHtml


loadChoice();
displayCareerInfo(choice);
getCareers();