document.querySelector(".hamburger").addEventListener("click", () => {
    toggleHeader();
});


toggleHeader = () => {
    let selfEl = document.querySelector(".hamburger");
    if(document.querySelector(".header").classList.contains("animating")) {
        console.log("still animating")
        return;
    } else if(selfEl.classList.contains("is-active")) {
        selfEl.classList.remove("is-active");
        document.getElementsByTagName("BODY")[0].classList.remove("stop-scrolling");
        document.querySelector(".header-content").classList.add("avoid-clicks");
        document.querySelector(".header").classList.add("animating");
        document.querySelector(".header").classList.add("transformNavUp");
        document.querySelector(".menu-title").classList.add("titleFadeIn");
        document.querySelector(".menu-title").classList.remove("titleFadeOut");
        document.querySelector(".header").classList.remove("transformNavDown");
        document.querySelector(".header-content").classList.remove("reveal");
        document.querySelector(".header-content").classList.add("hide");
        document.querySelector(".transformNavUp").addEventListener("animationend", () => {
            console.log("tansformNavUp transition end was called");
            document.querySelector(".header").classList.remove("animating");
            document.querySelector(".transformNavUp").classList.add("header");
            document.querySelector(".transformNavUp").classList.add("header-compacted");
            document.querySelector(".transformNavUp").classList.remove("header-expanded");
            document.querySelector(".header-content").classList.remove("hide");
            document.querySelector(".header-content").classList.add("hidden");
            document.querySelector(".transformNavUp").removeEventListener("animationend", this);

        });
    } else {
        selfEl.classList.add("is-active");
        document.getElementsByTagName("BODY")[0].classList.add("stop-scrolling");
        document.querySelector(".header-content").classList.remove("avoid-clicks");
        document.querySelector(".header").classList.add("animating");
        document.querySelector(".header").classList.remove("transformNavUp");
        document.querySelector(".header").classList.add("transformNavDown");
        document.querySelector(".header").classList.remove("header-compacted");
        document.querySelector(".menu-title").classList.add("titleFadeOut");
        document.querySelector(".header-content").classList.add("reveal");
        document.querySelector(".header-content").classList.remove("hidden");
        document.querySelector(".transformNavDown").addEventListener("animationend", () => {
            console.log("tansformNavDown transition end was called");
            document.querySelector(".header").classList.remove("animating");
            document.querySelector(".header").classList.add("header-expanded");
            document.querySelector(".transformNavDown").removeEventListener("animationend", this);
            document.querySelector(".header").ontouchmove = (evt) => {
                console.log(evt);
            }
        });
    }
}
