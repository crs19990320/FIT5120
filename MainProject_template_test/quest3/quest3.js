function showQuestion(iconId) {
    document.getElementById('image-content').style.display = 'none';
    document.getElementById('question-content').style.display = 'block';

    // Set the same background image for the image container
    var imageContainer = document.getElementById('imageContainer');
    imageContainer.style.backgroundImage = 'url("./task3/Interactive quests - bg.png")'; // Example path to common background image

    var questionText = '';
    var answers = [];
    var iconSrc = '';
    switch (iconId) {
        case 'icon1':
            questionText = 'Sarah notices that her city experiences hotter summers than it did a few years\
             ago. What could be a possible reason for this change?';
            answers = ['Increased forestation in area', 'Higher levels of greenhouse gases\
             in the atmosphere', ' More frequent animals in forest nearby',
            'Increased rainfall in the coastal regions'];
            iconSrc = './task3/element1.png';
            break;
        case 'icon2':
            questionText = 'Question for icon 2';
            answers = ['Answer 1', 'Answer 2', 'Answer 3'];
            iconSrc = './task3/element2.png';
            break;
        case 'icon3':
            questionText = 'Question for icon 3';
            answers = ['Answer 1', 'Answer 2', 'Answer 3'];
            iconSrc = './task3/element3.png';
            break;
        case 'icon4':
            questionText = 'Question for icon 3';
            answers = ['Answer 1', 'Answer 2', 'Answer 3'];
            iconSrc = './task3/element4.png';
            break;
        case 'icon5':
            questionText = 'Question for icon 3';
            answers = ['Answer 1', 'Answer 2', 'Answer 3'];
            iconSrc = 'task3/element5.png';
            break;
        case 'icon6':
            questionText = 'Question for icon 3';
            answers = ['Answer 1', 'Answer 2', 'Answer 3'];
            iconSrc = 'task3/element6.png';
            break;
        case 'icon7':
            questionText = 'Question for icon 3';
            answers = ['Answer 1', 'Answer 2', 'Answer 3'];
            iconSrc = 'task3/element7.png';
            break;
        case 'icon8':
            questionText = 'Question for icon 3';
            answers = ['Answer 1', 'Answer 2', 'Answer 3'];
            iconSrc = 'task3/element8.png';
            break;
        case 'icon9':
            questionText = 'Question for icon 3';
            answers = ['Answer 1', 'Answer 2', 'Answer 3'];
            iconSrc = 'task3/element9.png';
            break;
        case 'icon10':
            questionText = 'Question for icon 3';
            answers = ['Answer 1', 'Answer 2', 'Answer 3'];
            iconSrc = 'task3/element10.png';
            break;          
            
    }


    // Create icon image element
    var iconImg = document.createElement('img');
    iconImg.src = iconSrc;
    iconImg.classList.add('icon');
    iconImg.style.width = '1000px'; // Example inline style for width
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
    questionTextElement.style.left = '50px'; // Example inline style for left position



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
        label.style.left = '50px'; // Example inline style for left position
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

    // Add buttons
    // var buttonContainer = document.createElement('div');
    // buttonContainer.classList.add('button-container');
    // var submitButton = document.createElement('button');
    // submitButton.type = 'button';
    // submitButton.textContent = 'Submit Answer';
    // submitButton.onclick = answerQuestion;
    // var returnButtonImage = document.getElementById('backButtonImage');
    // returnButtonImage.addEventListener('click', returnToMain);
    // buttonContainer.appendChild(submitButton);
    // buttonContainer.appendChild(returnButtonImage);
    // questionContent.appendChild(buttonContainer);


// Your code here
var buttonContainer = document.createElement('div');
buttonContainer.classList.add('button-container');
var submitButton = document.createElement('button');
submitButton.type = 'button';
submitButton.textContent = 'Submit Answer';
submitButton.onclick = answerQuestion;

// Create back button image dynamically
var backButtonImage = document.createElement('img');
backButtonImage.src = 'task3/incorrect.png'; // Set the source path of your back button image
backButtonImage.alt = 'Back';
backButtonImage.id = 'backButtonImage';
backButtonImage.addEventListener('click', returnToMain);

// Adjust size and position of the back button
backButtonImage.style.width = '150px'; // Set the width of the button
backButtonImage.style.height = '100px'; // Set the height of the button
backButtonImage.style.position = 'absolute'; // Set the position to absolute
backButtonImage.style.top = '200px'; // Set the distance from the top of the container
backButtonImage.style.left = '1200px'; // Set the distance from the left of the container

buttonContainer.appendChild(submitButton);
buttonContainer.appendChild(backButtonImage); // Appending the backButtonImage
questionContent.appendChild(buttonContainer);

}



function answerQuestion() {
    var selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        alert('Thank you for your answer: ' + selectedAnswer.value);
        // Logic to handle the answer can be added here
    } else {
        alert('Please select an answer.');
    }
}

function returnToMain() {
    // Reset background image to the original one
    var imageContainer = document.getElementById('imageContainer');
    imageContainer.style.backgroundImage = 'url("task3/Interactive quests - background.png")'; // Replace background image

    document.getElementById('question-content').style.display = 'none';
    document.getElementById('image-content').style.display = 'block';
}

// Get the image container element
var imageContainer = document.getElementById('imageContainer');