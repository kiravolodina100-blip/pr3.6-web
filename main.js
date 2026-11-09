import { Pokemon } from './pokemon.js';
import { random } from './utils.js';
import { pokemons } from './pokemons.js';

const logs = [
    '[ПЕРСОНАЖ №1] згадав щось важливе, але несподівано [ПЕРСОНАЖ №2], не тямлячи себе від переляку, вдарив у передпліччя ворога.',
    '[ПЕРСОНАЖ №1] поперхнулся, и за это [ПЕРСОНАЖ №2] с испугу приложил прямой удар коленом в лоб врага.',
    '[ПЕРСОНАЖ №1] забылся, но в это время наглый [ПЕРСОНАЖ №2], приняв волевое решение, неслышно подойдя сзади, ударил.',
    '[ПЕРСОНАЖ №1] пришел в себя, но неожиданно [ПЕРСОНАЖ №2] случайно нанес мощнейший удар.',
    '[ПЕРСОНАЖ №1] поперхнулся, но в это время [ПЕРСОНАЖ №2] нехотя раздробил кулаком противника.',
    '[ПЕРСОНАЖ №1] удивился, а [ПЕРСОНАЖ №2] пошатнувшись влепил подлый удар.',
    '[ПЕРСОНАЖ №1] высморкался, но неожиданно [ПЕРСОНАЖ №2] провел дробящий удар.',
    '[ПЕРСОНАЖ №1] пошатнулся, и внезапно наглый [ПЕРСОНАЖ №2] беспричинно ударил в ногу противника',
    '[ПЕРСОНАЖ №1] расстроился, как вдруг, неожиданно [ПЕРСОНАЖ №2] случайно влепил стопой в живот соперника.',
    '[ПЕРСОНАЖ №1] пытался что-то сказать, но вдруг, неожиданно [ПЕРСОНАЖ №2] со скуки, разбил бровь сопернику.'
];

const randomIndex1 = random(pokemons.length - 1);
let randomIndex2 = random(pokemons.length - 1);

while (randomIndex2 === randomIndex1) {
    randomIndex2 = random(pokemons.length - 1);
}

const player1 = new Pokemon({
    ...pokemons[randomIndex1],
    selectors: 'player-1'
});

const player2 = new Pokemon({
    ...pokemons[randomIndex2],
    selectors: 'player-2'
});

const $control = document.querySelector('.control');

function generateLog(first, second, damage) {
    const { name: name1 } = first;
    const { name: name2, damageHP, defaultHP } = second;

    const randomIndex = random(logs.length - 1);
    let text = logs[randomIndex]
        .replace('[ПЕРСОНАЖ №1]', name1)
        .replace('[ПЕРСОНАЖ №2]', name2);

    const logMessage = `${text} -${damage} [${damageHP}/${defaultHP}]`;

    const $p = document.createElement('p');
    $p.innerText = logMessage;
    
    const $logs = document.getElementById('logs');
    $logs.insertBefore($p, $logs.children[0]);
}

function disableAllButtons() {
    const buttons = document.querySelectorAll('.control .button');
    buttons.forEach(btn => btn.disabled = true);
}

player1.attacks.forEach(item => {
    const $btn = document.createElement('button');
    $btn.classList.add('button');
    $btn.innerText = `${item.name} (${item.maxCount})`;
    $control.appendChild($btn);

    let count = item.maxCount;

    $btn.addEventListener('click', () => {
        count--;
        if (count >= 0) {
            $btn.innerText = `${item.name} (${count})`;
        }

        if (count === 0) {
            $btn.disabled = true;
            $btn.innerText = `${item.name} (Вичерпано)`;
        }

        const damage = random(item.maxDamage, item.minDamage);
        player2.changeHP(damage, () => {
            generateLog(player1, player2, damage);
        });

        if (player2.damageHP === 0) {
            alert(`${player2.name} програв бій!`);
            disableAllButtons();
            return;
        }

        const enemyAttack = player2.attacks[random(player2.attacks.length - 1)];
        const enemyDamage = random(enemyAttack.maxDamage, enemyAttack.minDamage);
        
        player1.changeHP(enemyDamage, () => {
            generateLog(player2, player1, enemyDamage);
        });

        if (player1.damageHP === 0) {
            alert(`${player1.name} програв бій!`);
            disableAllButtons();
        }
    });
});
