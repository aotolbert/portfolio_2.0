document.body.onload = addElement;

var getWorkItemData = () => {
    //Query for the data
    var data = [
        {
            title: "title1",
            imageTitle: "mona_lisa.jpg",
            info: "this is some text",
            link: "/document.location"
        },
        {
            title: "title1",
            imageTitle: "girl_with_a_pear_earring.jpg",
            info: "this is some text",
            link: "/document.location"
        },
        {
            title: "title",
            imageTitle: "starry_night.jpg",
            info: "this is some text",
            link: "/document.location"
        },
        {
            title: "title1",
            imageTitle: "raymond_of_poitiers.jpg",
            info: "this is some text",
            link: "/document.location"
        },
        {
            title: "title1",
            imageTitle: "mona_lisa.jpg",
            info: "this is some text",
            link: "/document.location"
        },
        {
            title: "title",
            imageTitle: "weeping_woman.jpg",
            info: "this is some text",
            link: "/document.location"
        },
        {
            title: "title1",
            imageTitle: "girl_with_a_pear_earring.jpg",
            info: "this is some text",
            link: "/document.location"
        },
        {
            title: "title1",
            imageTitle: "starry_night.jpg",
            info: "this is some text",
            link: "/document.location"
        }
    ];

    return data;
}

function addElement () { 

    var workItems = getWorkItemData();

    console.log(workItems);

    workItems.forEach(item => {
        // create a new div element 
        var newDiv = document.createElement("div"); 
        newDiv.classList.add('workItem');

        var image = document.createElement("img"); 
        image.classList.add('workItemImage');
        image.src = `../images/${item.imageTitle}`;

        // and give it some content 
        var newContent = document.createTextNode(item.imageTitle); 
        // add the text node to the newly created div
        newDiv.appendChild(newContent);  
        newDiv.appendChild(image);

        // add the newly created element and its content into the DOM 
        document.querySelector('.workItemsContainer').appendChild(newDiv);
    });

}