export class Selectors {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);
        this.elName = document.getElementById(`name-${name}`);
        this.elImg = document.getElementById(`img-${name}`);
    }
}

export class Pokemon extends Selectors {
    constructor({ name, hp, selectors, attacks = [], img }) {
        super(selectors);
        this.name = name;
        this.defaultHP = hp;
        this.damageHP = hp;
        this.attacks = attacks;
        this.img = img;
        
        this.renderHP();
        this.renderImg();
    }

    renderHPLife = () => {
        this.elHP.innerText = `${this.damageHP} / ${this.defaultHP}`;
    }

    renderProgressbar = () => {
        const percent = (this.damageHP * 100) / this.defaultHP;
        this.elProgressbar.style.width = percent + '%';
        
        this.elProgressbar.classList.remove('low', 'critical');
        if (percent < 20) {
            this.elProgressbar.classList.add('critical');
        } else if (percent < 50) {
            this.elProgressbar.classList.add('low');
        }
    }

    renderImg = () => {
        if (this.elImg) {
            this.elImg.src = this.img;
        }
    }

    render = () => {
        this.renderHPLife();
        this.renderProgressbar();
    }

    renderHP = () => {
        this.renderHPLife();
        this.renderProgressbar();
    }

    changeHP = (count, cb) => {
        this.damageHP -= count;

        if (this.damageHP <= 0) {
            this.damageHP = 0;
        }

        this.render();
        
        if (typeof cb === 'function') {
            cb();
        }
    }
}