var synth = window.speechSynthesis;
var textToSpeak = '';
var speakButton = document.getElementById('speak-button');
var speakAllButton = document.getElementById('speak-all-button');
var storyTextElement = document.getElementById('story-text');
var selectedStoriesListElement = document.getElementById('selected-stories-list');
var clearSelectionButton = document.getElementById('clear-selection-button');
var selectedStories = [];


function speakNow(text) {
    var utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
}

function updateSelectedStoriesList() {
    selectedStoriesListElement.innerHTML = '';
    selectedStories.forEach((story, index) => {
        var li = document.createElement('li');
        li.textContent = `Story ${index + 1}: ${story}`;
        selectedStoriesListElement.appendChild(li);
    });
}

function speakAllStories() {
    var allStories = selectedStories.join(' ');
    speakNow(allStories);
}


document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.clickable');

    images.forEach(image => {
        image.addEventListener('click', function() {
            const story = image.getAttribute('data-story');
            storyTextElement.textContent = story;
            textToSpeak = story;
            speakNow(textToSpeak);
            selectedStories.push(story);
            updateSelectedStoriesList();
        });
    });


    speakAllButton.onclick = function() {
        speakAllStories();
    }

    clearSelectionButton.onclick = function() {
        selectedStories = [];
        updateSelectedStoriesList();
    }
});
