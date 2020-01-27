document.body.onload = addElement;

Element.prototype.appendAfter = function (element) {
  element.parentNode.insertBefore(this, element.nextSibling);
},false;

Element.prototype.appendBefore = function (element) {
  element.parentNode.insertBefore(this, element);
},false;

var getWorkItemData = () => {
    //Query for the data
    var data = [
        {
            title: "title1",
            imageTitle: "mona_lisa.jpg",
            info: "this is some text",
            link: "../essays/look_at_that.pdf"
        },
        {
            title: "title2",
            imageTitle: "girl_with_a_pear_earring.jpg",
            info: "this is some text",
            link: "../essays/look_at_that.pdf"
        },
        {
            title: "title3",
            imageTitle: "starry_night.jpg",
            info: "this is some text",
            link: "../essays/look_at_that.pdf"
        },
        {
            title: "title4",
            imageTitle: "raymond_of_poitiers.jpg",
            info: "this is some text",
            link: "../essays/look_at_that.pdf"
        },
        {
            title: "title5",
            imageTitle: "mona_lisa.jpg",
            info: "this is some text",
            link: "../essays/look_at_that.pdf"
        },
        {
            title: "title6",
            imageTitle: "weeping_woman.jpg",
            info: "this is some text",
            link: "../essays/look_at_that.pdf"
        },
        {
            title: "title7",
            imageTitle: "girl_with_a_pear_earring.jpg",
            info: "this is some text",
            link: "../essays/look_at_that.pdf"
        },
        {
            title: "title8",
            imageTitle: "starry_night.jpg",
            info: "this is some text",
            link: "../essays/look_at_that.pdf"
        }
    ];

    return data;
}

function renderEssayPreviewDiv(essay) {
    var newDiv = document.createElement("div"); 
    newDiv.classList.add('previewEssay');

    let button = document.createElement('button');
    button.classList.add('closePreviewEssay');
    newDiv.appendChild(button);
    
    var embed = document.createElement("embed"); 
    embed.src = essay.link;
    embed.type = "application/pdf";
    embed.width = "75%";
    embed.height = "75%";
    embed.style= "margin-top: 10%; margin-left: 10%;";
    newDiv.appendChild(embed);  

    // document.getElementsByTagName("body")[0].classList.add('stop-scrolling');
    newDiv.appendAfter(document.querySelector(`#${essay.title}`));

    var oldDiv = document.querySelector('.previewEssay');
    oldDiv.classList.add("expand");


}

function addElement () { 

    var workItems = getWorkItemData();

    console.log(workItems);

    workItems.forEach(item => {
        // create a new div element 
        var newDiv = document.createElement("div"); 
        newDiv.id = item.title;
        newDiv.classList.add('workItem');

        var image = document.createElement("img"); 
        image.classList.add('workItemImage');
        image.src = `../images/${item.imageTitle}`;


        var blurb = document.createElement("div"); 
        blurb.classList.add('workItemBlurb');
        blurb.classList.add('invisibleBlurb');

        var text = document.createTextNode(item.info);
        blurb.appendChild(text);

        newDiv.appendChild(blurb);  
        newDiv.appendChild(image);

        newDiv.addEventListener('click', function(){renderEssayPreviewDiv(item)}, false);

        // add the newly created element and its content into the DOM 
        document.querySelector('.workItemsContainer').appendChild(newDiv);
    });

}