import "./bootstrap";

import Alpine from "alpinejs";
import search from "./alpine/search";
import focus from "@alpinejs/focus";

Alpine.plugin(focus);
window.Alpine = Alpine;
Alpine.data("search", search);

Alpine.start();
