/************** 
 * Nback *
 **************/


// store info about the experiment session:
let expName = 'nback';  // from the Builder filename that created this script
let expInfo = {
    'participant': '',
    'group': '1',
};
let PILOTING = util.getUrlParameters().has('__pilotToken');

// Start code blocks for 'Before Experiment'
// init psychoJS:
const psychoJS = new PsychoJS({
  debug: true
});

// open window:
psychoJS.openWindow({
  fullscr: true,
  color: new util.Color([0,0,0]),
  units: 'height',
  waitBlanking: true,
  backgroundImage: '',
  backgroundFit: 'none',
});
// schedule the experiment:
psychoJS.schedule(psychoJS.gui.DlgFromDict({
  dictionary: expInfo,
  title: expName
}));

const flowScheduler = new Scheduler(psychoJS);
const dialogCancelScheduler = new Scheduler(psychoJS);
psychoJS.scheduleCondition(function() { return (psychoJS.gui.dialogComponent.button === 'OK'); },flowScheduler, dialogCancelScheduler);

// flowScheduler gets run if the participants presses OK
flowScheduler.add(updateInfo); // add timeStamp
flowScheduler.add(experimentInit);
flowScheduler.add(instrRoutineBegin());
flowScheduler.add(instrRoutineEachFrame());
flowScheduler.add(instrRoutineEnd());
const trialsLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(trialsLoopBegin(trialsLoopScheduler));
flowScheduler.add(trialsLoopScheduler);
flowScheduler.add(trialsLoopEnd);



flowScheduler.add(thanksRoutineBegin());
flowScheduler.add(thanksRoutineEachFrame());
flowScheduler.add(thanksRoutineEnd());
flowScheduler.add(quitPsychoJS, 'Thank you for your patience.', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, 'Thank you for your patience.', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: [
    // resources:
  ]
});

psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.INFO);


var currentLoop;
var frameDur;
async function updateInfo() {
  currentLoop = psychoJS.experiment;  // right now there are no loops
  expInfo['date'] = util.MonotonicClock.getDateStr();  // add a simple timestamp
  expInfo['expName'] = expName;
  expInfo['psychopyVersion'] = '2025.1.1';
  expInfo['OS'] = window.navigator.platform;


  // store frame rate of monitor if we can measure it successfully
  expInfo['frameRate'] = psychoJS.window.getActualFrameRate();
  if (typeof expInfo['frameRate'] !== 'undefined')
    frameDur = 1.0 / Math.round(expInfo['frameRate']);
  else
    frameDur = 1.0 / 60.0; // couldn't get a reliable measure so guess

  // add info from the URL:
  util.addInfoFromUrl(expInfo);
  

  
  psychoJS.experiment.dataFileName = (("." + "/") + `data/${expInfo["participant"]}_${expName}_${expInfo["date"]}`);
  psychoJS.experiment.field_separator = '\t';


  return Scheduler.Event.NEXT;
}


