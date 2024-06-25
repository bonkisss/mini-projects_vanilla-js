let cells = document.querySelectorAll('.field td');
let restartButton = document.querySelector('.restart');
let winner = document.querySelector('.winner');
start(cells);

function start(cells) {
    let i = 0;
	let gameOver = false;

	cells.forEach(cell => {
		cell.classList.add('hover-effect');
		cell.addEventListener('mouseenter', handleMouseEnter);
		cell.addEventListener('mouseleave', handleMouseLeave);
	});

    for (let cell of cells) {
        cell.addEventListener('click', function step() {
			if (gameOver || this.textContent !== '') return;

            if (i % 2 == 0) {
				this.textContent = 'X';
				this.classList.add('x');
			}
			else {
				this.textContent = 'O';
				this.classList.add('o');
			}

			this.removeEventListener('click', step);
			this.classList.remove('hover-effect');

            const victoryCombo = isVictory(cells);
            if (victoryCombo) {
                highlightVictory(cells, victoryCombo);
				winner.textContent = `Winner: ${this.textContent}!`;
				gameOver = true;
            }
            else if (i == 8) {
                winner.textContent = 'Draw!';
				gameOver = true;
            }

            i++;
        });
    }
}

function isVictory(cells) {
	let combs = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (let comb of combs) {
		if (
			cells[comb[0]].textContent == cells[comb[1]].textContent &&
			cells[comb[1]].textContent == cells[comb[2]].textContent &&
			cells[comb[0]].textContent != ''
		) {
			return comb;
		}
	}
	
	return null;
}

function highlightVictory(cells, combo) {
	const winner = cells[combo[0]].textContent;
	const winClass = winner === 'X' ? 'win-x' : 'win-o'
	combo.forEach(index => {
        cells[index].classList.add(winClass);
    });
}

function removeHoverEffectFromAllCells() {
    cells.forEach(cell => {
        cell.classList.remove('hover-effect');
        cell.removeEventListener('mouseenter', handleMouseEnter);
        cell.removeEventListener('mouseleave', handleMouseLeave);
    });
}

restartButton.addEventListener('click', function() {
	cells.forEach(cell => {
		cell.textContent = '';
		cell.className = '';
	});

	winner.textContent = 'Winner:';

	start(cells);
})

function handleMouseEnter() {
	if (this.textContent === ''){
		this.style.backgroundColor = 'var(--hover)';
	}
}

function handleMouseLeave() {
	this.style.backgroundColor = '';
}