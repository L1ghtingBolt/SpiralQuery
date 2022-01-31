export class ElementCollection extends Array {
    ready(cb) {
        const isReady = this.some(e => {
            return e; 
        })
        if (isReady){
            cb();
        }
        else{
            this.on('DOMContentLoaded', cb);
        }
        return this
    }
    on(event, cborsel, cb) {
        if(typeof cborsel == 'function') {
            this.forEach(e => e.addEventListener(event, cborsel))
        }
        else {
            this.forEach(el => {
                el.addEventListener(event, e => {
                    if(e.target.matches(cborsel))
                        cb(e)
                })
            })
        }
        return this
    }
    find(sel) {
        var nodes = new ElementCollection(...this.map(e => e.querySelectorAll(sel)[0])).flat(49349234234234);
        return nodes; 
    }
    off(event, selectorOrEvent, eventf) {
        if(typeof selectorOrEvent == 'function'){
            this.forEach(e => {
                e.removeEventListener(event, selectorOrEvent)
            })
        }
        else {
            this.forEach(e => {
                e.removeEventListener(event, document.querySelector(selectorOrEvent), eventf);
            })
        }
        return this;
    }
    next() {
        return new ElementChild(this.map(e => e.nextElementSibling).filter(e => e != null))
    }
    child(c) {
        let r;
        this.forEach(e => {
            r = e.children[c] ?? e.firstElementChild;
        })
        return r;
    }
    nodeChild(c) {
        let r;
        this.forEach(e => {
            r = e.childNodes[c] ?? e.firstChild;
        })
        return r;
    }
    hasClass(c) {
        let r;
        if(this.length == 1){
            r = this[0].classList.contains(c)
        }
        else {
            r = [];
            this.forEach(e => {
                r.push(e.classList.contains(c));
            })
        }
        return r;
    }
    children() {
        return new ElementCollection(...this.map(e => e.children));
    }
    first() {
        return this[0];
    }
    last() {
        return this[this.length - 1];
    }
    prev() {
        return new ElementChild(this.map(e => e.prevElementSibling).filter(e => e != null))
    }
    html(content) {
        if(content == undefined) {
            if(this.length == 1) {
                return this[0].innerText;
            }
            else {
                let r = [];
                this.forEach(e=> {
                    r.push(e.innerText);
                })

                return r;
            }
        }
        this.forEach(e => {
            e.innerHTML = content;
        })
        return this
    }
    text(content) {
        if(content == undefined) {
            if(this.length == 1) {
                return this[0].innerText;
            }
            else {
                let r = [];
                this.forEach(e=> {
                    r.push(e.innerText);
                })

                return r;
            }
        }
        this.forEach(e => {
            e.innerText = content;
        })
        return this;
    }
    attr(a, set) {
        if(set == undefined){
            return this[0].getAttribute(a);
        }
        else {
            this.forEach(e => {
                e.setAttribute(a, set);
            })
            return this;
        }
    }
    removeClass(className) {
        this.forEach(e => e.classList.remove(className));
        return this;
    }

    addClass(className) {
        this.forEach(e => e.classList.add(className));
        return this;
    }
    toggleClass(className) {
        this.forEach(e => e.classList.toggle(className));
        return this;
    }
    css(sel, val) {
        let camelProp;
        if(sel != undefined) {
            camelProp = sel.replace(/(-[a-z])/, g => {
                return g.replace('-', '').toUpperCase();
            })
        }
        if(val != undefined) {
            this.forEach(e => e.style[camelProp] = val);
            return this;
        }
        if(this.length == 1) {
            if(sel == undefined) {
                return this[0].style;
            }
            return this[0].style[camelProp];
        }
        else {
            let r = []
            if(sel == undefined) {
                this.forEach(e => {
                    r.push(e.style);
                })
                return r;
            }
            this.forEach(e => {
                r.push(e.style[camelProp]);
            })
            return r;
        } 
    }

    value(set) {
        if(set !== undefined){
            this.forEach(e => e.value = set)
            return this
        }
        else if(this.length === 1) {
            return this[0].value;
        }
        else {
            let r = [];
            this.forEach(e => {
                r.push(e.value);
                return r;
            })
        }
    }

    append(e) {
        let ele = [];
        e.forEach(el => {
            ele.push(el)
        })
        this.forEach(el => {
            ele.forEach(elem => {
                el.appendChild(elem)
            })
        })
        return this;
    }

    add(...e) {
        let elcol = [];
        e.forEach(el => {
            this.forEach(ele => {
                let cEl = document.createElement(el);
                elcol.push(cEl)
            })
        })
        return new ElementCollection(...elcol);
    }

    
}

window.timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.$ = (parameter) => {
    if (typeof parameter === 'string' || parameter instanceof String) {
        return new ElementCollection(...document.querySelectorAll(parameter));
    }
    else {
        return new ElementCollection(parameter)
    }
}