var instrClock;
var text;
var key_stop;
var trialClock;
var stimul;
var key_resp;
var feedbClock;
var text_3;
var thanksClock;
var text_2;
var globalClock;
var routineTimer;
async function experimentInit() {
  // Initialize components for Routine "instr"
  instrClock = new util.Clock();
  text = new visual.TextStim({
    win: psychoJS.window,
    name: 'text',
    text: 'Вам необходимо нажать пробел если предьявляемый стимул предьявлялся за два стимула до этого стимула',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  key_stop = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "trial"
  trialClock = new util.Clock();
  // Run 'Begin Experiment' code from code
  // Begin Experiment - explicit globals
  //аналог рандом чойс из питона
  //window.randChoice — создаём глобальную переменную (функцию) в объекте window, чтобы она была доступна во всех частях эксперимента.
  //Function(arr) { ... } — объявление функции, которая принимает один аргумент arr (массив).
  //Math.floor округление
  //arr.length — длина массива.
  //arr[...] — доступ к элементу массива по индексу.
  window.randChoice = function(arr) { return arr[Math.floor(Math.random() * arr.length)]; };
  //создаем лист с тру и фолз 
  window.makeTargetList = function(nTrials, p) { return Array.from({length: nTrials}, () => Math.random() < p); };
  
  // Stimulus pools
  window.letters = ["A","E","I","O","U","P","Z","C","D","M"];
  window.numbers = ["1","2","3","4","5","6","7","8","9","10"];
  
  // Task params
  window.n = 2;
  window.number_trials = 30;
  window.targetProbability = 0.3;
  
  // Use a non-colliding name for counterbalance
  window.trialGroup = parseInt(expInfo["group"], 10) || 1; //, 10 преращает в число, две палочки или 1 группа по умолчанию
  //три равно строгая проверка на равенство ? : — тернарный оператор сокращение if else: если условие истинно, то window.letters, иначе window.numbers
  window.stimuli_list = (window.trialGroup === 1) ? window.letters : window.numbers; //если группа 1 буквы, если 2 цифры
  
  // Target schedule
  //let i = 0 — объявление переменной i.
  //i < window.n && i < window.targetList.length — условие: пока i меньше n и длины списка.
  //i++ — увеличиваем i на 1.
  //window.targetList[i] = false;  делаем первые n элементов нецелевыми 
  window.targetList = window.makeTargetList(window.number_trials, window.targetProbability);
  for (let i = 0; i < window.n && i < window.targetList.length; i++) {
    window.targetList[i] = false;
  }
  
  // State
  window.trialIndex = 0;
  window.presentedStimuli = [];
  window.feedbackMsg = "";
  window.thisStim = null;   // global current stimulus
  
  // Declare column names explicitly to ensure header row
  psychoJS.experiment.addData("stimulus_label", "");
  psychoJS.experiment.addData("is_target", "");
  psychoJS.experiment.addData("pressed_space", "");
  psychoJS.experiment.addData("first_rt_ms", "");
  psychoJS.experiment.addData("keys_pressed_json", "");
  psychoJS.experiment.addData("correctness_code", "");
  psychoJS.experiment.addData("feedback_text", "");
  
  
  
  stimul = new visual.TextStim({
    win: psychoJS.window,
    name: 'stimul',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('black'),  opacity: undefined,
    depth: -1.0 
  });
  
  key_resp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "feedb"
  feedbClock = new util.Clock();
  text_3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_3',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  // Initialize components for Routine "thanks"
  thanksClock = new util.Clock();
  text_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_2',
    text: 'Подождите пока данные загружаются',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}


var t;
var frameN;
var continueRoutine;
var routineForceEnded;
var instrMaxDurationReached;
var _key_stop_allKeys;
var instrMaxDuration;
var instrComponents;
function instrRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'instr' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // keep track of whether this Routine was forcibly ended
    routineForceEnded = false;
    instrClock.reset();
    routineTimer.reset();
    instrMaxDurationReached = false;
    // update component parameters for each repeat
    key_stop.keys = undefined;
    key_stop.rt = undefined;
    _key_stop_allKeys = [];
    instrMaxDuration = null
    // keep track of which components have finished
    instrComponents = [];
    instrComponents.push(text);
    instrComponents.push(key_stop);
    
    instrComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function instrRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'instr' ---
    // get current time
    t = instrClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text* updates
    if (t >= 0.0 && text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text.tStart = t;  // (not accounting for frame time here)
      text.frameNStart = frameN;  // exact frame index
      
      text.setAutoDraw(true);
    }
    
    
    // if text is active this frame...
    if (text.status === PsychoJS.Status.STARTED) {
    }
    
    
    // *key_stop* updates
    if (t >= 0.0 && key_stop.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_stop.tStart = t;  // (not accounting for frame time here)
      key_stop.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_stop.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_stop.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_stop.clearEvents(); });
    }
    
    // if key_stop is active this frame...
    if (key_stop.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_stop.getKeys({keyList: 'space', waitRelease: false});
      _key_stop_allKeys = _key_stop_allKeys.concat(theseKeys);
      if (_key_stop_allKeys.length > 0) {
        key_stop.keys = _key_stop_allKeys[_key_stop_allKeys.length - 1].name;  // just the last key pressed
        key_stop.rt = _key_stop_allKeys[_key_stop_allKeys.length - 1].rt;
        key_stop.duration = _key_stop_allKeys[_key_stop_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      routineForceEnded = true;
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    instrComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function instrRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'instr' ---
    instrComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    key_stop.stop();
    // the Routine "instr" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var trials;
function trialsLoopBegin(trialsLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    trials = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 30, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'trials'
    });
    psychoJS.experiment.addLoop(trials); // add the loop to the experiment
    currentLoop = trials;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    trials.forEach(function() {
      snapshot = trials.getSnapshot();
    
      trialsLoopScheduler.add(importConditions(snapshot));
      trialsLoopScheduler.add(trialRoutineBegin(snapshot));
      trialsLoopScheduler.add(trialRoutineEachFrame());
      trialsLoopScheduler.add(trialRoutineEnd(snapshot));
      trialsLoopScheduler.add(feedbRoutineBegin(snapshot));
      trialsLoopScheduler.add(feedbRoutineEachFrame());
      trialsLoopScheduler.add(feedbRoutineEnd(snapshot));
      trialsLoopScheduler.add(trialsLoopEndIteration(trialsLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function trialsLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(trials);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function trialsLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var trialMaxDurationReached;
var _key_resp_allKeys;
var trialMaxDuration;
var trialComponents;
function trialRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'trial' ---
    t = 0;
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // keep track of whether this Routine was forcibly ended
    routineForceEnded = false;
    trialClock.reset(routineTimer.getTime());
    routineTimer.add(2.000000);
    trialMaxDurationReached = false;
    // update component parameters for each repeat
    // Run 'Begin Routine' code from code
    // Begin Routine
    key_resp.keys = [];
    key_resp.rt = [];
    if (typeof key_resp.clearEvents === 'function') key_resp.clearEvents(); //очистить клавиатуру
    //проверка является ли таргет тру или фолз
    let target = Boolean(window.targetList[window.trialIndex]);
    //если таргет = тру повтори стимул который был н назад проб
    //&& — логическое "И".
    //.slice(-window.n)[0] — берём n стимул с конца
    if (target && window.presentedStimuli.length >= window.n) {
      window.thisStim = window.presentedStimuli.slice(-window.n)[0];
    } else { //если не таргет то выбираем случайный и проверяем что он не является идентичным n стимулу назад
      target = false;
      let stimSelected = false;
      while (!stimSelected) {
        const candidate = window.randChoice(window.stimuli_list);
        if (window.presentedStimuli.length < window.n || candidate !== window.presentedStimuli.slice(-window.n)[0]) {
          window.thisStim = candidate;
          stimSelected = true;
        }
      }
    }
    
    window.presentedStimuli.push(window.thisStim);
    window.trialIndex += 1;
    window.feedbackMsg = "";
    
    stimul.setText(thisStim);
    key_resp.keys = undefined;
    key_resp.rt = undefined;
    _key_resp_allKeys = [];
    trialMaxDuration = null
    // keep track of which components have finished
    trialComponents = [];
    trialComponents.push(stimul);
    trialComponents.push(key_resp);
    
    trialComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


var frameRemains;
function trialRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'trial' ---
    // get current time
    t = trialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *stimul* updates
    if (t >= 0 && stimul.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      stimul.tStart = t;  // (not accounting for frame time here)
      stimul.frameNStart = frameN;  // exact frame index
      
      stimul.setAutoDraw(true);
    }
    
    
    // if stimul is active this frame...
    if (stimul.status === PsychoJS.Status.STARTED) {
    }
    
    frameRemains = 0 + 0.5 - psychoJS.window.monitorFramePeriod * 0.75;// most of one frame period left
    if (stimul.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      // keep track of stop time/frame for later
      stimul.tStop = t;  // not accounting for scr refresh
      stimul.frameNStop = frameN;  // exact frame index
      // update status
      stimul.status = PsychoJS.Status.FINISHED;
      stimul.setAutoDraw(false);
    }
    
    
    // *key_resp* updates
    if (t >= 0 && key_resp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp.tStart = t;  // (not accounting for frame time here)
      key_resp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp.clearEvents(); });
    }
    frameRemains = 0 + 2 - psychoJS.window.monitorFramePeriod * 0.75;// most of one frame period left
    if (key_resp.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      // keep track of stop time/frame for later
      key_resp.tStop = t;  // not accounting for scr refresh
      key_resp.frameNStop = frameN;  // exact frame index
      // update status
      key_resp.status = PsychoJS.Status.FINISHED;
      frameRemains = 0 + 2 - psychoJS.window.monitorFramePeriod * 0.75;// most of one frame period left
      if (key_resp.status === PsychoJS.Status.STARTED && t >= frameRemains) {
        // keep track of stop time/frame for later
        key_resp.tStop = t;  // not accounting for scr refresh
        key_resp.frameNStop = frameN;  // exact frame index
        // update status
        key_resp.status = PsychoJS.Status.FINISHED;
        key_resp.status = PsychoJS.Status.FINISHED;
          }
        
      }
      
      // if key_resp is active this frame...
      if (key_resp.status === PsychoJS.Status.STARTED) {
        let theseKeys = key_resp.getKeys({keyList: 'space', waitRelease: false});
        _key_resp_allKeys = _key_resp_allKeys.concat(theseKeys);
        if (_key_resp_allKeys.length > 0) {
          key_resp.keys = _key_resp_allKeys[_key_resp_allKeys.length - 1].name;  // just the last key pressed
          key_resp.rt = _key_resp_allKeys[_key_resp_allKeys.length - 1].rt;
          key_resp.duration = _key_resp_allKeys[_key_resp_allKeys.length - 1].duration;
        }
      }
      
      // check for quit (typically the Esc key)
      if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
        return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
      }
      
      // check if the Routine should terminate
      if (!continueRoutine) {  // a component has requested a forced-end of Routine
        routineForceEnded = true;
        return Scheduler.Event.NEXT;
      }
      
      continueRoutine = false;  // reverts to True if at least one component still running
      trialComponents.forEach( function(thisComponent) {
        if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
          continueRoutine = true;
        }
      });
      
      // refresh the screen if continuing
      if (continueRoutine && routineTimer.getTime() > 0) {
        return Scheduler.Event.FLIP_REPEAT;
      } else {
        return Scheduler.Event.NEXT;
      }
    };
  }
  
  
