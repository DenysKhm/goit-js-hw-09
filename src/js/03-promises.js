import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const delay = document.querySelector("[name='delay']");
const step = document.querySelector("[name='step']");
const amount = document.querySelector("[name='amount']");

form.addEventListener('submit', e => {
  e.preventDefault();

  let firstDelay = Number(delay.value);
  const delayStep = Number(step.value);

  for (let index = 1; index <= amount.value; index += 1) {
    createPromise(index, firstDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    firstDelay += delayStep;
  }

  form.reset();
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}
