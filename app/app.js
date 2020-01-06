console.log("I am an app");


let isInViewport = (elem) => {
    var bounding = elem.getBoundingClientRect();
    return (
        bounding.top <= (window.innerHeight || document.documentElement.clientHeight) && 
        bounding.bottom >= 0
    );
};


let leftImages = document.querySelectorAll('.mainImgLeftContainerBefore');
let rightImages = document.querySelectorAll('.mainImgRightContainerBefore');

window.addEventListener('scroll', (evt) => {
    leftImages.forEach(img => {
        if(isInViewport(img)) {
            console.log('Fading in the left image');
            img.classList.add('fadeInLeftImage');
            leftImages = document.querySelectorAll('.mainImgLeftContainerBefore');
            img.addEventListener('animationend', () => {
                img.classList.replace('mainImgLeftContainerBefore', 'mainImgLeftContainerAfter');

            })
        }
    });

    rightImages.forEach(image => {
        if(isInViewport(image)) {
            console.log('Fading in the right image');
            image.classList.add('fadeInRightImage');
            rightImages = document.querySelectorAll('.mainImgRightContainerBefore');
            image.addEventListener('animationend', () => {
                image.classList.replace('mainImgRightContainerBefore', 'mainImgRightContainerAfter');

            })
        }
    })
    

})