function trialRoutineEnd(snapshot) {
    return async function () {
      //--- Ending Routine 'trial' ---
      trialComponents.forEach( function(thisComponent) {
        if (typeof thisComponent.setAutoDraw === 'function') {
          thisComponent.setAutoDraw(false);
        }
      });
      // Run 'End Routine' code from code
      // End Routine
      
      // Prefer getKeys to get numeric RTs
      //    This extracts the keys the participant pressed.
      //If no key was pressed → empty array.
      //If one key was pressed → wrap it in an array.массив
      //If multiple keys were pressed → use the array directly.
      let keys_pressed = Array.isArray(key_resp.keys) ? key_resp.keys : key_resp.keys ? [key_resp.keys] : [];
      //let обьявление переменной с переменной с возможностью переопределения.
      //Array.isArray(...) — встроенная функция, проверяющая, является ли значение массивом.
      //? : — тернарный оператор: условие ? еслиистина : еслиложь.
      //key_resp.keys — свойство компонента клавиатуры, содержащее нажатые клавиши
      
      //вр первого нажатия на клавишу
      let first_rt_ms = Array.isArray(key_resp.rt) ? key_resp.rt[0] : key_resp.rt || null;
      //проверка что испытуемый нажал space
      let pressedSpace = keys_pressed.includes("space");
      //проверка что стимул действительно таргет
      //    window.presentedStimuli.length — длина массива показанных стимулов.
      // >= — оператор сравнения. && — логическое "И". slice[0] — берём первый элемент из подмассива.
      //Логика: Проверяем, достаточно ли стимулов, чтобы сравнивать с n=назад.
      //cравниваем текущий стимул с тем, что был n проб назад.
      //Определяем, является ли текущий стимул целевым по n-back логике.
      
      let isTarget = (window.presentedStimuli.length >= window.n + 1) &&
                     (window.thisStim === window.presentedStimuli.slice(-(window.n + 1))[0]);
      //присваивание кодов правильности
      let correctness_code = (isTarget && pressedSpace) ? 3 :
                             (isTarget && !pressedSpace) ? 1 :
                             (!isTarget && !pressedSpace) ? 2 : 0;
      //присваиваем фидбэк
      window.feedbackMsg = (correctness_code === 3) ? "Правильно!" :
                           (correctness_code === 1) ? "Пропустили таргет" :
                           (correctness_code === 0) ? "Неправильно!" : "";
      
      psychoJS.experiment.addData("stimulus_label", window.thisStim);
      psychoJS.experiment.addData("is_target", isTarget);
      psychoJS.experiment.addData("pressed_space", pressedSpace);
      psychoJS.experiment.addData("first_rt_ms", first_rt_ms);
      psychoJS.experiment.addData("keys_pressed_json", JSON.stringify(keys_pressed));
      psychoJS.experiment.addData("correctness_code", correctness_code);
      psychoJS.experiment.addData("feedback_text", window.feedbackMsg);
      
      // update the trial handler
      if (currentLoop instanceof MultiStairHandler) {
        currentLoop.addResponse(key_resp.corr, level);
      }
      psychoJS.experiment.addData('key_resp.keys', key_resp.keys);
      if (typeof key_resp.keys !== 'undefined') {  // we had a response
          psychoJS.experiment.addData('key_resp.rt', key_resp.rt);
          psychoJS.experiment.addData('key_resp.duration', key_resp.duration);
          }
      
      key_resp.stop();
      if (routineForceEnded) {
          routineTimer.reset();} else if (trialMaxDurationReached) {
          trialClock.add(trialMaxDuration);
      } else {
          trialClock.add(2.000000);
      }
      // Routines running outside a loop should always advance the datafile row
      if (currentLoop === psychoJS.experiment) {
        psychoJS.experiment.nextEntry(snapshot);
      }
      return Scheduler.Event.NEXT;
    }
  }
  
  
