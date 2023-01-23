/* eslint-disable no-restricted-globals,prefer-const,no-plusplus,func-names */
(function () {
  let $momentum;

  function createWorker() {
    const containerFunction = function () {
      const idMap = {};

      self.onmessage = function (e) {
        if (e.data.type === 'setInterval') {
          idMap[e.data.id] = setInterval(() => {
            self.postMessage({
              type: 'fire',
              id: e.data.id,
            });
          }, e.data.delay);
        } else if (e.data.type === 'clearInterval') {
          clearInterval(idMap[e.data.id]);
          delete idMap[e.data.id];
        } else if (e.data.type === 'setTimeout') {
          idMap[e.data.id] = setTimeout(() => {
            self.postMessage({
              type: 'fire',
              id: e.data.id,
            });
            // remove reference to this timeout after is finished
            delete idMap[e.data.id];
          }, e.data.delay);
        } else if (e.data.type === 'clearCallback') {
          clearTimeout(idMap[e.data.id]);
          delete idMap[e.data.id];
        }
      };
    };

    return new Worker(URL.createObjectURL(new Blob([
      '(',
      containerFunction.toString(),
      ')();',
    ], { type: 'application/javascript' })));
  }

  $momentum = {
    worker: createWorker(),
    idToCallback: {},
    currentId: 0,
  };

  function generateId() {
    return $momentum.currentId++;
  }

  function patchedSetInterval(callback, delay) {
    const intervalId = generateId();

    $momentum.idToCallback[intervalId] = callback;
    $momentum.worker.postMessage({
      type: 'setInterval',
      delay,
      id: intervalId,
    });
    return intervalId;
  }

  function patchedClearInterval(intervalId) {
    $momentum.worker.postMessage({
      type: 'clearInterval',
      id: intervalId,
    });

    delete $momentum.idToCallback[intervalId];
  }

  function patchedSetTimeout(callback, delay) {
    const intervalId = generateId();

    $momentum.idToCallback[intervalId] = function () {
      callback();
      delete $momentum.idToCallback[intervalId];
    };

    $momentum.worker.postMessage({
      type: 'setTimeout',
      delay,
      id: intervalId,
    });
    return intervalId;
  }

  function patchedClearTimeout(intervalId) {
    $momentum.worker.postMessage({
      type: 'clearInterval',
      id: intervalId,
    });

    delete $momentum.idToCallback[intervalId];
  }

  $momentum.worker.onmessage = function (e) {
    if (e.data.type === 'fire') {
      $momentum.idToCallback[e.data.id]();
    }
  };

  window.$momentum = $momentum;

  window.setInterval = patchedSetInterval;
  window.clearInterval = patchedClearInterval;
  window.setTimeout = patchedSetTimeout;
  window.clearTimeout = patchedClearTimeout;
}());
