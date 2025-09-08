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
});