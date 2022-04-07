import { useState } from "react";

export default function useChangeView() {
    const [changeView, setChangeView] = useState<"table" | "form">("table");
    
    function changeToTable() {
        setChangeView("table");
    }

    function changeToForm() {
        setChangeView("form");
    }

    return {
        form: changeView === "form",
        table: changeView === "table",
        changeToTable,
        changeToForm,
    }
}