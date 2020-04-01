$(".send").click(function(){
    // Display sidebar containing results
    $(".sidebar").removeClass("hidden")
    $("body").animate({"margin-right": "400px"}, 1000)
    $(".sidebar").addClass("slideInRight animated")

    // Reset .results when .send is clicked
    if($(".results iframe").length >= 0) {
        $(".results").empty()
    }

    // Get the input of all input fields
    let songs = []
    let number = $(".userInput textarea").length;
    for(let i = 1; i <= number; i++){
        let input = $(".input" + i).val()
        let split = input.split("\n")
        songs.push(split)
    }

    // Merge the songs array into one array containing all songs
    songs = [].concat.apply([], songs)

    // Search through the songs array and only keep the songs that appear multiple times
    let common = songs.reduce(function(acc, el, i, arr) {
        if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el); return acc;
      }, []);
    
    // Append to hidden textarea to let people copy/paste later  
    common.forEach(song => {
        $(".clipboard").append(song, "\n")
    });

    // Insert "embed" in url to let people view results
    let embedSongs = []
    for(let i = 0; i < common.length; i++){
        embedSongs.push(common[i].replace("/track/", "/embed/track/"))
    }

    // Check to see wether they have no songs in common.
    if(embedSongs.length === 0){
        let p = document.createElement("p");
        p.innerHTML = "No songs in common. Try another playlist.";
        p.setAttribute("class", "noSongs")
        $(".results").append(p)
    }

    // Print the songs that are in common
    for(let i = 0; i < embedSongs.length; i++){
        let iframe = document.createElement("iframe")
        iframe.setAttribute("src", embedSongs[i])
        iframe.setAttribute("height", "80px")
        iframe.setAttribute("width", "300px")
        $(".results").append(iframe)
    }
})


// Client side validation of input fields on 'blur'
$(document).on('blur',".userInput textarea", function() {
    $(this).slideUp(function(){
        $(this).siblings().toggle()
    })
});

// Make the textarea toggle-able
$(document).on('click',".success", function() {
    $(this).toggle()
    $(this).siblings("textarea").slideDown()
});



// Number of static input fields
let counter = 2;

// Allow people to add another input field... messy, I know.
$(".addInput").click(function(){
    counter++

    let wrapper = document.createElement("div")
    wrapper.setAttribute("class", "inputwrapper")

    let success = document.createElement("div")
    success.setAttribute("class", "success hidden")

    let img = document.createElement("img")
    img.setAttribute("src", "/images/checkmark.png")
    img.setAttribute("class", "successImg")

    let span = document.createElement("span")
    span.innerText = "Playlist added successfully!"

    success.append(img, span)

    let textarea = document.createElement("textarea")
    textarea.setAttribute("class", "input" + counter)
    textarea.setAttribute("placeholder", "Insert a playlist here")
    textarea.setAttribute("spellcheck", "false")

    wrapper.append(success, textarea)
    $(".userInput").append(wrapper)
})


// Make guides available alongside correct image
$(".guide").click(function(){
    $(".step").slideUp()
    $(this).children(".step").slideToggle();

    // Get the step number and find the correct image
    let number = $(this).children("h2").text().replace("Step", "") -1
    $(".tutImages").children().hide()
    $(".tutImages").children().eq(number).toggle()
})


// Copy textarea to clipboard to allow easy playlist creation
$(".makePlaylist").click(function(){
    let copyText = $(".clipboard")

    /* Select the text field */
    copyText.select();

    /* Copy the text inside the text field */
    document.execCommand("copy");
})

// Modal popup from W3schools. cbb...
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
$(".makePlaylist").click(function(){
    modal.style.display = "block";
})

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}