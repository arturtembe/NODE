
/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr=ScrollReveal({
    origin:'top',
    distance:'60px',
    duration:2500,
    delay:300,
    reset:true, //Animation repeat
});

sr.reveal(`.footer__container`);
sr.reveal(`.habilidade__card,.card-item,.article-item,
.findme,.box-form-contact`, {interval:100});
