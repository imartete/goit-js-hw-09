const formNode = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      shouldResolve
        ? resolve({ position, delay })
        : reject({ position, delay });
    }, delay);
  });
}

formNode.addEventListener('submit', event => {
  event.preventDefault();

  for (let i = 1; i <= formNode.elements.amount.value; i += 1) {
    const delay =
      parseInt(formNode.elements.delay.value) +
      parseInt(formNode.elements.step.value) * (i - 1);

    setTimeout(() => {
      createPromise(i, delay)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }, delay);
  }
});
