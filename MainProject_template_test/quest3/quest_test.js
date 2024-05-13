  // Function to store the information about whether the user answered a question correctly
  function storeAnswerStatus(iconId, isCorrect) {
    sessionStorage.setItem(iconId, isCorrect ? 'Correct' : 'Incorrect');
}

// Function to retrieve the answer status for a particular icon
function getAnswerStatus(iconId) {
    return sessionStorage.getItem(iconId);
}

function displayAnswerStatus() {
for (let i = 1; i <= 10; i++) {
    let iconId = 'icon' + i;
    let answerStatus = getAnswerStatus(iconId);
    let statusElements = document.querySelectorAll('#' + iconId + '-status');
    for (let j = 0; j < statusElements.length; j++) {
        let statusElement = statusElements[j];
        if (answerStatus === 'Correct') {
            statusElement.src = 'task3/correct.png';
            statusElement.style.visibility = 'visible';
        } else if (answerStatus === 'Incorrect') {
            statusElement.src = 'task3/incorrect.png';
            statusElement.style.visibility = 'visible';
        } else {
            statusElement.style.visibility = 'hidden'; // Hide if no answer yet
        }
    }
}
}

function showQuestion(iconId) {
    document.getElementById('image-content').style.display = 'none';
    document.getElementById('question-content').style.display = 'block';

    // Set the same background image for the image container
    var imageContainer = document.getElementById('imageContainer');
    imageContainer.style.backgroundImage = 'url("task3/Interactive quests - bg.png")'; // Example path to common background image

    var questionText = '';
    var answers = [];
    var correctAnswer = '';
    var iconSrc = '';
    switch (iconId) {
        case 'icon1':
            questionText = 'Sarah notices that her city experiences hotter summers than it did a few years\
             ago. What could be a possible reason for this change?';
            answers = ['Increased forestation in area', 'Higher levels of greenhouse gases in the atmosphere', ' More frequent animals in forest nearby',
            'Increased rainfall in the coastal regions'];
            correctAnswer = 'Higher levels of greenhouse gases in the atmosphere';
            iconSrc = 'task3/element1.png';
            hint = 'Hint for question 1'; // Set the hint
            break;
        case 'icon2':
            questionText = "How can planting lots of trees help the Earth’s air?";
            answers = ['Trees can blow away bad smells', 'Trees can help keep the air clean by taking in a gas called carbon dioxide', 
            'Trees can make clouds and bring rain','Trees can make the air warmer'];
            correctAnswer = 'Trees can help keep the air clean by taking in a gas called carbon dioxide';
            iconSrc = 'task3/cropped/element2.png';
            hint = '';
            break;
        case 'icon3':
            questionText = 'What gas do humans produce that causes the Earth to warm up?';
            answers = ['Oxygen', 'Hydrogen', 'Carbon dioxide','Helium'];
            correctAnswer = 'Carbon dioxide';
            iconSrc = 'task3/cropped/element3.png';
            hint = '';
            break;
        case 'icon4':
            questionText = "Max’s community has big recycling bins, but many people still throw away things that can be recycled. How might recycling help the Earth?";
            answers = ['Recycling can make new toys and games', 'Recycling can help make the air cleaner by not making as much trash',
             'Recycling can help save water and energy','Recycling can make the ground shake'];
            correctAnswer = 'Recycling can help make the air cleaner by not making as much trash';
            iconSrc = 'task3/element4.png';
            hint = '';
            break;
        case 'icon5':
            questionText = 'Mary is hosting a picnic and wants to be eco-friendly. What should she use?';
            answers = ['Disposable plates and plastic cutlery', 'Reusable plates and utensils', 
            'Paper napkins for everything','Individually wrapped snacks'];
            correctAnswer = 'Reusable plates and utensils';
            iconSrc = 'task3/element5.png';
            hint = '';
            break;
        case 'icon6':
            questionText = 'Ava wants to buy healthy and eco-friendly food at the market. What should she choose?';
            answers = ['Locally grown vegetables', 'Clothes made of plastic', 'Imported fruit flown from overseas',
            'Packaged snacks with plastic wrapping'];
            correctAnswer = 'Locally grown vegetables';
            iconSrc = 'task3/element6.png';
            hint = '';
            break;
        case 'icon7':
            questionText = 'Jake is learning about different kinds of energy in school. He wonders why using wind and sun to make energy is good. Which answer best explains why?';
            answers = ['Because it helps flowers grow', 'Because it can make the air dirty',
             'Because it doesn’t use up things like coal and oil','Because it makes too much noise'];
            correctAnswer = 'Because it doesn’t use up things like coal and oil ';
            iconSrc = 'task3/element7.png';
            hint = '';
            break;
        case 'icon8':
            questionText = 'Oliver needs new school supplies and wants to make environmentally friendly choices. What should he buy?';
            answers = ['Pens that are thrown away after one use', 'Notebooks made from recycled paper', 
            'Plastic folders that break easily', 'Glitter and plastic decorations'];
            correctAnswer = 'Notebooks made from recycled paper';
            iconSrc = 'task3/element8.png';
            hint = '';
            break;
        case 'icon9':
            questionText = "Ella loves taking baths but wants to save water. What’s the best thing she can do?";
            answers = ['Take shorter showers instead of long baths', 'Keep the tap running while brushing teeth', 
            'Fill the bathtub to the brim','Water her garden with a hose every day'];
            correctAnswer = 'Take shorter showers instead of long baths';
            iconSrc = 'task3/element9.png';
            hint = '';
            break;
        case 'icon10':
            questionText = "Grace’s family uses a lot of electricity. How can they reduce their usage?";
            answers = ['Turn off lights and electronics when not in use', 'Leave all devices plugged in all day', 
            'Keep the air conditioning on high','Use an electric heater all night'];
            correctAnswer = 'Turn off lights and electronics when not in use';
            iconSrc = 'task3/element10.png';
            hint = '';
            break;          
            
    }
     // Store the correct answer and iconId in sessionStorage
     sessionStorage.setItem('correctAnswer_' + iconId, correctAnswer);
     sessionStorage.setItem('currentQuestionIconId', iconId);
    console.log("Correct answer retrieved from sessionStorage:", correctAnswer);
    console.log("IconID:",iconId );

    // Create icon image element
    var iconImg = document.createElement('img');
    iconImg.src = iconSrc;
    iconImg.classList.add('icon');
    iconImg.style.width = '900px'; // Example inline style for width
    iconImg.style.height = 'auto'; // Example inline style for height
    iconImg.style.position = 'absolute'; // Set position to absolute
    iconImg.style.left = '20px'; // Example inline style for left position
    iconImg.style.top = '200px'; // Example inline style for top position
    iconImg.style.pointerEvents = 'none'; // Disable pointer events


    // Create question text element
    var questionTextElement = document.createElement('p');
    questionTextElement.textContent = questionText;
    questionTextElement.style.fontSize = '30px'; // Example inline style for font size
    questionTextElement.style.textAlign = 'left'; // Example inline style for text alignment
    questionTextElement.style.position = 'relative'; // Example inline style for positioning
    questionTextElement.style.top = '20px'; // Example inline style for top position
    questionTextElement.style.left = '80px'; // Example inline style for left position



    // Create answer options element
    var answerOptionsElement = document.createElement('div');
    answers.forEach(function(answer) {
        var label = document.createElement('label');
        var input = document.createElement('input');
        input.type = 'radio';
        input.name = 'answer';
        input.value = answer;
        label.appendChild(input);
        label.appendChild(document.createTextNode(answer));
        label.appendChild(document.createElement('br'));
        label.style.fontSize = '24px'; // Example inline style for font size
        label.style.textAlign = 'left'; // Example inline style for text alignment
        label.style.position = 'relative'; // Example inline style for positioning
        label.style.top = '20px'; // Example inline style for top position
        label.style.left = '80px'; // Example inline style for left position
        answerOptionsElement.appendChild(label);
    });

    // Clear existing content and append elements to question container
    var questionContent = document.getElementById('question-content');
    questionContent.innerHTML = ''; // Clear existing content
    questionContent.appendChild(iconImg);

    var questionContainer = document.createElement('div');
    questionContainer.classList.add('question-container');
    questionContainer.appendChild(questionTextElement);
    questionContainer.appendChild(answerOptionsElement);
    questionContent.appendChild(questionContainer);


    // Create feedback element
    var feedbackElement = document.createElement('div');
    feedbackElement.id = 'answer-feedback';
    questionContent.appendChild(feedbackElement);

    // Create an img element for the summit image
    var summitButtonImage = document.createElement('img');
    summitButtonImage.src = 'task3/submit_button.png'; // Replace 'task3/submit_button.png' with the actual path to your summit image
    summitButtonImage.alt = 'Submit Answer';

    // Adjust size and position of the summit button image
    summitButtonImage.style.width = '400px'; // Set the width of the button
    summitButtonImage.style.height = '200px'; // Set the height of the button
    summitButtonImage.style.position = 'absolute'; // Set the position to absolute
    summitButtonImage.style.top = '670px'; // Set the distance from the top of the container
    summitButtonImage.style.left = '920px'; // Set the distance from the left of the container

    // // Attach click event listener to summit button image
    summitButtonImage.addEventListener('click', function() {
        // Call answerQuestion function and pass the correct answer
        answerQuestion();
    });

    // Create back button image dynamically
    var backButtonImage = document.createElement('img');
    backButtonImage.src = 'task3/close_tab.png'; // Set the source path of your back button image
    backButtonImage.alt = 'Back';
    backButtonImage.id = 'backButtonImage';
    backButtonImage.addEventListener('click', returnToMain); // Attach click event listener to returnToMain function

    // Adjust size and position of the back button
    backButtonImage.style.width = '100px'; // Set the width of the button
    backButtonImage.style.height = '100px'; // Set the height of the button
    backButtonImage.style.position = 'absolute'; // Set the position to absolute
    backButtonImage.style.top = '60px'; // Set the distance from the top of the container
    backButtonImage.style.left = '1420px'; // Set the distance from the left of the container

    // Create a container for buttons
    var buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    // Append summit button image and back button image to the button container
    buttonContainer.appendChild(summitButtonImage);
    buttonContainer.appendChild(backButtonImage);

    // Append the button container to the question content
    questionContent.appendChild(buttonContainer);

}


