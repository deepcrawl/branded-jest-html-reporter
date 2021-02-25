import { promises as fs } from "fs";
import { join } from "path";

import { Reporter, Context, Config } from "@jest/reporters";
import { AggregatedResult } from "@jest/test-result";
import { renderFile } from "ejs";

interface IBrandedHtmlReporterOptions {
  outputDir?: string;
  outputFile?: string;
  projectName?: string;
  repositoryUrl?: string;
  projectDescription?: string;
}

interface ITemplateData extends IBrandedHtmlReporterOptions {
  results: AggregatedResult;
}

export default class BrandedHtmlReporter implements Pick<Reporter, "onRunComplete"> {
  constructor(private _: Config.GlobalConfig, private options: IBrandedHtmlReporterOptions) {}

  public async onRunComplete(_: Set<Context>, results: AggregatedResult): Promise<void> {
    const template = await this.getRenderedTemplate({ ...this.options, results });
    await this.writeReport(template);
  }

  private async writeReport(renderedTemplate: string): Promise<void> {
    return fs.writeFile(this.getWritingPath(), renderedTemplate);
  }

  private getRenderedTemplate(templateData: ITemplateData): Promise<string> {
    return renderFile(join(__dirname, "report.html"), { templateData });
  }

  private getWritingPath(): string {
    return `${this.options.outputDir ?? "."}/${this.options.outputFile ?? "report.html"}`;
  }
}
