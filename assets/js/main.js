const submitBtn = document.querySelector(".btn");
const dayInput = document.querySelector(".day");
const monthInput = document.querySelector(".month");
const yearInput = document.querySelector(".year");
const dayInputGroup = document.querySelector("#day-input-group");
const monthInputGroup = document.querySelector("#month-input-group");
const yearInputGroup = document.querySelector("#year-input-group");

submitBtn.addEventListener("click", (e) => {
  if (!dayInput.value) {
    dayInputGroup.classList.add("required-input");
  }
  if (!monthInput.value) {
    monthInputGroup.classList.add("required-input");
  }
  if (!yearInput.value) {
    yearInputGroup.classList.add("required-input");
  }
  if (!dayInput.value | !monthInput.value | !yearInput.value) {
    return false;
  } else {
    dayInputGroup.classList.remove("required-input");
    monthInputGroup.classList.remove("required-input");
    yearInputGroup.classList.remove("required-input");
  }

  var dateInvalid = false;
  var monthInvalid = false;
  var yearInvalid = false;
  const dayPattern = /^(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/;

  const inputDay = dayInput.value;
  if (!dayPattern.test(inputDay)) {
    dayInputGroup.classList.add("invalid-input");
    dateInvalid = true;
  } else {
    dayInputGroup.classList.remove("invalid-input"); 
    dateInvalid = false;
  }

  const monthPattern = /^(0[1-9]|1[0-2])$/;

  const inputMonth = monthInput.value;
  if (!monthPattern.test(inputMonth)) {
    monthInputGroup.classList.add("invalid-input");
    monthInvalid = true;
  } else {
    monthInputGroup.classList.remove("invalid-input");   
    monthInvalid = false;
  }

  // Get current date
  const currentDate = new Date();

  if (!isNaN(yearInput.value)) {
    // Validate if the date is in the future
    if (yearInput.value > currentDate.getFullYear()) {
      yearInputGroup.classList.add("invalid-input");
      yearInvalid = true;
    } else {
      yearInputGroup.classList.remove("invalid-input");
      yearInvalid = false;
    }
  } else {
    yearInputGroup.classList.add("invalid-input");
    yearInvalid = true;
  }

  var invalid = true;

  // Validate if the date is valid considering the number of days in each month
  if (!dateInvalid && !yearInvalid && !monthInvalid) {    
    const lastDayOfMonth = new Date(
      parseInt(yearInput.value),
      parseInt(inputMonth),
      0
    ).getDate();
    if (parseInt(inputDay) > lastDayOfMonth) {
      dayInputGroup.classList.add("invalid-input");
      invalid = true
    } else {
      dayInputGroup.classList.remove("invalid-input"); 
      invalid = false
    }
  }

  if (!invalid) {
    const birthdate = new Date(
      parseInt(parseInt(yearInput.value)),
      parseInt(parseInt(monthInput.value)) - 1, // Months in JavaScript are 0-indexed (0-11)
      parseInt(parseInt(dayInput.value))
    );

    const currentDate = new Date();

    // Calculate the difference in years, months, and days
    const ageInMilliseconds = currentDate - birthdate;

    // Convert milliseconds to years, months, and days
    const millisecondsInYear = 365.25 * 24 * 60 * 60 * 1000;
    const years = Math.floor(ageInMilliseconds / millisecondsInYear);
    const months = Math.floor(
      (ageInMilliseconds % millisecondsInYear) / (30.44 * 24 * 60 * 60 * 1000)
    );
    const days = Math.floor(
      (ageInMilliseconds % (30.44 * 24 * 60 * 60 * 1000)) /
        (24 * 60 * 60 * 1000)
    );

    function startCountdown(elementId, targetValue) {
      let currentValue = 0;
      const element = document.getElementById(elementId);
      const interval = setInterval(() => {
        element.textContent = currentValue.toString().padStart(2, "0");
        currentValue++;
        if (currentValue > targetValue) {
          clearInterval(interval);
        }
      }, 50);
    }

    // Start the countdown for each element
    startCountdown("yearDetails", years);
    setTimeout(() => startCountdown("monthDetails", months), years * 50); // Delay to start month countdown after year countdown
    setTimeout(() => startCountdown("dayDetails", days), (years + months) * 50); // Delay to start day countdown after year and month countdowns
  }
})