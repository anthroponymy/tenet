
import { LogHelper, Style } from "./logHepler.js";
import { loadingAnimation } from "./thinking.js";

//*
export abstract class Essentials<T> {
  public abstract get getClient(): Promise<T>;

  protected async connect(): Promise<T> {
    return this.connectAsync(this.connection);
  }

  private async connectAsync(logic: () => Promise<T>): Promise<T> {
    loadingAnimation(`Connecting to ${this.constructor.name}…`);

    try {
      const result = await logic();

      loadingAnimation(` Connected to ${this.constructor.name}`, ["✔️"], 0);
      return result;
    } catch (error: any) {
      LogHelper.error(Style.error(`Error: ${error.message}`));
      throw error;
    }
  }

  public abstract connection(): Promise<T>;
}
