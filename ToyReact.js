
class ElementWrapper{
    constructor(type){
        this.root = document.createElement(type);
    }
    setAttribute(name,value){
        this.root.setAttribute(name, value);
    }
    appendChild(vChild){
        vChild.mountTo(this.root);
    }
    mountTo(parent) {
        parent.appendChild(this.root);
    }
}

class TextWrapper{

    constructor(text){
        this.root = document.createTextNode(text);
    }

    mountTo(parent){
        parent.appendChild(this.root);
    }
}

export class Component{
    constructor(){
        this.children = []
    }
    setAttribute(name, value){
        this[name] = value;
    }
    mountTo(parent){
        let vdom = this.render();
        vdom.mountTo(parent)
    }
    appendChild(vChild){
        this.children.push(child)
    }
}

export let ToyReact = {
    createElement(type, attributes, ...children){

        let element;
        if(typeof type === 'string'){
            element = new ElementWrapper(type)
        }else{
            element = new type

        }
        for (let name in attributes) {
            element.setAttribute(name,attributes[name])
        }

        let insertChildern = (children) => {

            for (let child of children) {
                if(typeof child === Object && child instanceof Array){
                    insertChildern(child)
                }else{
                    if ( (!child instanceof Component)  && 
                         (!child instanceof ElementWrapper) &&
                         (!child instanceof ElementWrapper))
                        child = String(child)
                    if (typeof child === "string") {
                        child = new TextWrapper(type)
                    }

                    element.appendChild(child)
                }
            }

        }

        return element
    },
    render(vdom, element, ){
        vdom.mountTo(element);
    },
};