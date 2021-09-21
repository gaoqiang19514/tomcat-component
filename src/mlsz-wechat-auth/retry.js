const RETRY_COUNT = 'retryCount';
const RETRY_COUNT_NUMBER = 1;

function getRetryCount() {
  const tryCountStr = sessionStorage.getItem(RETRY_COUNT);

  if (tryCountStr === null) {
    sessionStorage.setItem(RETRY_COUNT, RETRY_COUNT_NUMBER);
    return RETRY_COUNT_NUMBER;
  }

  return Number(tryCountStr);
}

export function updateRetryCount() {
  const retryCount = getRetryCount();
  sessionStorage.setItem(RETRY_COUNT, retryCount - 1);
}

export function hasRetryChance() {
  return !!getRetryCount();
}

export function clearRetryCount() {
  sessionStorage.removeItem(RETRY_COUNT);
}
