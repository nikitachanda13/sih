import gsap from "https://esm.sh/gsap";
import SplitText from "https://esm.sh/gsap/SplitText";

gsap.registerPlugin(SplitText);
 
document.fonts.ready.then(() => {
    const isHomePage = document.querySelector(".preloader-progress");
    function createSplitTexts(elements){
        const splits = {};
        elements.forEach(({key,selector,type}) =>{
            const config = {
                type, mask:type
            };
            if( type == "chars")config.charsClass ="char";
            if( type == "lines")config.linesClass ="lines"; // Corrected from charsClass
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

if (isHomePage) {
    gsap.set([splits.logoChars.chars], {x:"100%"});
}
gsap.set(
    [
        splits.headerChars.chars,
        splits.heroFooterH3.lines,
        splits.heroFooterP.lines,
        splits.btnLabels.lines,
    ],
    {
        y:"100%"
    }
);
if (isHomePage && splits.footerLines) {
    gsap.set(splits.footerLines.lines, { y: "100%" });
}

gsap.set(".btn-icon",{clipPath: "circle(0% at 50% 50%)"});
gsap.set(".btn",{ scale:0});

function animateProgress(duration=4){
    const t1=gsap.timeline();
    const counterSteps = 5;
    let currentProgress =0;
    for (let i=0; i<counterSteps; i++){
        const finalStep = i === counterSteps - 1;
        const targetProgress = finalStep ? 1:
        Math.min(currentProgress + Math.random() * 0.3+0.1, 0.9);
        currentProgress = targetProgress;


        t1.to (".preloader-progress-bar", {
             scaleX: targetProgress,
            duration:duration/counterSteps,
            ease: "power2.out",
        });
        }
        return t1;
    };

    const t1 = gsap.timeline({ delay: isHomePage ? 0.5 : 0 });

    if (isHomePage) {
        t1.to(splits.logoChars.chars, {
            x: "0%",
            stagger: 0.05,
            duration: 1,
            ease: "power4.inOut",
        }).to(
            splits.footerLines.lines,
            {
                y: "0%",
                stagger: 0.1,
                duration: 1,
                ease: "power4.inOut",
            },
            "0.25"
        )
        .add(animateProgress(), "<")
        .set(".preloader-progress", { backgroundColor: "var(--base-300)" })
        .to(
            splits.logoChars.chars,
            {
                x: "-100%",
                stagger: 0.05,
                duration: 1,
                ease: "power4.inOut",
            },
            "-=0.5"
        )
        .to(
            splits.footerLines.lines,
            {
                y: "-100%",
                stagger: 0.1,
                duration: 1,
                ease: "power4.inOut",
            },
            "<"
        )
        .to(
            ".preloader-progress",
            {
                opacity: 0,
                duration: 0.5,
                ease: "power3.out"
            },
            "-=0.25"
        )
        .to(
            ".preloader-mask",
            {
                scale: 5,
                duration: 2.5,
                ease: "power3.out",
            },
            "<"
        )
        .to(
            ".hero-img",
            {
                scale: 1,
                duration: 1.5,
                ease: "power3.out",
            },
            "<"
        );
    } else {
        gsap.set(".hero-img", { scale: 1 });
    }

    // Common animations for all pages
    t1.to(splits.headerChars.chars,
    {
        y:0,
        stagger:0.05,
        duration:1,
        ease:"power4.out",
    }, isHomePage ? "-=2" : ">").to(
        [splits.heroFooterH3.lines, splits.heroFooterP.lines],
        {
            y:0,
            stagger:0.1,
            duration:1,
            ease:"power4.out",
        },
        "-=1.5"
    )
.to(
    ".btn",
    {
        scale:1,
        duration:1,
        ease:"power4.out",
    },
    "<"
)
.to(".btn-icon", {
    clipPath:"circle(100% at 50% 50%)",
    duration:1,
    ease:"power2.out",
}, "-=0.75")
.to(splits.btnLabels.lines, {
    y: 0,
    duration: 1,
    ease: "power4.out",
}, "<");

t1.to(
".menu-container",
{
    autoAlpha: 1, // Fades in and sets visibility to visible
    duration: 1,
    ease: "power4.out",
}, "-=1.5" // Start at the same time as the hero footer text
);
    // Drawer Menu Logic for the main menu
    const menuContainer = document.querySelector(".menu-container");
    const drawerMenu = document.querySelector(".drawer-menu");

    if (menuContainer && drawerMenu) {
        menuContainer.addEventListener("mouseenter", () => {
            // Animate the drawer to its full width and fade it in
            gsap.to(drawerMenu, { 
                width: "auto", // Let it take the space it needs
                autoAlpha: 1, // Fades in and sets visibility
                duration: 0.4, 
                ease: "power2.out",
                // Add padding for spacing
                paddingLeft: "1.5rem",
                paddingRight: "1.5rem"
            });
        });

        menuContainer.addEventListener("mouseleave", () => {
            // Reverse the animation
            gsap.to(drawerMenu, { 
                width: 0, 
                autoAlpha: 0,
                duration: 0.4, 
                ease: "power2.in",
                padding: 0 // Remove padding
            });
        });
    }

    // Animate in the contact button container
    t1.to(
        ".btn-container",
        {
            autoAlpha: 1,
            duration: 1,
            ease: "power4.out",
        }, "<");
});