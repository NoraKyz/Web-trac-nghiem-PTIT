function toggleSpecificTime(selectElement) {
    var specificTimeInput = document.getElementById("specificTimeInput");
    if (selectElement.value === "specificTime") {
        specificTimeModal.show();
    } else {
        specificTimeInput.style.display = "none";
    }
}