var feedbMaxDurationReached;
var feedbMaxDuration;
var feedbComponents;
function feedbRoutineBegin(snapshot) {
    return async function () {
      TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
      
      //--- Prepare to start Routine 'feedb' ---
      t = 0;
      frameN = -1;
      continueRoutine = true; // until we're told otherwise
      // keep track of whether this Routine was forcibly ended
      routineForceEnded = false;
      feedbClock.reset(routineTimer.getTime());
      routineTimer.add(1.000000);
      feedbMaxDurationReached = false;
      // update component parameters for each repeat
      text_3.setText(window.feedbackMsg);
      psychoJS.experiment.addData('feedb.started', globalClock.getTime());
      feedbMaxDuration = null
      // keep track of which components have finished
      feedbComponents = [];
      feedbComponents.push(text_3);
      
      feedbComponents.forEach( function(thisComponent) {
        if ('status' in thisComponent)
          thisComponent.status = PsychoJS.Status.NOT_STARTED;
         });
      return Scheduler.Event.NEXT;
    }
  }
  
  
function feedbRoutineEachFrame() {
    return async function () {
      //--- Loop for each frame of Routine 'feedb' ---
      // get current time
      t = feedbClock.getTime();
      frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
      // update/draw components on each frame
      
      // *text_3* updates
      if (t >= 0.0 && text_3.status === PsychoJS.Status.NOT_STARTED) {
        // keep track of start time/frame for later
        text_3.tStart = t;  // (not accounting for frame time here)
        text_3.frameNStart = frameN;  // exact frame index
        
        text_3.setAutoDraw(true);
      }
      
      
      // if text_3 is active this frame...
      if (text_3.status === PsychoJS.Status.STARTED) {
      }
      
      frameRemains = 0.0 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;// most of one frame period left
      if (text_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
        // keep track of stop time/frame for later
        text_3.tStop = t;  // not accounting for scr refresh
        text_3.frameNStop = frameN;  // exact frame index
        // update status
        text_3.status = PsychoJS.Status.FINISHED;
        text_3.setAutoDraw(false);
      }
      
      // check for quit (typically the Esc key)
      if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
        return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
      }
      
      // check if the Routine should terminate
      if (!continueRoutine) {  // a component has requested a forced-end of Routine
        routineForceEnded = true;
        return Scheduler.Event.NEXT;
      }
      
      continueRoutine = false;  // reverts to True if at least one component still running
      feedbComponents.forEach( function(thisComponent) {
        if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
          continueRoutine = true;
        }
      });
      
      // refresh the screen if continuing
      if (continueRoutine && routineTimer.getTime() > 0) {
        return Scheduler.Event.FLIP_REPEAT;
      } else {
        return Scheduler.Event.NEXT;
      }
    };
  }
  
  
