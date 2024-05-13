function showQuestion(iconId) {
    document.getElementById('image-content').style.display = 'none';
    document.getElementById('question-content').style.display = 'block';

    // Set the same background image for the image container
    var imageContainer = document.getElementById('quest3ImageContainer');
    imageContainer.style.backgroundImage = 'url("../../Media/quests_bg.png")'; // Example path to common background image

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
            iconSrc = '../../Media/element1.png';
            hint = 'Hint for question 1'; // Set the hint
            break;
        case 'icon2':
            questionText = "How can planting lots of trees help the Earth’s air?";
            answers = ['Trees can blow away bad smells', 'Trees can help keep the air clean by taking in a gas called carbon dioxide', 
            'Trees can make clouds and bring rain','Trees can make the air warmer'];
            correctAnswer = 'Trees can help keep the air clean by taking in a gas called carbon dioxide';
            iconSrc = '../../Media/element2_origin.png';
            hint = '';
            break;
        case 'icon3':
            questionText = 'What gas do humans produce that causes the Earth to warm up?';
            answers = ['Oxygen' + '\n', 'Hydrogen', 'Carbon dioxide', 'Helium'];
            correctAnswer = 'Carbon dioxide';
            iconSrc = '../../Media/element3_origin.png';
            hint = '';
            break;
        case 'icon4':
            questionText = "Max’s community has big recycling bins, but many people still throw away things that can be recycled. How might recycling help the Earth?";
            answers = ['Recycling can make new toys and games', 'Recycling can help make the air cleaner by not making as much trash',
             'Recycling can help save water and energy','Recycling can make the ground shake'];
            correctAnswer = 'Recycling can help make the air cleaner by not making as much trash';
            iconSrc = '../../Media/element4.png';
            hint = '';
            break;
        case 'icon5':
            questionText = 'Mary is hosting a picnic and wants to be eco-friendly. What should she use?';
            answers = ['Disposable plates and plastic cutlery', 'Reusable plates and utensils', 
            'Paper napkins for everything','Individually wrapped snacks'];
            correctAnswer = 'Reusable plates and utensils';
            iconSrc = '../../Media/element5.png';
            hint = '';
            break;
        case 'icon6':
            questionText = 'Ava wants to buy healthy and eco-friendly food at the market. What should she choose?';
            answers = ['Locally grown vegetables', 'Clothes made of plastic', 'Imported fruit flown from overseas',
            'Packaged snacks with plastic wrapping'];
            correctAnswer = 'Locally grown vegetables';
            iconSrc = '../../Media/element6.png';
            hint = '';
            break;
        case 'icon7':
            questionText = 'Jake is learning about different kinds of energy in school. He wonders why using wind and sun to make energy is good. Which answer best explains why?';
            answers = ['Because it helps flowers grow', 'Because it can make the air dirty',
             'Because it doesn’t use up things like coal and oil','Because it makes too much noise'];
            correctAnswer = 'Because it doesn’t use up things like coal and oil ';
            iconSrc = '../../Media/element7.png';
            hint = '';
            break;
        case 'icon8':
            questionText = 'Oliver needs new school supplies and wants to make environmentally friendly choices. What should he buy?';
            answers = ['Pens that are thrown away after one use', 'Notebooks made from recycled paper', 
            'Plastic folders that break easily', 'Glitter and plastic decorations'];
            correctAnswer = 'Notebooks made from recycled paper';
            iconSrc = '../../Media/element8.png';
            hint = '';
            break;
        case 'icon9':
            questionText = "Ella loves taking baths but wants to save water. What’s the best thing she can do?";
            answers = ['Take shorter showers instead of long baths', 'Keep the tap running while brushing teeth', 
            'Fill the bathtub to the brim','Water her garden with a hose every day'];
            correctAnswer = 'Take shorter showers instead of long baths';
            iconSrc = '../../Media/element9.png';
            hint = '';
            break;
        case 'icon10':
            questionText = "Grace’s family uses a lot of electricity. How can they reduce their usage?";
            answers = ['Turn off lights and electronics when not in use', 'Leave all devices plugged in all day', 
            'Keep the air conditioning on high','Use an electric heater all night'];
            correctAnswer = 'Turn off lights and electronics when not in use';
            iconSrc = '../../Media/element10.png';
            hint = '';
            break;          
            
    }


    // Create icon image element
    var iconImg = document.createElement('img');
    iconImg.src = iconSrc;
    iconImg.classList.add('icon');
    iconImg.style.width = '600px'; // Example inline style for width
    iconImg.style.height = 'auto'; // Example inline style for height
    iconImg.style.position = 'absolute'; // Set position to absolute
    iconImg.style.left = '-90px'; // Example inline style for left position
    iconImg.style.top = '150px'; // Example inline style for top position
    iconImg.style.pointerEvents = 'none'; // Disable pointer events

    // Create question text element
    var questionTextElement = document.createElement('h3');
    questionTextElement.textContent = questionText;
    questionTextElement.style.fontSize = '23px'; // Example inline style for font size
    questionTextElement.style.textAlign = 'left'; // Example inline style for text alignment
    questionTextElement.style.position = 'relative'; // Example inline style for positioning
    questionTextElement.style.top = '-60px'; // Example inline style for top position
    questionTextElement.style.left = '0px'; // Example inline style for left position



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
        label.style.fontSize = '23px'; // Example inline style for font size
        label.style.textAlign = 'left'; // Example inline style for text alignment
        label.style.position = 'relative'; // Example inline style for positioning
        label.style.top = '-60px'; // Example inline style for top position
        label.style.left = '0px'; // Example inline style for left position
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
    summitButtonImage.src = '../../Media/submit_button.png';
    summitButtonImage.alt = 'Submit Answer';

    // Adjust size and position of the summit button image
    summitButtonImage.style.width = '400px'; // Set the width of the button
    summitButtonImage.style.height = '200px'; // Set the height of the button
    summitButtonImage.style.position = 'absolute'; // Set the position to absolute
    summitButtonImage.style.top = '450px'; // Set the distance from the top of the container
    summitButtonImage.style.left = '520px'; // Set the distance from the left of the container

    // Attach click event listener to summit button image
    summitButtonImage.addEventListener('click', function() {
        // Call answerQuestion function and pass the correct answer
        answerQuestion(correctAnswer);
    });

    // Create back button image dynamically
    var backButtonImage = document.createElement('img');
    backButtonImage.src = '../../Media/close_tab.png'; // Set the source path of your back button image
    backButtonImage.alt = 'Back';
    backButtonImage.id = 'backButtonImage';
    backButtonImage.addEventListener('click', returnToMain); // Attach click event listener to returnToMain function

    // Adjust size and position of the back button
    backButtonImage.style.width = '80px'; // Set the width of the button
    backButtonImage.style.height = '100px'; // Set the height of the button
    backButtonImage.style.position = 'absolute'; // Set the position to absolute
    backButtonImage.style.top = '30px'; // Set the distance from the top of the container
    backButtonImage.style.left = '890px'; // Set the distance from the left of the container

    // Create a container for buttons
    var buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    // Append summit button image and back button image to the button container
    buttonContainer.appendChild(summitButtonImage);
    buttonContainer.appendChild(backButtonImage);

    // Append the button container to the question content
    questionContent.appendChild(buttonContainer);

}


function answerQuestion(correctAnswer) {
    var selectedAnswer = document.querySelector('input[name="answer"]:checked');
    var feedbackElement = document.getElementById('answer-feedback');

    if (selectedAnswer) {
        var userAnswer = selectedAnswer.value;

        // Check if the answer is correct
        if ( userAnswer === correctAnswer) {
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
    var imageContainer = document.getElementById('quest3ImageContainer');
    imageContainer.style.backgroundImage = 'url("../../Media/quests_background.png")'; // Replace background image

    document.getElementById('question-content').style.display = 'none';
    document.getElementById('image-content').style.display = 'block';
}
