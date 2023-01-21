import { config } from "process";
import  configurationJSON from "../config.json";

export function useConfiguration() {

    return {
        API: configurationJSON.api,
        Auth: configurationJSON.auth,
        AWSRegion: configurationJSON["aws-region"]
    }
}