function feedbRoutineEnd(snapshot) {
    return async function () {
      //--- Ending Routine 'feedb' ---
      feedbComponents.forEach( function(thisComponent) {
        if (typeof thisComponent.setAutoDraw === 'function') {
          thisComponent.setAutoDraw(false);
        }
      });
      psychoJS.experiment.addData('feedb.stopped', globalClock.getTime());
      if (routineForceEnded) {
          routineTimer.reset();} else if (feedbMaxDurationReached) {
          feedbClock.add(feedbMaxDuration);
      } else {
          feedbClock.add(1.000000);
      }
      // Routines running outside a loop should always advance the datafile row
      if (currentLoop === psychoJS.experiment) {
        psychoJS.experiment.nextEntry(snapshot);
      }
      return Scheduler.Event.NEXT;
    }
  }
  
  
var thanksMaxDurationReached;
var thanksMaxDuration;
var thanksComponents;
function thanksRoutineBegin(snapshot) {
    return async function () {
      TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
      
      //--- Prepare to start Routine 'thanks' ---
      t = 0;
      frameN = -1;
      continueRoutine = true; // until we're told otherwise
      // keep track of whether this Routine was forcibly ended
      routineForceEnded = false;
      thanksClock.reset(routineTimer.getTime());
      routineTimer.add(1.000000);
      thanksMaxDurationReached = false;
      // update component parameters for each repeat
      // Отключаем скачивание через браузер
      psychoJS._saveResults = 0;
      
      // Именуем файлы
      let filename = psychoJS.experiment._participant +  '_' + psychoJS._experiment._experimentName + '_' + psychoJS._experiment._datetime + '.csv';
      // Достаем дата обджект из эксперимента
      let dataObj = psychoJS._experiment._trialsData;
      // Конвертируем в csv
      let data = [Object.keys(dataObj[0])].concat(dataObj).map(it => {
          return Object.values(it).toString()
      }).join('\n')
      // Отправляем на OSF через DataPipe
      console.log('Saving data...');
      fetch('https://pipe.jspsych.org/api/data', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              Accept: '*/*',
           },   
           body: JSON.stringify({
              experimentID: 'o4xY7cXyjq1F', // * DATAPIPE EXP ID*
              filename: filename, 
              data: data,
           }),
      }).then(response => response.json()).then(data => {
      // Кидаем в консоль результат и выходим из эксперимента
          console.log(data);
          quitPsychoJS();
      })
      thanksMaxDuration = null
      // keep track of which components have finished
      thanksComponents = [];
      thanksComponents.push(text_2);
      
      thanksComponents.forEach( function(thisComponent) {
        if ('status' in thisComponent)
          thisComponent.status = PsychoJS.Status.NOT_STARTED;
         });
      return Scheduler.Event.NEXT;
    }
  }
  
  
