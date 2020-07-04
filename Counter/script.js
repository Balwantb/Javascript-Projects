var count = 0;

const value = document.querySelector('#value');
const btns = document.querySelectorAll(".btn");

btns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
        const styles = e.currentTarget.classList;
        if (styles.contains("decrease")) {
            count--;
        }
        else if (styles.contains("increase")) {
            count++;
        }
        else {
            count = 0;
        }
        if (count > 0) {
            value.style.color = "green";
        }
        else if (count < 0) {
            value.style.color = "red";
        }
        if (count === 0) {
            value.style.color = "#222";
        }
        value.textContent = count;
    })
})

// const increaseNumber = document.querySelector('.increase');
// const decreseNumber = document.querySelector('.decrease');
// const resetNumber = document.querySelector('.reset');

// increaseNumber.addEventListener('click', function
//     () {
//     count++;
//     value.textContent = count;
//     console.log(count);
// })

// decreseNumber.addEventListener('click', function
//     () {
//     count--;
//     value.textContent = count;
//     console.log(count);
// })

// resetNumber.addEventListener('click', function
//     () {
//     count = 0;
//     value.textContent = count;
//     console.log(count);
// })

