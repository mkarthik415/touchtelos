// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app.module";
import {registerElement} from "nativescript-angular/element-registry";

registerElement("CardView", () => require("nativescript-cardview").CardView);
registerElement("Gradient", () => require("nativescript-gradient").Gradient);

platformNativeScriptDynamic().bootstrapModule(AppModule);