function thanksRoutineEachFrame() {
    return async function () {
      //--- Loop for each frame of Routine 'thanks' ---
      // get current time
      t = thanksClock.getTime();
      frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
      // update/draw components on each frame
      
      // *text_2* updates
      if (t >= 0.0 && text_2.status === PsychoJS.Status.NOT_STARTED) {
        // keep track of start time/frame for later
        text_2.tStart = t;  // (not accounting for frame time here)
        text_2.frameNStart = frameN;  // exact frame index
        
        text_2.setAutoDraw(true);
      }
      
      
      // if text_2 is active this frame...
      if (text_2.status === PsychoJS.Status.STARTED) {
      }
      
      frameRemains = 0.0 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;// most of one frame period left
      if (text_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
        // keep track of stop time/frame for later
        text_2.tStop = t;  // not accounting for scr refresh
        text_2.frameNStop = frameN;  // exact frame index
        // update status
        text_2.status = PsychoJS.Status.FINISHED;
        text_2.setAutoDraw(false);
      }
      
      // check for quit (typically the Esc key)
      if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
        return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
      }
      
      // check if the Routine should terminate
      if (!continueRoutine) {  // a component has requested a forced-end of Routine
        routineForceEnded = true;
        return Scheduler.Event.NEXT;
      }
      
      continueRoutine = false;  // reverts to True if at least one component still running
      thanksComponents.forEach( function(thisComponent) {
        if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
          continueRoutine = true;
        }
      });
      
      // refresh the screen if continuing
      if (continueRoutine && routineTimer.getTime() > 0) {
        return Scheduler.Event.FLIP_REPEAT;
      } else {
        return Scheduler.Event.NEXT;
      }
    };
  }
  
  
function thanksRoutineEnd(snapshot) {
    return async function () {
      //--- Ending Routine 'thanks' ---
      thanksComponents.forEach( function(thisComponent) {
        if (typeof thisComponent.setAutoDraw === 'function') {
          thisComponent.setAutoDraw(false);
        }
      });
      if (routineForceEnded) {
          routineTimer.reset();} else if (thanksMaxDurationReached) {
          thanksClock.add(thanksMaxDuration);
      } else {
          thanksClock.add(1.000000);
      }
      // Routines running outside a loop should always advance the datafile row
      if (currentLoop === psychoJS.experiment) {
        psychoJS.experiment.nextEntry(snapshot);
      }
      return Scheduler.Event.NEXT;
    }
  }
  
  
function importConditions(currentLoop) {
    return async function () {
      psychoJS.importAttributes(currentLoop.getCurrentTrial());
      return Scheduler.Event.NEXT;
      };
  }
  
  
async function quitPsychoJS(message, isCompleted) {
    // Check for and save orphaned data
    if (psychoJS.experiment.isEntryEmpty()) {
      psychoJS.experiment.nextEntry();
    }
    psychoJS.window.close();
    psychoJS.quit({message: message, isCompleted: isCompleted});
    
    return Scheduler.Event.QUIT;
  }
