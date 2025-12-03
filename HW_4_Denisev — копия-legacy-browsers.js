/***************** 
 * Leeson 6 *
 *****************/


// store info about the experiment session:
let expName = 'leeson 6';  // from the Builder filename that created this script
let expInfo = {
    'participant': `${util.pad(Number.parseFloat(util.randint(0, 999999)).toFixed(0), 6)}`,
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
const trialsLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(trialsLoopBegin(trialsLoopScheduler));
flowScheduler.add(trialsLoopScheduler);
flowScheduler.add(trialsLoopEnd);



flowScheduler.add(fbRoutineBegin());
flowScheduler.add(fbRoutineEachFrame());
flowScheduler.add(fbRoutineEnd());
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

async function experimentInit() {
  // Initialize components for Routine "trial"
  trialClock = new util.Clock();
  text = new visual.TextStim({
    win: psychoJS.window,
    name: 'text',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  key_resp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  window.randChoice = function(arr){return arr[Math.floor(Math.random()*arr.length)];};
  window.makeTargetList = function(nTrials, p){return Array.from({length: nTrials}, () => Math.random()<p);};
  
  window.letters = ['А', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  window.numbers = ['1', '2', '3', '4', '5', '6', '7'];
  
  window.n = 2;
  window.number_trails = 30;
  window.TargetProbability = 0.3;
  
  window.trialGroup = parseInt(expInfo['group'], 10)||1;
  window.stimuli_list = (window.trialGroup === 1) ? window.letters: window.numbers;
  
  window.targetList = window.makeTargetList(window.number_trails, window.TargetProbability);
  for (let i = 0; i < window.n && window.targetList.length; i++) {
      window.targetList[i] = false;
  }
  window.trialIndex = 0;
  window.presentedStimuli = [];
  window.feedbackMsg = '';
  window.thisStim = null;
  
  psychoJS.experiment.addData('stimulus_label', '');
  psychoJS.experiment.addData('is_target', '');
  psychoJS.experiment.addData('pressed_space', '');
  psychoJS.experiment.addData('first_rt_ms', '');
  psychoJS.experiment.addData('key_pressed_json', '');
  psychoJS.experiment.addData('correctness_code', '');
  psychoJS.experiment.addData('feedback_text', '')
  // Initialize components for Routine "feedbck"
  feedbckClock = new util.Clock();
  text_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_2',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  // Initialize components for Routine "fb"
  fbClock = new util.Clock();
  text_points = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_points',
    text: 'подождите',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], draggable: false, height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  key_resp_2 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}

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
      trialsLoopScheduler.add(feedbckRoutineBegin(snapshot));
      trialsLoopScheduler.add(feedbckRoutineEachFrame());
      trialsLoopScheduler.add(feedbckRoutineEnd(snapshot));
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
    text.setText(thisStim);
    key_resp.keys = undefined;
    key_resp.rt = undefined;
    _key_resp_allKeys = [];
    key_resp.keys = [];
    key_resp.rt= [];
    if (typeof key_resp.clearEvents === 'function').key_resp.clearEvents();
    
    let target = Boolean(window.TargetList[window.trialIndex]);
    
    if (target && window.presentedStimuli.length >= window.n) {
        window.thisStim = window.presentedStimuli.slice(-window.n)[0];
    } else {
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
    window.feedbackMsg = '';
    trialMaxDuration = null
    // keep track of which components have finished
    trialComponents = [];
    trialComponents.push(text);
    trialComponents.push(key_resp);
    
    trialComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}

function trialRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'trial' ---
    // get current time
    t = trialClock.getTime();
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
    
    frameRemains = 0.0 + 0.5 - psychoJS.window.monitorFramePeriod * 0.75;// most of one frame period left
    if (text.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      // keep track of stop time/frame for later
      text.tStop = t;  // not accounting for scr refresh
      text.frameNStop = frameN;  // exact frame index
      // update status
      text.status = PsychoJS.Status.FINISHED;
      text.setAutoDraw(false);
    }
    
    
    // *key_resp* updates
    if (t >= 0.0 && key_resp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp.tStart = t;  // (not accounting for frame time here)
      key_resp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp.clearEvents(); });
    }
    frameRemains = 0.0 + 2 - psychoJS.window.monitorFramePeriod * 0.75;// most of one frame period left
    if (key_resp.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      // keep track of stop time/frame for later
      key_resp.tStop = t;  // not accounting for scr refresh
      key_resp.frameNStop = frameN;  // exact frame index
      // update status
      key_resp.status = PsychoJS.Status.FINISHED;
      frameRemains = 0.0 + 2 - psychoJS.window.monitorFramePeriod * 0.75;// most of one frame period left
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
      let key_pressed = Array.isArray(key_resp.keys)? key_resp.keys: key_resp.keys? [key_resp.keys]: [];
      let first_rt_ms = Array.isArray(key_resp.rt)? key_resp.rt: [0]: key_resp.rt || null;
      let pressedSpace = key_pressed.includes('space');
      
      let isTarget = (window.presentedStimuli.length >= window.n+1)&& (window.thisStim === window.presentedStimuli.slice(-(window.n+1))[0]);
      
      let correctness_code = (isTarget && pressedSpace) ? 3:
                             (isTarget && !pressedSpace) ? 1:
                             (!isTarget && !pressedSpace) ? 2: 0;
      
      window.feedbackMsg = (corrextness_code === 3) ? 'Правильно':
                           (corrextness_code === 1) ? 'Пропустили таргет':
                           (corrextness_code === 0) ? 'Неправильно': '';
      
      psychoJS.experiment.addData('stimulus_label', window.thisStim);
      psychoJS.experiment.addData('is_target', isTarget);
      psychoJS.experiment.addData('pressed_space', pressedSpace);
      psychoJS.experiment.addData('first_rt_ms', first_st_ms);
      psychoJS.experiment.addData('key_pressed_json', JSON.stringify(key_preesed));
      psychoJS.experiment.addData('correctness_code', correctness_code);
      psychoJS.experiment.addData('feedback_text', window.feedbackMsg)
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
  
  function feedbckRoutineBegin(snapshot) {
    return async function () {
      TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
      
      //--- Prepare to start Routine 'feedbck' ---
      t = 0;
      frameN = -1;
      continueRoutine = true; // until we're told otherwise
      // keep track of whether this Routine was forcibly ended
      routineForceEnded = false;
      feedbckClock.reset(routineTimer.getTime());
      routineTimer.add(1.000000);
      feedbckMaxDurationReached = false;
      // update component parameters for each repeat
      text_2.setText(window.feedbackMsg);
      feedbckMaxDuration = null
      // keep track of which components have finished
      feedbckComponents = [];
      feedbckComponents.push(text_2);
      
      feedbckComponents.forEach( function(thisComponent) {
        if ('status' in thisComponent)
          thisComponent.status = PsychoJS.Status.NOT_STARTED;
         });
      return Scheduler.Event.NEXT;
    }
  }
  
  function feedbckRoutineEachFrame() {
    return async function () {
      //--- Loop for each frame of Routine 'feedbck' ---
      // get current time
      t = feedbckClock.getTime();
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
      feedbckComponents.forEach( function(thisComponent) {
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
  
  function feedbckRoutineEnd(snapshot) {
    return async function () {
      //--- Ending Routine 'feedbck' ---
      feedbckComponents.forEach( function(thisComponent) {
        if (typeof thisComponent.setAutoDraw === 'function') {
          thisComponent.setAutoDraw(false);
        }
      });
      if (routineForceEnded) {
          routineTimer.reset();} else if (feedbckMaxDurationReached) {
          feedbckClock.add(feedbckMaxDuration);
      } else {
          feedbckClock.add(1.000000);
      }
      // Routines running outside a loop should always advance the datafile row
      if (currentLoop === psychoJS.experiment) {
        psychoJS.experiment.nextEntry(snapshot);
      }
      return Scheduler.Event.NEXT;
    }
  }
  
  function fbRoutineBegin(snapshot) {
    return async function () {
      TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
      
      //--- Prepare to start Routine 'fb' ---
      t = 0;
      frameN = -1;
      continueRoutine = true; // until we're told otherwise
      // keep track of whether this Routine was forcibly ended
      routineForceEnded = false;
      fbClock.reset();
      routineTimer.reset();
      fbMaxDurationReached = false;
      // update component parameters for each repeat
      key_resp_2.keys = undefined;
      key_resp_2.rt = undefined;
      _key_resp_2_allKeys = [];
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
              experimentID: '', // * DATAPIPE EXP ID*
              filename: filename, 
              data: data,
           }),
      }).then(response => response.json()).then(data => {
      // Кидаем в консоль результат и выходим из эксперимента
          console.log(data);
          quitPsychoJS();
      })
      psychoJS.experiment.addData('fb.started', globalClock.getTime());
      fbMaxDuration = null
      // keep track of which components have finished
      fbComponents = [];
      fbComponents.push(text_points);
      fbComponents.push(key_resp_2);
      
      fbComponents.forEach( function(thisComponent) {
        if ('status' in thisComponent)
          thisComponent.status = PsychoJS.Status.NOT_STARTED;
         });
      return Scheduler.Event.NEXT;
    }
  }
  
  function fbRoutineEachFrame() {
    return async function () {
      //--- Loop for each frame of Routine 'fb' ---
      // get current time
      t = fbClock.getTime();
      frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
      // update/draw components on each frame
      
      // *text_points* updates
      if (t >= 0.0 && text_points.status === PsychoJS.Status.NOT_STARTED) {
        // keep track of start time/frame for later
        text_points.tStart = t;  // (not accounting for frame time here)
        text_points.frameNStart = frameN;  // exact frame index
        
        text_points.setAutoDraw(true);
      }
      
      
      // if text_points is active this frame...
      if (text_points.status === PsychoJS.Status.STARTED) {
      }
      
      
      // *key_resp_2* updates
      if (t >= 3 && key_resp_2.status === PsychoJS.Status.NOT_STARTED) {
        // keep track of start time/frame for later
        key_resp_2.tStart = t;  // (not accounting for frame time here)
        key_resp_2.frameNStart = frameN;  // exact frame index
        
        // keyboard checking is just starting
        psychoJS.window.callOnFlip(function() { key_resp_2.clock.reset(); });  // t=0 on next screen flip
        psychoJS.window.callOnFlip(function() { key_resp_2.start(); }); // start on screen flip
        psychoJS.window.callOnFlip(function() { key_resp_2.clearEvents(); });
      }
      
      // if key_resp_2 is active this frame...
      if (key_resp_2.status === PsychoJS.Status.STARTED) {
        let theseKeys = key_resp_2.getKeys({keyList: 'space', waitRelease: false});
        _key_resp_2_allKeys = _key_resp_2_allKeys.concat(theseKeys);
        if (_key_resp_2_allKeys.length > 0) {
          key_resp_2.keys = _key_resp_2_allKeys[_key_resp_2_allKeys.length - 1].name;  // just the last key pressed
          key_resp_2.rt = _key_resp_2_allKeys[_key_resp_2_allKeys.length - 1].rt;
          key_resp_2.duration = _key_resp_2_allKeys[_key_resp_2_allKeys.length - 1].duration;
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
      fbComponents.forEach( function(thisComponent) {
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
  
  function fbRoutineEnd(snapshot) {
    return async function () {
      //--- Ending Routine 'fb' ---
      fbComponents.forEach( function(thisComponent) {
        if (typeof thisComponent.setAutoDraw === 'function') {
          thisComponent.setAutoDraw(false);
        }
      });
      psychoJS.experiment.addData('fb.stopped', globalClock.getTime());
      // update the trial handler
      if (currentLoop instanceof MultiStairHandler) {
        currentLoop.addResponse(key_resp_2.corr, level);
      }
      psychoJS.experiment.addData('key_resp_2.keys', key_resp_2.keys);
      if (typeof key_resp_2.keys !== 'undefined') {  // we had a response
          psychoJS.experiment.addData('key_resp_2.rt', key_resp_2.rt);
          psychoJS.experiment.addData('key_resp_2.duration', key_resp_2.duration);
          routineTimer.reset();
          }
      
      key_resp_2.stop();
      // the Routine "fb" was not non-slip safe, so reset the non-slip timer
      routineTimer.reset();
      
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
