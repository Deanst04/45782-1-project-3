import type VacationDraft from "../models/vacation-draft";

export function buildVacationFormData(draft: VacationDraft): FormData {
    const fd = new FormData();

    fd.append("destination", draft.destination);
    fd.append("description", draft.description);
    fd.append("startDate", draft.startDate);
    fd.append("endDate", draft.endDate);
    fd.append("price", draft.price.toString());

    const file = draft.image?.[0];
    if (file) {
        fd.append("image", file);
    }

    return fd;
}