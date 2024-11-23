const elementsToFetch = [
    { url: 'html/headerMusic.html', elementId: 'header-container' },
    { url: 'html/songPlatforms.html', elementId: 'song-pl' },
    { url: 'html/fotLow.html', elementId: 'fotLow' },
    { url: 'html/linkPerf.html', elementId: 'linkPerf' }

];

elementsToFetch.forEach(item => {
    fetch(item.url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(item.elementId).innerHTML = data;
        })
        .catch(error => console.error(`Error loading ${item.elementId}:`, error));
});
