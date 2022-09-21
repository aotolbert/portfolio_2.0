document.body.onload = addElement;

Element.prototype.appendAfter = function (element) {
  element.parentNode.insertBefore(this, element.nextSibling);
},false;

Element.prototype.appendBefore = function (element) {
  element.parentNode.insertBefore(this, element);
},false;



var getIndividualWorkItemData = () => {
    //Query for the data
    var data = [
        {
            artist:"John Doe",
            title: "title1",
            imageTitle: "art_along_the_bounderies.jpg",
            info: "Art Along the Bounderies",
            link: "../essays/art_along_the_bounderies.pdf"
        },
        {
            artist:"John Doe",
            title: "title2",
            imageTitle: "girl_with_a_pear_earring.jpg",
            info: '"Dust Storms in the Parallel Universe"',
            link: "../essays/dust_storms_in_the_parallel_universe.pdf"
        },
        {
            artist:"John Doe",
            title: "title3",
            imageTitle: "starry_night.jpg",
            info: '"Goodbye Georgia Blizzard"',
            link: "../essays/goodbye_georgia_blizzard.pdf"
        },
        {
            artist:"John Doe",
            title: "title4",
            imageTitle: "raymond_of_poitiers.jpg",
            info: '"High Art for New Millennium"',
            link: "../essays/high_art_for_new_millennium.pdf"
        },
        {
            artist:"John Doe",
            title: "title5",
            imageTitle: "mona_lisa.jpg",
            info: '"Images and Objects from Black Deep South"',
            link: "../essays/images_and_objects_from_black_deep_south.pdf"
        }
    ];

    return data;
}


var getCollectiveWorkItemData = () => {
    //Query for the data
    var data = [
        {
            artist:"John Doe",
            title: "title6",
            imageTitle: "weeping_woman.jpg",
            info: '"Ingrained Images and Outside Influences"',
            link: "../essays/ingrained_images_and_outside_influences.pdf"
        },
        {
            artist:"John Doe",
            title: "title7",
            imageTitle: "girl_with_a_pear_earring.jpg",
            info: '"James B. Lemming"',
            link: "../essays/james_b_lemming.pdf"
        },
        {
            artist:"John Doe",
            title: "title8",
            imageTitle: "starry_night.jpg",
            info: '"Look At That"',
            link: "../essays/look_at_that.pdf"
        },
        {
            artist:"John Doe",
            title: "title9",
            imageTitle: "weeping_woman.jpg",
            info: '"Paintbrush People and Bottlecap Thrones"',
            link: "../essays/ingrained_images_and_outside_influences.pdf"
        },
        {
            artist:"John Doe",
            title: "title10",
            imageTitle: "girl_with_a_pear_earring.jpg",
            info: '"Paradise before and After the Fall"',
            link: "../essays/james_b_lemming.pdf"
        },
        {
            artist:"John Doe",
            title: "title11",
            imageTitle: "starry_night.jpg",
            info: '"Revelations in Sleep Store and Wood"',
            link: "../essays/look_at_that.pdf"
        }
    ];

    return data;
}



function renderEssayPreviewDiv(essay) {

    var userAgent = window.navigator.userAgent;
    console.log(userAgent);

    // Alter the behavior to new tab preview of the essay for users on iPad or iPhone
    if ((userAgent.match(/iPad/i) || userAgent.match(/iPhone/i))) {
    var clickedDiv = document.getElementById(essay.title);

    // allItems.forEach.classList.remove('clickedForPreview');
    console.log()
        if(clickedDiv.classList.contains('clickedForPreview')) {
            clickedDiv.classList.remove('clickedForPreview');
            window.open(essay.link, '_blank');
        } else {
            var allItems = document.querySelectorAll('.workItem');
            allItems.forEach(clearClickedTag);
            function clearClickedTag(item, index) {
                item.classList.remove('clickedForPreview');
            }
            // The click acts as a hover and displays the preview the first time
            clickedDiv.classList.add('clickedForPreview');
        }

    } else {

        //Preview the div underneath the selected essay preview card
        var existingPreview = document.querySelector('.previewEssay');
        console.log(existingPreview);
        if(existingPreview) {
            var existingPreview = document.querySelector('.previewEssay').remove();
        }

        var newDiv = document.createElement("div"); 
        newDiv.classList.add('previewEssay');

        let button = document.createElement('button');
        button.classList.add('closePreviewEssay');
        button.innerText = "X";
        button.onclick = closePreview;
        newDiv.appendChild(button);
        
        var embed = document.createElement("embed"); 
        embed.src = essay.link;
        embed.type = "application/pdf";
        embed.width = "75%";
        embed.height = "75%";
        embed.style= "margin-right: auto; margin-left: auto;";
        newDiv.appendChild(embed);  

        // document.getElementsByTagName("body")[0].classList.add('stop-scrolling');
        newDiv.appendAfter(document.querySelector(`#${essay.title}`));

        var oldDiv = document.querySelector('.previewEssay');
        oldDiv.classList.add("expand");
    }



}

function addElement () { 

    var workItems = getIndividualWorkItemData();

    console.log(workItems);

    workItems.forEach(item => {
        // create a new div element 
        let newDiv = buildWorkItemDiv(item);
        // add the newly created element and its content into the DOM 
        document.getElementById('individualWorkItems').appendChild(newDiv);

        // document.querySelector('#collectiveWorkItems').appendChild(newDiv);
    });

    var collectiveWorkItems = getCollectiveWorkItemData();

    console.log(collectiveWorkItems);

    collectiveWorkItems.forEach(collectiveItem => {
        // create a new div element 
        let newDiv = buildWorkItemDiv(collectiveItem);
        // add the newly created element and its content into the DOM 
        document.getElementById('collectiveWorkItems').appendChild(newDiv);

        // document.querySelector('#collectiveWorkItems').appendChild(newDiv);
    });


}

function buildWorkItemDiv(item) {
    var newDiv = document.createElement("div"); 
    newDiv.id = item.title;
    newDiv.classList.add('workItem');

    var image = document.createElement("img"); 
    image.classList.add('workItemImage');
    image.src = `../images/${item.imageTitle}`;


    var blurb = document.createElement("div"); 
    blurb.classList.add('workItemBlurb');
    blurb.classList.add('invisibleBlurb');

    var textDiv = document.createElement('div');
    textDiv.classList.add('essayBlurbText');
    var text = document.createTextNode(item.info);
    textDiv.appendChild(text);
    blurb.appendChild(textDiv);


    var instructionDiv = document.createElement('p');
    instructionDiv.classList.add('previewInstructions');

    var instructions = document.createTextNode('"Click to Preview"');
    instructionDiv.appendChild(instructions);

    blurb.appendChild(instructionDiv);

    newDiv.appendChild(blurb);  
    newDiv.appendChild(image);

    newDiv.addEventListener('click', function(){renderEssayPreviewDiv(item)}, false);
    return newDiv;
}

function closePreview() {
    console.log('closePreview() was clicked');
    document.querySelector('.previewEssay').remove()
}

