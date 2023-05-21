import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  firstDelay: document.querySelector("input[name='delay']"),
  delayStep: document.querySelector("input[name='step']"),
  amount: document.querySelector("input[name='amount']"),
  // submit should not be used if form is not sent to a server for processing
  createPromisesButton: document.querySelector('button[type=button]'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const delay = Number(refs.firstDelay.value);
  const step = Number(refs.delayStep.value);
  const amount = Number(refs.amount.value);

  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, i * step + delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }

  if (delay.value === '' || step.value === '' || amount.value === '') {
    return console.log('Please fill in all the fields!');
  }
  event.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
