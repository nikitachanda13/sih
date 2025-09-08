import gsap from "gsap";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(SplitText);
 

document.fonts.ready.then(() => {
    function createSplitTexts(elements){
        const splits = {};
        elements.forEach(({key,selector,type}) =>{
            const config = {
                type, mask:type
            };
            if( type == "chars")config.charsClass ="char";
            if( type == "lines")config.charsClass ="lines";
            splits[key]=SplitText.create(selector, config);
        }
    );
    return splits;
    }
const splitElements =[


{
    key:"logoChars", selector: ".preloader-logo h1", type: "chars"
},
{
     key:"footerLines", selector: ".preloader-footer p", type: "lines"
},
{
     key:"headerChars", selector: ".header h1", type: "chars"
},
{
     key:"heroFooterH3", selector: ".hero-footer h3", type: "lines"
},
{
     key:"heroFooterP", selector: ".hero-footer p", type: "lines"
},
{
     key:"btnLabels", selector: ".btn-label span", type: "lines"
}
];
const splits = createSplitTexts(splitElements);
gsap.selector([splits.logoChars.chars], {x:100%});
gsap.set(
    [
        splits.footerLines.lines,
        splits.headerChars.chars,
        splits.heroFooterH3.lines,
        splits.heroFooterH3.lines,
        splits.btnLabels.lines,
    ],
    {
        y:"100%"
    }
);
gsap.set(".btn-icon",{clipPath: "circle(0% at 50% 50%"});
gsap.set(".btn",{ scale:0});

function animateProgress(duration=4){
    const t1=gsap.timeline();
    const counterSteps = 5;
    let currentProgress =0;
    for (let i=0; i<counterSteps; i++){
        const finalStep = i === counterSteps - 1;
        const targetProgress = finalStep ? 1
        Math.min(currentProgress + Math.random() * 0.3+0.1, 0.9);
        currentProgress = targetProgress;


        t1.to (".preloader-progress-bar", {
             scaleX: targetProgress,
            duration:duration/counterSteps,
            ease: "power2.out",
        });
        }
         
    }
    return t1;
}
const  t1= gsap.timeline({delay:0.5});
t1.to(splits.logoChars.char,{
    x:"0%"
})



});