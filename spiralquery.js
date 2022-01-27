class ElementCollection extends Array {
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

    next() {
        return this.map(e => e.nextElementSibling).filter(e => e != null)
    }

    prev() {
        return this.map(e => e.prevElementSibling).filter(e => e != null)
    }

    html(content) {
        this.forEach(e => {
            e.innerHTML = content;
        })
    }

    text(content) {
        this.forEach(e => {
            e.innerText = content;
        })
    }

    removeClass(className) {
        this.forEach(e => e.classlList.remove(className));
        return this;
    }

    addClass(className) {
        this.forEach(e => e.classList.add(className));
        return this;
    }

    css(sel, val) {
        const camelProp = sel.replace(/(-[a-z])/, g => {
            return g.replace('-', '').toUpperCase();
        })
        if(val != undefined) {
            this.forEach(e => e.style[camelProp] = val);
            return this;
        }
        if(sel == undefined) {
            this[0].style;
        }
        return this[0].style[camelProp];
    }

    value(value) {
        this.forEach(e => e.value = value)
        return this
    }
}

export function $(parameter) {
    if (typeof parameter === 'string' || parameter instanceof String) {
        return new ElementCollection(...document.querySelectorAll(parameter));
    }
    else {
        return new ElementCollection(parameter)
    }
}