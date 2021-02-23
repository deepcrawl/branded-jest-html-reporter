import { promises as fs } from "fs";
import { join } from "path";

import { Reporter, Context, Config } from "@jest/reporters";
import { AggregatedResult } from "@jest/test-result";
import { renderFile } from "ejs";
import { groupBy } from "ramda";

interface IBrandedHtmlReporterOptions {
  outputDir?: string;
  outputFile?: string;
  projectName?: string;
  repositoryUrl?: string;
  projectDescription?: string;
}

export default class BrandedHtmlReporter implements Pick<Reporter, "onRunComplete"> {
  constructor(private globalConfig: Config.GlobalConfig, private options: IBrandedHtmlReporterOptions) {}

  public async onRunComplete(_: Set<Context>, results: AggregatedResult): Promise<void> {
    const suites = results.testResults.map(res => ({
      ...res,
      testResults: groupBy(item => item.ancestorTitles[0], res.testResults),
    }));
    const template = await this.getRenderedTemplate({ ...this.options, suites });
    await this.writeReport(template);
  }

  private async writeReport(renderedTemplate: string): Promise<void> {
    return fs.writeFile(this.getWritingPath(), renderedTemplate);
  }

  private getRenderedTemplate(templateData: Record<string, unknown>): Promise<string> {
    return renderFile(join(__dirname, "report.html"), templateData);
  }

  private getWritingPath(): string {
    return `${this.options.outputDir ?? "."}/${this.options.outputFile ?? "report.html"}`;
  }
}
