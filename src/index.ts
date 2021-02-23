import { Reporter, Context, Config } from "@jest/reporters";
import { AggregatedResult } from "@jest/test-result";

interface IBrandedHtmlReporterOptions {
  foo: string;
}

export default class BrandedHtmlReporter implements Pick<Reporter, "onRunComplete"> {
  constructor(private globalConfig: Config.GlobalConfig, private options: IBrandedHtmlReporterOptions) {}

  public async onRunComplete(_: Set<Context>, results: AggregatedResult): Promise<void> {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(results));
  }
}