function answerQuestion() {
    var selectedAnswer = document.querySelector('input[name="answer"]:checked');
    console.log('here',selectedAnswer)
    var feedbackElement = document.getElementById('answer-feedback');

    // Reset feedback element's class
    feedbackElement.classList.remove('correct-feedback', 'incorrect-feedback', 'no-selection');

    if (selectedAnswer) {
        // Retrieve the iconId from sessionStorage
        var iconId = sessionStorage.getItem('currentQuestionIconId');
        var correctAnswer = sessionStorage.getItem('correctAnswer_' + iconId); // Retrieve correct answer using iconId
        console.log("Correct answer retrieved from sessionStorage:", correctAnswer);
        console.log("Icon ID:", iconId);
        var userAnswer = selectedAnswer.value;
       
        // Check if the answer is correct
        if (userAnswer === correctAnswer) {
            // Correct answer
            feedbackElement.textContent = 'Congratulations! Your answer is correct!';
            feedbackElement.classList.add('correct-feedback'); // Add class for styling
        } else {
            // Incorrect answer
            feedbackElement.textContent = 'Your answer is incorrect. Please try again.';
            feedbackElement.classList.add('incorrect-feedback'); // Add class for styling
        }

        // Display the feedback
        feedbackElement.style.display = 'block';
    } else {
        // No answer selected
        feedbackElement.textContent = 'Please select an answer.';
        feedbackElement.classList.add('no-selection'); // Add class for styling
        // Display the feedback
        feedbackElement.style.display = 'block';
    }
}


function returnToMain() {
    // Reset background image to the original one
    var imageContainer = document.getElementById('imageContainer');
    imageContainer.style.backgroundImage = 'url("task3/Interactive quests - background.png")'; // Replace background image

    document.getElementById('question-content').style.display = 'none';
    document.getElementById('image-content').style.display = 'block';
}

window.addEventListener('load', displayAnswerStatus);






