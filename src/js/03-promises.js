import { Notify } from "notiflix/build/notiflix-notify-aio";

const refs = {
  firstDelay: document.querySelector("input[name='delay']"),
  delayStep: document.querySelector("input[name='step']"),
  amount: document.querySelector("input[name='amount']"),
  createPromisesButton: document.querySelector("button[type='submit']"),
};
refs.createPromisesButton.addEventListener("click", createPromise);

let delay = null;
let position = null;

function createPromise(position, delay) {
  delay = refs.firstDelay.value + refs.delayStep.value;
  position = refs.amount.value;
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    let interval = setInterval(() => {
      let counter = 0;
      if (shouldResolve) {
        resolve("yes");
        counter++;
      } else {
        reject("no");
        counter++;
      }
    }, delay);
    if (counter === position) {
      clearInterval(interval);
    }
  });
}
console.log({ position, delay });
createPromise()
  .then(({ position, delay }) => {
    Notify.info(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.info(`❌ Rejected promise ${position} in ${delay}ms`);
  });
