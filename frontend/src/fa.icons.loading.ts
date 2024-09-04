import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowDownShortWide, faArrowRotateRight, faArrowUpWideShort, faCaretLeft, faCaretRight, faEdit, faPlus, faSave, faSearch, faSpinner, faTimes, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons"

export const loadFAIcons = () => {
    library.add(faPlus);
    library.add(faSave);
    library.add(faXmark);
    library.add(faTimes);
    library.add(faTrash);
    library.add(faEdit);
    library.add(faArrowRotateRight);
    library.add(faArrowUpWideShort);
    library.add(faArrowDownShortWide);
    library.add(faSearch);
    library.add(faCaretLeft);
    library.add(faCaretRight);
    library.add(faSpinner);
}