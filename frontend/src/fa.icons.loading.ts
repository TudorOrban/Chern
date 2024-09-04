import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowDownShortWide, faArrowRotateRight, faArrowUpWideShort, faPlus, faSave, faTimes, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons"

export const loadFAIcons = () => {
    library.add(faPlus);
    library.add(faSave);
    library.add(faXmark);
    library.add(faTimes);
    library.add(faTrash);
    library.add(faArrowRotateRight);
    library.add(faArrowUpWideShort);
    library.add(faArrowDownShortWide);
}