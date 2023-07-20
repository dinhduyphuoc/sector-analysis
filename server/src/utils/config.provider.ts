import convict from "convict";

let convictConfigurationProvider: convict.Config<any> | undefined;

// @ts-ignore
export function initializeAndValidate(schema) {
  convictConfigurationProvider = convict(schema);
  convictConfigurationProvider.validate();
}

export function reset() {
  convictConfigurationProvider = undefined;
}

export function getValue(keyName: string): string {
  if (convictConfigurationProvider === undefined) {
    throw new Error("Configuration has not been initialized yet");
  }

  // @ts-ignore
  return convictConfigurationProvider.get(keyName) as string;
}
