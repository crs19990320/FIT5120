function showInfo(iconId) {
    document.getElementById('quest1-image-content').style.display = 'none';
    document.getElementById('quest1-content').style.display = 'block';

    // Set the same background image for the image container
    var imageContainer = document.getElementById('quest1ImageContainer');
    imageContainer.style.backgroundImage = 'url("../../Media/Q1_animal.png")'; // Example path to common background image

    var slogan = '';
    var explanation = '';
    var iconSrc = '';

    switch (iconId) {
        case 'icon1':
            slogan = 'Birds Should Be Free';
            explanation = 'This bird is in a cage, but birds love to fly around in nature. Taking animals away from their homes can be bad for them and the places they live. It\'s important to let wildlife live freely and take care of their homes.';
            iconSrc = '../../Media/Q1_bird_cage.png';
            break;
        case 'icon2':
            slogan = 'Why Trees Matter';
            explanation = 'This tree stump shows where a tree once stood. Trees are super important because they help clean our air by taking in a bad air called carbon dioxide and giving out oxygen we breathe. When trees are cut down, it can make our planet warmer and less healthy.';
            iconSrc = '../../Media/Q1_wood_cut.png';
            break;
        case 'icon3':
            slogan = 'Save Every Drop!';
            explanation = 'Water is very special! Sometimes, fountains lose water when it evaporates or leaks. We can help save water by fixing leaks and using smart designs that don\'t waste water.';
            iconSrc = '../../Media/Q1_fountain.png';
            break;
        case 'icon4':
            slogan = 'Grass Helps the Earth';
            explanation = 'Grass and the dirt it grows in are very important. They help clean the air by storing a gas that can warm the Earth too much. We need to take care of the ground by not harming it, so it can continue to help us.';
            iconSrc = '../../Media/Q1_grass.png';
            break;
        case 'icon5':
            slogan = 'Cars and Clean Air';
            explanation = 'Cars like this one make gases when they use fuel, and these gases can warm our planet. We can help by using buses, trains, walking, or biking instead of always using a car.';
            iconSrc = '../../Media/Q1_car.png';
            break;
        case 'icon6':
            slogan = 'Campfire Care';
            explanation = 'Did you know burning wood in campfires or to clear land can make the air dirty? This dirty air can make us feel sick and warm our planet. Always remember to keep fires small and safe, and put them out when you\'re done!';
            iconSrc = '../../Media/Q1_fire.png';
            break;
        case 'icon7':
            slogan = 'Plastic Pollution';
            explanation = 'See these plastic bottles? They can stay around for a very long time without breaking down, and that\'s not good for our planet.We can help by recycling these bottles and using things that we can use again like water bottles.';
            iconSrc = '../../Media/Q1_plastic_bottle.png';
            break;
        case 'icon8':
            slogan = 'Keep It Tidy!';
            explanation = 'Oh no! This trash spilled out and can hurt animals and plants. Always throw your trash in the bin and recycle when you can. This helps keep our planet clean and safe.';
            iconSrc = '../../Media/Q1_bin.png';
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

    // Create slogan element
    var sloganTextElement = document.createElement('h3');
    sloganTextElement.textContent = slogan;
    sloganTextElement.style.fontSize = '20px'; // Example inline style for font size
    sloganTextElement.style.textAlign = 'left'; // Example inline style for text alignment
    sloganTextElement.style.position = 'relative'; // Example inline style for positioning
    sloganTextElement.style.top = '-90px'; // Example inline style for top position
    sloganTextElement.style.left = '180px'; // Example inline style for left position

    // Create explanation text element
    var explanationTextElement = document.createElement('p');
    explanationTextElement.textContent = explanation;
    explanationTextElement.style.fontSize = '20px'; // Example inline style for font size
    explanationTextElement.style.textAlign = 'left'; // Example inline style for text alignment
    explanationTextElement.style.position = 'relative'; // Example inline style for positioning
    explanationTextElement.style.top = '0px'; // Example inline style for top position
    explanationTextElement.style.left = '0px'; // Example inline style for left position


    //// Create answer options element
    //var answerOptionsElement = document.createElement('div');
    //answers.forEach(function(answer) {
    //    var label = document.createElement('label');
    //    var input = document.createElement('input');
    //    input.type = 'radio';
    //    input.name = 'answer';
    //    input.value = answer;
    //    label.appendChild(input);
    //    label.appendChild(document.createTextNode(answer));
    //    label.appendChild(document.createElement('br'));
    //    label.style.fontSize = '23px'; // Example inline style for font size
    //    label.style.textAlign = 'left'; // Example inline style for text alignment
    //    label.style.position = 'relative'; // Example inline style for positioning
    //    label.style.top = '-60px'; // Example inline style for top position
    //    label.style.left = '0px'; // Example inline style for left position
    //    answerOptionsElement.appendChild(label);
    //});

    // Clear existing content and append elements to question container
    var questionContent = document.getElementById('quest1-content');
    questionContent.innerHTML = ''; // Clear existing content
    questionContent.appendChild(iconImg);

    var questionContainer = document.createElement('div');
    questionContainer.classList.add('question-container');
    questionContainer.appendChild(sloganTextElement);
    questionContainer.appendChild(explanationTextElement);
/*    questionContainer.appendChild(answerOptionsElement);*/
    questionContent.appendChild(questionContainer);


    //// Create feedback element
    //var feedbackElement = document.createElement('div');
    //feedbackElement.id = 'answer-feedback';
    //questionContent.appendChild(feedbackElement);

    //// Create an img element for the summit image
    //var summitButtonImage = document.createElement('img');
    //summitButtonImage.src = '../../Media/submit_button.png';
    //summitButtonImage.alt = 'Submit Answer';

    //// Adjust size and position of the summit button image
    //summitButtonImage.style.width = '400px'; // Set the width of the button
    //summitButtonImage.style.height = '200px'; // Set the height of the button
    //summitButtonImage.style.position = 'absolute'; // Set the position to absolute
    //summitButtonImage.style.top = '450px'; // Set the distance from the top of the container
    //summitButtonImage.style.left = '520px'; // Set the distance from the left of the container

    //// Attach click event listener to summit button image
    //summitButtonImage.addEventListener('click', function() {
    //    // Call answerQuestion function and pass the correct answer
    //    answerQuestion(correctAnswer);
    //});

    // Create back button image dynamically
    var backButtonImage = document.createElement('img');
    backButtonImage.src = '../../Media/close_tab.png'; // Set the source path of your back button image
    backButtonImage.alt = 'Back';
    backButtonImage.id = 'backButton';
    backButtonImage.addEventListener('click', returnToMain1); // Attach click event listener to returnToMain function

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
/*    buttonContainer.appendChild(summitButtonImage);*/
    buttonContainer.appendChild(backButtonImage);

    // Append the button container to the question content
    questionContent.appendChild(buttonContainer);

}

function returnToMain1() {
    // Reset background image to the original one
    var imageContainer = document.getElementById('quest1ImageContainer');
    imageContainer.style.backgroundImage = 'url("../../Media/Q1_background.png")'; // Replace background image

    document.getElementById('quest1-content').style.display = 'none';
    document.getElementById('quest1-image-content').style.display = 'block';
}
