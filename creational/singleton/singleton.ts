class JudgeAnalytics {
  private run: number = 0;
  private submit: number = 0;
  countRun() {
    this.run++;
  }
  countSubmit() {
    this.submit++;
  }
  getRunCount() {
    return this.run;
  }
  getSubmitCount() {
    return this.submit;
  }
}

const judgeAnalytics = new JudgeAnalytics();
judgeAnalytics.countRun();
judgeAnalytics.countSubmit();

const judgeAnalytics2 = new JudgeAnalytics();
judgeAnalytics2.countRun()

// This should be 2 because we are using the same instance, because the run has been triggered 2 times.
console.log(judgeAnalytics2.getRunCount())
