import { promises as fs, createReadStream } from "fs";
import { join } from "path";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Reporter, Context, Config } from "@jest/reporters";
import { AggregatedResult } from "@jest/test-result";
import { renderFile } from "ejs";

interface IBrandedHtmlReporterOptions {
  outputDir?: string;
  outputFile?: string;
  projectName?: string;
  repositoryUrl?: string;
  projectDescription?: string;
  accessKeyId?: string;
  secretAccessKey?: string;
  bucketName?: string;
  region?: string;
}

interface ITemplateData extends IBrandedHtmlReporterOptions {
  results: AggregatedResult;
}

export default class BrandedHtmlReporter implements Pick<Reporter, "onRunComplete"> {
  constructor(private _: Config.GlobalConfig, private options: IBrandedHtmlReporterOptions) {}

  public async onRunComplete(_: Set<Context>, results: AggregatedResult): Promise<void> {
    const template = await this.getRenderedTemplate({ ...this.options, results });
    await this.writeReport(template);
    await this.uploadToS3();
  }

  private async uploadToS3(): Promise<void> {
    const { accessKeyId, secretAccessKey, region, bucketName } = this.options;
    if (!accessKeyId || !secretAccessKey || !region || !bucketName) {
      console.log("\x1b[36m", "Uploaing to S3 was skipped due to missing config", "\x1b[0m");
      return;
    }
    const client = new S3Client({ credentials: { accessKeyId, secretAccessKey }, region });
    const putCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: this.options.outputFile ?? "index.html",
      Body: createReadStream(this.getWritingPath()),
      ContentType: "text/html",
    });
    await client.send(putCommand);
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
