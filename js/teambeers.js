(function(w) {
  'use strict';

  var TeamBeers = function() {
    var self = this;

    self.answer = false;
    self.hash = w.location.hash.toLowerCase();

    $(function() {
      self.$answer = $('#teambeers-answer');

      switch (self.hash) {
        case '#!/emergency':
          self.manualOverride({
            answer: true
          });

          break;
        default:
          self.calculateAndUpdateAnswer();

          self.calculateAndUpdateAnswerInterval = setInterval(function() {
            self.calculateAndUpdateAnswer();
          }, 1000);
      }
    });
  };

  TeamBeers.prototype.calculateAnswer = function() {
    var now, day, hours, minutes;

    now = new Date();

    day = {
      value: now.getUTCDay()
    };

    hours = {
      value: now.getUTCHours()
    };

    minutes = {
      value: now.getUTCMinutes()
    };

    day.pass = day.value === 5;
    hours.pass = hours.value >= 21;
    minutes.pass = minutes.value >= 45 && hours.pass === true || hours.value >= 22;

    if (day.pass === true && hours.pass === true && minutes.pass === true) {
      this.answer = true;
    }
  };

  TeamBeers.prototype.updateAnswer = function() {
    var text = {
      current: this.$answer.text(),
      latest: this.answer === true ? 'YES' : 'NO'
    };

    if (text.current !== text.latest) {
      this.$answer.text(text.latest);
    }
  };

  TeamBeers.prototype.calculateAndUpdateAnswer = function() {
    this.calculateAnswer();
    this.updateAnswer();
  };

  TeamBeers.prototype.manualOverride = function(params) {
    var self = this;

    if (typeof params === 'object') {
      if (typeof params.answer === 'boolean') {
        self.answer = params.answer;

        clearInterval(self.calculateAndUpdateAnswerInterval);
        self.updateAnswer();
      }
    }
  };

  w.teamBeers = new TeamBeers();

})(window);