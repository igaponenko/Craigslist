export function showToast(message) {
    let toast = document.getElementById('toast');
    toast.innerText = message;
    toast.classList.add('show-toast');
    setTimeout(() => {
        toast.classList.remove('show-toast');
    }, 3500);
}
