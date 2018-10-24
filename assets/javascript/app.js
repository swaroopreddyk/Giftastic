$(document).ready(() => {
    var transformerArray = ["optimus prime", "bumble bee", "megatron", "iron hide","starscream","frenzy","blackout"];
    var apiKey = "QZ1jQcmXzBq2MNAWVrKrvKondiM3XpJD";
    var controller = new ScrollMagic.Controller();

    $('#addModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        // var recipient = button.data('whatever') 
        var modal = $(this)
        // modal.find('.modal-body input').val(recipient)
    })

    //What to do when a new transformer is added
    $('#addButton').on('click', () => {
        var transformer = $("#transformer-name").val().trim();
        if (transformer == "") {
            //Do Nothing
        } else {
            transformerArray.push(transformer);
        }
        renderButtons();
        //Hide the input modal once we pushed the transformer into array
        $('#addModal').hide();
    })

    function displayTransformerInfo() {
        var movie = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + " transformers&limit=10&api_key=" + apiKey;
        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            let results = response.data;
            displayGifs(results);
        });
    }

    //Simulate the animation and still activity of Gifs
    $(document).on("click", ".image", function () {
        var state = $(this).data("state");
        if (state === "still") {
            $(this).attr("src", $(this).data("animate"));
            $(this).data("state", "animate");
        } else {
            $(this).attr("src", $(this).data("still"));
            $(this).data('state', "still");
        }
    });

    const displayGifs = (results) => {
        $("#gifs-view").empty();
        if (results == '') {
            alert("The enetered transformer is not a transformer!")
        }
        // Looping through each result item
        results.forEach((gifObject, index) => {
            console.log(gifObject);
            var showDiv = $("<div>");
            var showImage = $("<img>");
            var downloadImage = $("<a>")
            showImage.attr("src", gifObject.images.fixed_height_still.url);
            showImage.attr("data-still", gifObject.images.fixed_height_still.url);
            showImage.attr("data-animate", gifObject.images.fixed_height.url);
            showImage.attr("data-state", "still");
            showImage.attr("title", "Title for the Image is: " + gifObject.title);
            showImage.addClass("image");
            showDiv.append(showImage);

            var showRating = $("<p>").text("Rating " + gifObject.rating);
            showDiv.append(showRating);

            downloadImage.attr("href", gifObject.images.fixed_height.url);
            downloadImage.addClass("btn btn-info");
            downloadImage.attr("download", "gifTastic_Download.gif");
            downloadImage.text("Download GIF");
            // showDiv.append(downloadImage);
            
            $("#gifs-view").prepend(showDiv);
        })
    }

    function renderButtons() {
        $("#buttons-view").empty();

        // Looping through the array of transformers
        transformerArray.forEach( (transformerMachine) => {
            var a = $("<button>");
            a.addClass("btn btn-light transformer-btn");
            a.attr("data-name", transformerMachine);
            a.text(transformerMachine.toUpperCase());
            $("#buttons-view").append(a);
        })
    }


    function initialize(){
        var scene = new ScrollMagic.Scene({triggerElement: "#myButton"});
        scene.setPin("#myButton");
        scene.addTo(controller);
        // Calling the renderButtons function to display the intial buttons
        renderButtons();
    }
    // Adding a click event listener to all elements with a class of "movie-btn"
    $(document).on("click", ".transformer-btn", displayTransformerInfo);

    
    initialize();
});